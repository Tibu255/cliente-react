/**
 * Unidad 7 — 7.2.2 alternativa poco recomendada: leer valores con useRef (no reactivo como el estado).
 */
import { useRef } from "react";

export default function FormularioNoControladoRef() {
  const nombreRef = useRef(null);
  const emailRef = useRef(null);

  const envioForm = (e) => {
    e.preventDefault();
    const nombre = nombreRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    window.alert(`(refs) nombre=${nombre}, email=${email}`);
  };

  return (
    <form onSubmit={envioForm}>
      <label>
        Nombre:
        <input ref={nombreRef} type="text" defaultValue="" />
      </label>
      <br />
      <label>
        Email:
        <input ref={emailRef} type="email" defaultValue="" />
      </label>
      <br />
      <button type="submit">Leer con refs</button>
    </form>
  );
}
