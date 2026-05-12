/**
 * Unidad 7 — 7.7: validar email con .test y replace con /g (ejemplos del PDF).
 */
import { useState } from "react";

const validaEmail = (valor) => /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(valor);

export default function RegexYReemplazo() {
  const [email, setEmail] = useState("a@b.co");
  const [ok, setOk] = useState(true);
  const [demo, setDemo] = useState("Borobudur");

  const onBlur = () => {
    setOk(validaEmail(email));
  };

  const una = () => setDemo((t) => t.replace(/[ou]/, "a"));
  const todas = () => setDemo((t) => t.replace(/[ou]/g, "a"));

  return (
    <div>
      <p>
        <label>
          Email (regex del temario):{" "}
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={onBlur} />
        </label>{" "}
        → {ok ? "válido" : "no válido"}
      </p>
      <p>
        Cadena: <strong>{demo}</strong>
      </p>
      <button type="button" onClick={una}>
        replace una /[ou]/
      </button>{" "}
      <button type="button" onClick={todas}>
        replace global /[ou]/g
      </button>
    </div>
  );
}
