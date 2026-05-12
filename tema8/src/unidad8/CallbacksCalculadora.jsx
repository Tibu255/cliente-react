import { useState } from "react";

function sumaAsync(a, b, callback) {
  setTimeout(() => callback(a + b), 400);
}

/**
 * 8.2.3 Callbacks — patrón error-first y ejemplo con temporizador.
 */
export function CallbacksCalculadora() {
  const [log, setLog] = useState("");

  const run = () => {
    setLog("Esperando sumaAsync…");
    sumaAsync(3, 5, (res) => {
      setLog(`Resultado: ${res}`);
    });
  };

  return (
    <div className="u8-bloque">
      <h3>8.2.3 Callbacks</h3>
      <p>
        Las funciones callback se invocan cuando termina la operación asíncrona. En APIs reales
        suele usarse el patrón <code>(err, data)</code> como primer argumento de error.
      </p>
      <button type="button" className="u8-btn" onClick={run}>
        sumaAsync(3, 5, callback)
      </button>
      <pre className="u8-pre">{log}</pre>
    </div>
  );
}
