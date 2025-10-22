import { useEffect, useRef } from "react";

type Props = {
  src: string; // "/videos/blackhole.mp4"
  poster?: string; // "/videos/blackhole.jpg"
  segmentDuration?: number; // segundos a recorrer (ej: 5)
  fps?: number; // 20–30 va bien; default 30
  className?: string; // "hero__video"
};

export default function HeroVideoReverse({
  src,
  poster,
  segmentDuration = 5,
  fps = 30,
  className = "hero__video",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directionRef = useRef<1 | -1>(1);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const ioRef = useRef<IntersectionObserver | null>(null);

  // Bucle manual adelante/atrás
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let last = 0;
    const stepMs = 1000 / fps;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopLoop();
      } else if (isInView) {
        startLoop();
      }
    };

    // Control viewport (pausar si sale de pantalla)
    let isInView = true;
    ioRef.current = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? true;
        if (isInView && document.visibilityState === "visible") startLoop();
        else stopLoop();
      },
      { threshold: 0.15 }
    );
    ioRef.current.observe(video);

    const clamp = (t: number, min: number, max: number) =>
      Math.max(min, Math.min(max, t));

    const loop = (now: number) => {
      if (!runningRef.current || !video) return;
      if (!last) last = now;

      const elapsed = now - last;
      if (elapsed >= stepMs) {
        const dt = (elapsed / 1000) * directionRef.current; // segundos transcurridos en este frame
        // Usamos segmentDuration (p.ej. 5s) como límites, no toda la duración del archivo.
        const tMin = 0;
        const tMax = segmentDuration;

        let next = video.currentTime + dt;
        if (next >= tMax) {
          next = tMax;
          directionRef.current = -1;
        } else if (next <= tMin) {
          next = tMin;
          directionRef.current = 1;
        }

        video.currentTime = clamp(next, tMin, tMax);
        last = now;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      last = 0;
      // Asegura estado inicial
      try {
        video.pause(); // evitamos reproducción “normal”
        video.muted = true;
        video.playsInline = true;
        if (video.currentTime < 0.01 || video.currentTime > segmentDuration) {
          video.currentTime = 0;
          directionRef.current = 1;
        }
      } catch {}
      rafRef.current = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      runningRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onLoaded = () => {
      // Si el clip es más corto que segmentDuration, ajusta:
      if (video.duration && video.duration < segmentDuration) {
        console.warn(
          `[HeroVideoReverse] El video dura ${video.duration.toFixed(
            2
          )}s; ajustando segmentDuration.`
        );
      }
      // Arrancamos cuando hay metadata y es visible
      if (document.visibilityState === "visible") startLoop();
    };

    const onSuspend = () => stopLoop(); // por si el navegador suspende
    const onAbort = () => stopLoop();

    video.addEventListener("loadedmetadata", onLoaded);
    document.addEventListener("visibilitychange", onVisibility);
    video.addEventListener("suspend", onSuspend);
    video.addEventListener("abort", onAbort);

    // Si ya está lista la metadata (navegador rápido)
    if (video.readyState >= 1) onLoaded();

    return () => {
      stopLoop();
      video.removeEventListener("loadedmetadata", onLoaded);
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("suspend", onSuspend);
      video.removeEventListener("abort", onAbort);
      ioRef.current?.disconnect();
      ioRef.current = null;
    };
  }, [fps, segmentDuration]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      // Importante: no ponemos autoPlay/loop para que no se “peleen”
      muted
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
