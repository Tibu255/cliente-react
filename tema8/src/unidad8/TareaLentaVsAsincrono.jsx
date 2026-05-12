import { useCallback, useState } from "react";

function tareaLenta() {
  const t0 = Date.now();
  while (Date.now() - t0 < 2000) {
    /* bloquea el hilo ~2 s */
  }
}

/**
 * 8.1.4–8.1.5 — Tarea lenta vs asíncrona (setTimeout).
 */
export function TareaLentaVsAsincrono() {
  const [log, setLog] = useState([]);

  const push = useCallback((line) => {
    setLog((prev) => [...prev.slice(-12), `${new Date().toLocaleTimeString()} — ${line}`]);
  }, []);

  return (
    <div className="u8-bloque">
      <h3>8.1.4 Tarea lenta (bloqueante)</h3>
      <p>
        Un bucle largo en el hilo principal congela la UI. Úsalo solo para demostrar el problema.
      </p>
      <button
        type="button"
        className="u8-btn u8-btn--danger"
        onClick={() => {
          push("Inicio tarea lenta (UI congelada ~2 s)…");
          tareaLenta();
          push("Fin tarea lenta.");
        }}
      >
        Ejecutar tarea lenta (~2 s)
      </button>

      <h3>8.1.5 Tarea asíncrona (setTimeout)</h3>
      <p>
        <code>setTimeout</code> delega el trabajo al bucle de eventos: el callback se ejecuta más
        tarde y la pila puede atender clics y pintado entre medias.
      </p>
      <button
        type="button"
        className="u8-btn"
        onClick={() => {
          push("Antes de setTimeout");
          setTimeout(() => push("Dentro del callback de setTimeout (0 ms)"), 0);
          push("Después de programar setTimeout");
        }}
      >
        setTimeout(…, 0)
      </button>

      <pre className="u8-log">{log.join("\n") || "(sin eventos)"}</pre>
    </div>
  );
}
