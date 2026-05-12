/**
 * Consume el contexto con useContext: lee titulo y color sin recibir props del padre.
 */
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const EncabezadoContexto = () => {
  const contexto = useContext(AppContext);
  return (
    <header style={{ color: contexto.color }}>
      <h3>Esto es un encabezado</h3>
      <h4>{contexto.titulo}</h4>
    </header>
  );
};

export default EncabezadoContexto;
