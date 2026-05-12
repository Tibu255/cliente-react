/**
 * Unidad 6 — 6.7.1 Cookies y 6.7.2 localStorage / sessionStorage (resumen práctico).
 */
import { useState } from "react";

const getValorCookie = (name) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];

export default function EjemplosAlmacenamiento() {
  const [cookieIdioma, setCookieIdioma] = useState(() => getValorCookie("idioma") ?? "(no definida)");
  const [lsDemo, setLsDemo] = useState(() => localStorage.getItem("u6_demo") ?? "(vacío)");

  const escribirCookie = () => {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `idioma=es; path=/; max-age=${maxAge}`;
    setCookieIdioma(getValorCookie("idioma") ?? "");
  };

  const escribirLocalStorage = () => {
    const valor = `guardado-${Date.now()}`;
    localStorage.setItem("u6_demo", valor);
    setLsDemo(valor);
  };

  const limpiarLocalStorage = () => {
    localStorage.removeItem("u6_demo");
    setLsDemo("(vacío)");
  };

  return (
    <section className="u6-bloque">
      <h2>6.7.1 Cookies (document.cookie)</h2>
      <p>
        Lectura con la función del temario (split + find + optional chaining). Escritura con <code>path=/</code> y{" "}
        <code>max-age</code>.
      </p>
      <p>
        Valor de <code>idioma</code>: <strong>{cookieIdioma}</strong>
      </p>
      <button type="button" onClick={escribirCookie}>
        Definir cookie idioma=es
      </button>

      <h2>6.7.2 localStorage</h2>
      <p>
        No viaja al servidor en cada petición (a diferencia de cookies). Persiste entre sesiones del mismo origen.
      </p>
      <p>
        Clave <code>u6_demo</code>: <strong>{lsDemo}</strong>
      </p>
      <button type="button" onClick={escribirLocalStorage}>
        Escribir en localStorage
      </button>{" "}
      <button type="button" onClick={limpiarLocalStorage}>
        Borrar clave
      </button>
    </section>
  );
}
