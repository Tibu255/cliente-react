/**
 * Unidad 7 — 7.1: mismo efecto que el div del PDF (borde al pasar el ratón).
 * En React no se usan atributos HTML onclick/onmouseover; se usan props onClick, onMouseEnter…
 */
import { useState } from "react";

const caja = {
  padding: "0.2em",
  width: "150px",
  minHeight: "60px",
  border: "thin solid silver",
};

export default function EventosRaton() {
  const [borde, setBorde] = useState("silver");

  return (
    <div
      style={{ ...caja, borderColor: borde }}
      onMouseEnter={() => setBorde("black")}
      onMouseLeave={() => setBorde("silver")}
    >
      Sección de contenidos… (pasa el ratón)
    </div>
  );
}
