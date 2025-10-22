export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Capa de video */}
      <div className="hero__media" aria-hidden>
        <video
          className="hero__video"
          src="/videos/blackhole.mp4"
          poster="/videos/blackhole.jpeg"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Gradiente para legibilidad del texto */}
        <div className="hero__overlay" />
      </div>

      {/* Contenido */}
      <div className="container hero__content">
        <h1 className="hero__title">
          Experimental Landing: <span>Event Horizon</span>
        </h1>
        <p className="hero__subtitle">
          A minimal, cinematic playground built with React + TypeScript + pure
          CSS. Background powered by a black hole video frame.
        </p>
        <div className="hero__cta">
          <a href="#experiments" className="btn btn--accent">
            See Experiments
          </a>
          <a href="#about" className="btn">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
