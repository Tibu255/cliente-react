/**
 * Unidad 6 — 6.2.5 Temporizadores: setTimeout, clearTimeout, setInterval, clearInterval.
 * El temario recuerda: JS en el navegador es mono-hilo; los callbacks se encolan.
 */
import { useEffect, useRef, useState } from "react";

export default function EjemplosTemporizadores() {
  const [mensaje, setMensaje] = useState("");
  const [ticks, setTicks] = useState(0);
  const idIntervalRef = useRef(null);

  useEffect(() => {
    /** setTimeout: una sola ejecución tras el delay (ms). */
    const idTimeout = window.setTimeout(() => {
      setMensaje("Mensaje tras 1,5 s (setTimeout)");
    }, 1500);

    return () => {
      window.clearTimeout(idTimeout);
      if (idIntervalRef.current != null) window.clearInterval(idIntervalRef.current);
    };
  }, []);

  const iniciarIntervalo = () => {
    if (idIntervalRef.current != null) return;
    idIntervalRef.current = window.setInterval(() => {
      setTicks((t) => t + 1);
    }, 1000);
  };

  const pararIntervalo = () => {
    if (idIntervalRef.current != null) {
      window.clearInterval(idIntervalRef.current);
      idIntervalRef.current = null;
    }
  };

  return (
    <section className="u6-bloque">
      <h2>6.2.5 Temporizadores y cronómetros</h2>
      <p>{mensaje || "Esperando setTimeout…"}</p>
      <p>
        Contador con <code>setInterval</code> (1 s): <strong>{ticks}</strong>
      </p>
      <button type="button" onClick={iniciarIntervalo}>
        Iniciar intervalo
      </button>{" "}
      <button type="button" onClick={pararIntervalo}>
        clearInterval
      </button>
      <p className="u6-nota">
        Patrón del PDF para “intervalo fiable tras terminar trabajo largo”: al final de la función llamar de nuevo a{" "}
        <code>setTimeout(fn, delay)</code> en lugar de <code>setInterval</code> si cada iteración puede tardar más que
        el periodo.
      </p>
    </section>
  );
}
