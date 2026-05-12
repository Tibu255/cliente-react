/**
 * Unidad 6 — 6.1.1 Date y 6.1.2 Math
 * Comentarios alineados con el temario (instantes, get/set, UTC, Math global).
 */
export default function EjemplosDateMath() {
  const hoy = new Date();
  const nuevaFecha = new Date("2024-06-25T19:19:43");
  const anoNuevoLocal = new Date(2024, 0, 1, 0, 15);

  const diffMs = hoy.getTime() - nuevaFecha.getTime();
  const diasAprox = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  return (
    <section className="u6-bloque">
      <h2>6.1.1 El objeto Date</h2>
      <p>
        <code>new Date()</code> sin argumentos = instante actual (zona horaria local del navegador).
      </p>
      <ul>
        <li>
          <strong>Hoy (toString):</strong> {hoy.toString()}
        </li>
        <li>
          <strong>Fecha local (toLocaleDateString):</strong> {hoy.toLocaleDateString()}
        </li>
        <li>
          <strong>getFullYear / getMonth / getDate:</strong> {hoy.getFullYear()} — mes {hoy.getMonth()} (0=enero) — día{" "}
          {hoy.getDate()}
        </li>
        <li>
          <strong>getTime</strong> (ms desde 1/1/1970 UTC): {hoy.getTime()}
        </li>
        <li>
          <strong>getTimezoneOffset()</strong> (minutos local vs UTC): {hoy.getTimezoneOffset()}
        </li>
        <li>
          <strong>Ejemplo UTC vs local</strong> (1 ene 2024, 00:15 local):<br />
          Local: {anoNuevoLocal.toString()}
          <br />
          toUTCString: {anoNuevoLocal.toUTCString()}
        </li>
        <li>
          Diferencia aproximada en días entre “hoy” y una fecha fija del temario: <strong>{diasAprox}</strong> (resta de
          timestamps en ms).
        </li>
      </ul>

      <h2>6.1.2 El objeto Math</h2>
      <p>
        <code>Math</code> es un objeto global con constantes y funciones estáticas (no hace falta instanciarlo).
      </p>
      <ul>
        <li>
          <strong>Math.PI:</strong> {Math.PI}
        </li>
        <li>
          <strong>Math.sqrt(2):</strong> {Math.sqrt(2)}
        </li>
        <li>
          <strong>Math.floor(x * 10)</strong> con x en [0,1) da entero 0–9; ejemplo estático:{" "}
          {Math.floor(0.73 * 10)}
        </li>
      </ul>

      <h2>6.1.3 Cláusula with</h2>
      <p>
        El temario la menciona como forma antigua de acortar prefijos de propiedades. En <strong>módulos ES y modo
        estricto</strong> está prohibida y no debe usarse. En código moderno se prefiere desestructuración o objetos
        con nombres explícitos.
      </p>
    </section>
  );
}
