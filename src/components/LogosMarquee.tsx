import { memo } from "react";
import "../styles/logos-marquee.css";

import iconSpacex from "../assets/spacex.svg";
import iconStarlink from "../assets/Starlink.svg";
import iconNasa from "../assets/nasa.svg";

type LogoItem = { id: string; src: string; alt: string };

function LogosMarqueeBase() {
  // Datos (fáciles de reordenar/añadir)
  const items: LogoItem[] = [
    { id: "spacex", src: iconSpacex, alt: "SpaceX" },
    { id: "starlink", src: iconStarlink, alt: "Starlink" },
    { id: "nasa", src: iconNasa, alt: "NASA" },
    { id: "spacex", src: iconSpacex, alt: "SpaceX" },
    { id: "starlink", src: iconStarlink, alt: "Starlink" },
    { id: "nasa", src: iconNasa, alt: "NASA" },
  ];

  // Duplicamos la secuencia para el efecto seamless
  const looped = [...items, ...items];

  return (
    <section className="logos">
      <div className="logos__viewport" aria-label="Partners carousel">
        <ul className="logos__track" aria-hidden={false}>
          {looped.map((item, i) => (
            <li key={`${item.id}-${i}`} className="logos__item">
              <span className="logo-pill">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="logo-img"
                  draggable={false}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default memo(LogosMarqueeBase);
