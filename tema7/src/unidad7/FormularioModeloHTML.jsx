/**
 * Unidad 7 — 7.2 / 7.2.1: formulario completo del PDF (adaptado a React controlado donde hace falta).
 * action/method/enctype ilustran el modelo clásico; aquí action="#" y preventDefault para no salir de la SPA.
 */
import { useState } from "react";

export default function FormularioModeloHTML() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [sexo, setSexo] = useState("hombre");
  const [publicidad, setPublicidad] = useState("si");

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(`Guardar: ${nombre} ${apellidos}, DNI ${dni}, sexo ${sexo}, publ ${publicidad}`);
  };

  return (
    <form action="#" method="post" encType="multipart/form-data" onSubmit={onSubmit}>
      <label htmlFor="nombre-u7">Nombre:</label>
      <input
        id="nombre-u7"
        type="text"
        name="nombre"
        maxLength={30}
        required
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <label htmlFor="apellidos-u7">Apellidos:</label>
      <input
        id="apellidos-u7"
        type="text"
        name="ape"
        maxLength={80}
        required
        value={apellidos}
        onChange={(e) => setApellidos(e.target.value)}
      />
      <br />
      <label htmlFor="dni-u7">DNI:</label>
      <input
        id="dni-u7"
        type="text"
        name="dni"
        maxLength={9}
        pattern="\d{8}[A-Za-z]"
        title="8 números y 1 letra"
        required
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <label htmlFor="sexo-u7">Sexo:</label>
      <select id="sexo-u7" name="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)}>
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="otro">Otro</option>
        <option value="no_especificar">Prefiero no decirlo</option>
      </select>
      <br />
      <label htmlFor="foto-u7">Incluir mi foto:</label>
      <input type="file" id="foto-u7" name="foto" accept="image/*" />
      <label htmlFor="publ-u7">¿Desea recibir publicidad?</label>
      <select id="publ-u7" name="publ" value={publicidad} onChange={(e) => setPublicidad(e.target.value)}>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
      <br />
      <button type="submit">Guardar cambios</button>
      <button
        type="button"
        onClick={() => {
          setNombre("");
          setApellidos("");
          setDni("");
          setSexo("hombre");
          setPublicidad("si");
        }}
      >
        Borrar los datos introducidos
      </button>
    </form>
  );
}
