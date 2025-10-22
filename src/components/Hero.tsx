import "../styles/hero.css";
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
          Explore Universe — <span>Black Hole Experiment</span>
        </h1>
        <p className="hero__subtitle">
          Explore Universe is an experimental landing showcasing a cinematic
          black hole loop built with React + TypeScript and pure CSS. Discover
          motion, parallax, and interactive visuals optimized for performance.
        </p>
        <div className="hero__cta">
          <a href="#experiments" className="btn btn--cta btn--cta-primary">
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
