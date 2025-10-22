import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/Header.css";

const HEADER_EASE = [0.22, 1, 0.36, 1];

const menuPanelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.35, ease: HEADER_EASE } },
  exit: { x: "100%", transition: { duration: 0.3, ease: HEADER_EASE } },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { y: -14, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: HEADER_EASE },
  },
  exit: {
    y: -14,
    opacity: 0,
    transition: { duration: 0.2, ease: HEADER_EASE },
  },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mount, setMount] = useState(false);

  // animación de entrada del header (de arriba hacia abajo + fade-in)
  useEffect(() => {
    const t = requestAnimationFrame(() => setMount(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      className="site-header"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: HEADER_EASE }}
    >
      <div className="container site-header__row">
        {/* brand */}
        <a href="#hero" className="site-header__brand" onClick={closeMenu}>
          <span className="site-header__logo" aria-hidden>
            ◐
          </span>
          <strong className="brand__text">
            <span className="brand__shine">Event Horizon</span>
          </strong>
        </a>

        {/* nav desktop */}
        <nav className="site-nav" aria-label="Main">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#experiments">Experiments</a>
          <a href="#contact" className="btn btn--cta">
            Get Access
          </a>
        </nav>

        {/* toggle */}
        <button
          className={`site-header__toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {/* hamburguesa / X */}
          <span className="toggle__bar" />
          <span className="toggle__bar" />
          <span className="toggle__bar" />
        </button>
      </div>

      {/* panel móvil deslizante */}
      <AnimatePresence>
        {open && (
          <motion.aside
            id="mobile-menu"
            className="mobile-panel"
            role="dialog"
            aria-modal="true"
            variants={menuPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.ul
              className="mobile-nav"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.li variants={itemVariants}>
                <a href="#hero" onClick={closeMenu}>
                  Home
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href="#about" onClick={closeMenu}>
                  About
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href="#experiments" onClick={closeMenu}>
                  Experiments
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  className="btn btn--cta btn--full"
                  href="#contact"
                  onClick={closeMenu}
                >
                  Get Access
                </a>
              </motion.li>
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
