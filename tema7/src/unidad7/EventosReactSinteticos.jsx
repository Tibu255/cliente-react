/**
 * Unidad 7 — 7.4 Gestión de eventos en React: eventos sintéticos.
 * Mismos tres patrones del PDF: onClick, onChange en input, onSubmit + preventDefault.
 */
import { useState } from "react";

export default function EventosReactSinteticos() {
  const [log, setLog] = useState([]);

  const manejaClick = (event) => {
    setLog((l) => [...l, `click: ${event.type}`]);
  };

  const manejaCambioInput = (event) => {
    setLog((l) => [...l, `input value: ${event.target.value}`]);
  };

  const manejaSubmit = (event) => {
    event.preventDefault();
    setLog((l) => [...l, "submit prevenido (no recarga página)"]);
  };

  return (
    <div>
      <button type="button" onClick={manejaClick}>
        Púlsame
      </button>
      <p>
        <input type="text" placeholder="Escribe…" onChange={manejaCambioInput} />
      </p>
      <form onSubmit={manejaSubmit}>
        <button type="submit">Enviar formulario (demo)</button>
      </form>
      <pre style={{ maxHeight: 120, overflow: "auto", fontSize: 12 }}>{log.join("\n")}</pre>
    </div>
  );
}
