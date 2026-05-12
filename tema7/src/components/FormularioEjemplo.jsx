/**
 * Unidad 7 — 7.8 / formulario controlado sencillo (mismo patrón que el temario para pruebas).
 */
import { useState } from "react";

export default function FormularioEjemplo() {
  const [nombre, setNombre] = useState("");

  const cambioEntrada = (event) => {
    setNombre(event.target.value);
  };

  const envioForm = (event) => {
    event.preventDefault();
    alert(`Se ha enviado el formulario con el nombre: ${nombre}`);
  };

  return (
    <form onSubmit={envioForm}>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={cambioEntrada} />
      </label>
      <button type="submit">Enviar datos</button>
    </form>
  );
}
