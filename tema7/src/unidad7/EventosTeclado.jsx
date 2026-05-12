/**
 * Unidad 7 — 7.2: eventos de teclado (keydown).
 * Equivale al script del PDF: e.key, altKey, ctrlKey, shiftKey.
 */
import { useRef, useState } from "react";

export default function EventosTeclado() {
  const [zona, setZona] = useState("");
  const zonaRef = useRef(null);

  const mostrarTecla = (e) => {
    const tecla = e.key;
    if (e.altKey) window.console.info("Alt pulsado");
    if (e.ctrlKey && tecla.toLowerCase() === "c") window.console.info("Ctrl + C (no cortar; solo log)");
    if (tecla.length === 1 || tecla === " ") {
      setZona((prev) => prev + tecla);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => zonaRef.current?.focus()}>
        Dar foco al área de teclado
      </button>
      <div
        ref={zonaRef}
        tabIndex={0}
        onKeyDown={mostrarTecla}
        style={{ outline: "1px dashed #999", padding: "0.5rem", marginTop: "0.5rem" }}
      >
        <p>Escribe aquí con el foco en este recuadro:</p>
        <span>{zona}</span>
      </div>
    </div>
  );
}
