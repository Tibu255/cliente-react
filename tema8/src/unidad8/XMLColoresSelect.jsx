import { useState } from "react";

/**
 * 8.3.1 XHR/XML — aquí con fetch + DOMParser (mismo XML en `public/`).
 * El temario usa PHP `opciones.php`; sin servidor PHP, servimos XML estático.
 */
const ESQUEMAS = [
  { value: "colores-esquema1.xml", label: "Esquema 1 (red, green, blue)" },
  { value: "colores-esquema2.xml", label: "Esquema 2 (black, white, orange)" },
];

export function XMLColoresSelect() {
  const [esquema, setEsquema] = useState(ESQUEMAS[0].value);
  const [opciones, setOpciones] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    setError("");
    setOpciones([]);
    try {
      const url = `${import.meta.env.BASE_URL}${esquema}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const doc = new DOMParser().parseFromString(text, "text/xml");
      const errs = doc.querySelector("parsererror");
      if (errs) throw new Error("XML mal formado");
      const nodos = doc.getElementsByTagName("opcion");
      const arr = [];
      for (let i = 0; i < nodos.length; i += 1) {
        arr.push(nodos[i].textContent || "");
      }
      setOpciones(arr);
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  return (
    <div className="u8-bloque">
      <h3>8.3.1 XML y &lt;select&gt;</h3>
      <p>
        Carga un XML con etiquetas <code>&lt;opcion&gt;</code> y rellena un desplegable. Con PHP
        sería <code>opciones.php?esquema=…</code>; aquí ficheros en <code>public/</code>.
      </p>
      <div className="u8-row u8-row--wrap">
        <select className="u8-select" value={esquema} onChange={(e) => setEsquema(e.target.value)}>
          {ESQUEMAS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button type="button" className="u8-btn" onClick={cargar}>
          Cargar XML
        </button>
      </div>
      {error ? <p className="u8-err">{error}</p> : null}
      <label className="u8-label">
        Color
        <select className="u8-select" disabled={opciones.length === 0}>
          {opciones.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
