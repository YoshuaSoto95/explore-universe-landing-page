import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";

import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Placeholders para continuar luego */}
        <section id="about" className="container" style={{ padding: "80px 0" }}>
          <h2 style={{ marginTop: 0 }}>About the Experiment</h2>
          <p style={{ color: "var(--muted)", maxWidth: 720 }}>
            This landing is a sandbox to explore motion, overlays, and cinematic
            composition with plain CSS.
          </p>
        </section>

        <section
          id="experiments"
          className="container"
          style={{ padding: "80px 0" }}
        >
          <h2 style={{ marginTop: 0 }}>Experiments</h2>
          <p style={{ color: "var(--muted)", maxWidth: 720 }}>
            We’ll add parallax, scroll-driven accents, and interactive blocks
            next.
          </p>
        </section>

        <section
          id="contact"
          className="container"
          style={{ padding: "80px 0" }}
        >
          <h2 style={{ marginTop: 0 }}>Get Access</h2>
          <p style={{ color: "var(--muted)", maxWidth: 720 }}>
            Want to try this setup with your own assets? Drop a note.
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
