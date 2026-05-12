import { useState } from "react";

/**
 * 8.2.5 Fetch — POST con cabeceras y cuerpo JSON.
 */
export function FetchPostHeaders() {
  const [out, setOut] = useState("");

  const post = async () => {
    setOut("Enviando…");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ title: "Demo U8", body: "Hola desde tema8", userId: 1 }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setOut(JSON.stringify(json, null, 2));
    } catch (e) {
      setOut(String(e.message || e));
    }
  };

  return (
    <div className="u8-bloque">
      <h3>8.2.5 Fetch (POST + headers)</h3>
      <button type="button" className="u8-btn" onClick={post}>
        POST /posts
      </button>
      <pre className="u8-pre">{out || "(pulsa el botón)"}</pre>
    </div>
  );
}
