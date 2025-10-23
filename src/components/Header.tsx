// src/components/Header.tsx
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
  cubicBezier,
  type Easing,
} from "framer-motion";

const EASE: Easing = cubicBezier(0.22, 1, 0.36, 1);

const panelVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { x: "100%", transition: { duration: 0.3, ease: EASE } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  hidden: { y: -14, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.25, ease: EASE } },
  exit: { y: -14, opacity: 0, transition: { duration: 0.2, ease: EASE } },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  // Bloquear scroll cuando el panel móvil está abierto
  useEffect(() => {
    const cls = "no-scroll";
    if (open) document.body.classList.add(cls);
    else document.body.classList.remove(cls);
    return () => document.body.classList.remove(cls);
  }, [open]);

  return (
    <motion.header
      className="site-header"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="container site-header__row">
        {/* Brand */}
        <a href="#hero" className="site-header__brand" onClick={close}>
          <span className="site-header__logo" aria-hidden>
            ◐
          </span>
          <strong className="brand__text">
            <span className="brand__shine">Explore Universe</span>
          </strong>
        </a>

        {/* Nav desktop */}
        <nav className="site-nav" aria-label="Main">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#experiments">Experiments</a>
          <a href="#contact" className="btn btn--cta">
            Get Access
          </a>
        </nav>

        {/* Toggle */}
        <button
          className={`site-header__toggle ${open ? "is-open" : ""}`}
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="toggle__bar" />
          <span className="toggle__bar" />
          <span className="toggle__bar" />
        </button>
      </div>

      {/* Overlay oscuro clicable (cierra panel) */}
      <AnimatePresence>
        {open && (
          <motion.button
            aria-label="Close menu overlay"
            className="mobile-overlay"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          />
        )}
      </AnimatePresence>

      {/* Panel móvil */}
      <AnimatePresence>
        {open && (
          <motion.aside
            id="mobile-menu"
            className="mobile-panel"
            role="dialog"
            aria-modal="true"
            variants={panelVariants}
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
                <a href="#hero" onClick={close}>
                  Home
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href="#about" onClick={close}>
                  About
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href="#experiments" onClick={close}>
                  Experiments
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a
                  className="btn btn--cta btn--full"
                  href="#contact"
                  onClick={close}
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
