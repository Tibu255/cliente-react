import { useState } from "react";

/**
 * 8.2.5 Fetch API — GET JSON (jsonplaceholder) y comprobación response.ok.
 */
export function FetchJsonPlaceholder() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const cargar = async () => {
    setError("");
    setData(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  return (
    <div className="u8-bloque">
      <h3>8.2.5 Fetch (GET JSON)</h3>
      <p>
        Siempre comprueba <code>response.ok</code> antes de asumir éxito. Servicio de prueba:{" "}
        <a href="https://jsonplaceholder.typicode.com/">jsonplaceholder</a>.
      </p>
      <button type="button" className="u8-btn" onClick={cargar}>
        GET /posts/1
      </button>
      {error ? <p className="u8-err">{error}</p> : null}
      <pre className="u8-pre">{data ? JSON.stringify(data, null, 2) : "(sin datos)"}</pre>
    </div>
  );
}
