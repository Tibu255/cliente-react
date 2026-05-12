import { useState } from "react";

const espera = (ms, valor) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(valor), ms);
  });

/**
 * 8.2.4 Promesas — cadena, Promise.all, Promise.race.
 */
export function PromesasCadenaAllRace() {
  const [out, setOut] = useState("");

  const cadena = () => {
    setOut("Cadena…");
    espera(200, 1)
      .then((x) => espera(200, x + 1))
      .then((x) => espera(200, x + 1))
      .then((x) => setOut(`Cadena terminada: ${x}`));
  };

  const allRace = () => {
    setOut("all + race…");
    Promise.all([espera(300, "A"), espera(100, "B"), espera(200, "C")]).then((arr) => {
      setOut((prev) => `${prev}\nPromise.all: ${JSON.stringify(arr)}`);
    });
    Promise.race([espera(500, "lento"), espera(50, "rápido")]).then((v) => {
      setOut((prev) => `${prev}\nPromise.race: ${v}`);
    });
  };

  return (
    <div className="u8-bloque">
      <h3>8.2.4 Promesas</h3>
      <p>
        <code>.then()</code> encadena resultados. <code>Promise.all</code> espera todas;{" "}
        <code>Promise.race</code> resuelve con la primera que termine.
      </p>
      <div className="u8-row">
        <button type="button" className="u8-btn" onClick={cadena}>
          Cadena then
        </button>
        <button type="button" className="u8-btn" onClick={allRace}>
          all + race
        </button>
      </div>
      <pre className="u8-pre">{out}</pre>
    </div>
  );
}
