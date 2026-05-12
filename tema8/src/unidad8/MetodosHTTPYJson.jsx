import { useState } from "react";

/**
 * 8.2.2 Métodos HTTP y JSON.stringify / parse (demostración local).
 */
export function MetodosHTTPYJson() {
  const [out, setOut] = useState("");

  const demoJson = () => {
    const obj = { metodo: "POST", cuerpo: { titulo: "Hola", n: 42 } };
    const str = JSON.stringify(obj);
    const parsed = JSON.parse(str);
    setOut(JSON.stringify(parsed, null, 2));
  };

  return (
    <div className="u8-bloque">
      <h3>8.2.2 Métodos HTTP y JSON</h3>
      <p>
        GET, POST, PUT, DELETE… En el cliente, <code>JSON.stringify</code> prepara el cuerpo y{" "}
        <code>JSON.parse</code> interpreta la respuesta.
      </p>
      <button type="button" className="u8-btn" onClick={demoJson}>
        stringify → parse (objeto de ejemplo)
      </button>
      <pre className="u8-pre">{out || "(pulsa el botón)"}</pre>
    </div>
  );
}
