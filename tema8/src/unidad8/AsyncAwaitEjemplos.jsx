import { useState } from "react";

async function fetchUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * 8.2.6 async / await — mismo flujo que then, sintaxis secuencial.
 */
export function AsyncAwaitEjemplos() {
  const [out, setOut] = useState("");

  const run = async () => {
    setOut("Cargando usuario 1…");
    try {
      const u = await fetchUser(1);
      setOut(JSON.stringify({ name: u.name, email: u.email, city: u.address?.city }, null, 2));
    } catch (e) {
      setOut(String(e.message || e));
    }
  };

  return (
    <div className="u8-bloque">
      <h3>8.2.6 async / await</h3>
      <p>
        <code>async</code> devuelve una promesa; <code>await</code> pausa la función async hasta
        resolver. Usa <code>try/catch</code> para errores de red o HTTP.
      </p>
      <button type="button" className="u8-btn" onClick={run}>
        await fetchUser(1)
      </button>
      <pre className="u8-pre">{out || "(sin datos)"}</pre>
    </div>
  );
}
