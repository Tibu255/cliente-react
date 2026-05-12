/**
 * Unidad 7 — 7.2.2 Formularios en React: formulario controlado (código del temario).
 * El valor del input vive en el estado; onChange actualiza el estado.
 */
import { useState } from "react";

const FormularioControlado = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const cambioEntrada = (event) => {
    if (event.target.type === "text") setNombre(event.target.value);
    else if (event.target.type === "email") setEmail(event.target.value);
  };

  const envioForm = (event) => {
    event.preventDefault();
    window.alert(`Se ha enviado el formulario con el nombre ${nombre} y correo electrónico ${email}`);
  };

  return (
    <form onSubmit={envioForm}>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={cambioEntrada} />
      </label>
      <br />
      <label>
        Correo electrónico:
        <input type="email" value={email} onChange={cambioEntrada} />
      </label>
      <br />
      <button type="submit">Enviar datos</button>
    </form>
  );
};

export default FormularioControlado;
