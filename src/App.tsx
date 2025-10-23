import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import LogosMarquee from "./components/LogosMarquee";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogosMarquee />
      </main>
    </>
  );
}

export default App;
