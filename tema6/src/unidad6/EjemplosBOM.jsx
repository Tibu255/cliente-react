/**
 * Unidad 6 — 6.2 BOM: window, location, history, navigator (+ screen en comentario).
 * Lectura inicial con función en useState (solo se ejecuta en el cliente al montar).
 */
import { useState } from "react";

function leerBOM() {
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    href: window.location.href,
    pathname: window.location.pathname,
    protocol: window.location.protocol,
    historyLength: window.history.length,
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
    screen: `${window.screen.width}×${window.screen.height}`,
  };
}

export default function EjemplosBOM() {
  const [info] = useState(leerBOM);

  return (
    <section className="u6-bloque">
      <h2>6.2.1 window (medidas útiles)</h2>
      <p>
        <code>window</code> es el objeto global del navegador; muchas APIs (<code>setTimeout</code>,{" "}
        <code>document</code>) cuelgan de él.
      </p>
      {info && (
        <ul>
          <li>
            innerWidth × innerHeight: {info.innerWidth} × {info.innerHeight}
          </li>
        </ul>
      )}

      <h2>6.2.2 location</h2>
      {info && (
        <ul>
          <li>href: {info.href}</li>
          <li>pathname: {info.pathname}</li>
          <li>protocol: {info.protocol}</li>
        </ul>
      )}

      <h2>6.2.3 history</h2>
      <p>
        <code>history.back()</code> / <code>forward()</code> / <code>go(n)</code> navegan por el historial del{" "}
        <em>mismo</em> pestaña/ventana.
      </p>
      {info && <p>Número de entradas (length): {info.historyLength}</p>}
      <button type="button" onClick={() => window.history.back()}>
        history.back()
      </button>{" "}
      <button type="button" onClick={() => window.history.forward()}>
        history.forward()
      </button>

      <h2>6.2.4 navigator</h2>
      {info && (
        <ul>
          <li>userAgent: {info.userAgent}</li>
          <li>language: {info.language}</li>
        </ul>
      )}

      <h2>6.2 (extra) screen</h2>
      {info && <p>Resolución de pantalla: {info.screen}</p>}
    </section>
  );
}
