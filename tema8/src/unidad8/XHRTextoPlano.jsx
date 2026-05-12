import { useState } from "react";

/**
 * 8.2.1 XMLHttpRequest — GET a texto plano en `public/demo-xhr.txt`.
 */
export function XHRTextoPlano() {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  const cargar = () => {
    setError("");
    setTexto("Cargando…");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${import.meta.env.BASE_URL}demo-xhr.txt`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) setTexto(xhr.responseText);
      else setError(`HTTP ${xhr.status}`);
    };
    xhr.onerror = () => setError("Error de red");
    xhr.send();
  };

  return (
    <div className="u8-bloque">
      <h3>8.2.1 XMLHttpRequest (texto)</h3>
      <p>
        Clásico <code>open</code> + <code>send</code> + <code>onload</code>. El fichero está en{" "}
        <code>public/demo-xhr.txt</code>.
      </p>
      <button type="button" className="u8-btn" onClick={cargar}>
        GET demo-xhr.txt
      </button>
      {error ? <p className="u8-err">{error}</p> : null}
      <pre className="u8-pre">{texto}</pre>
    </div>
  );
}
