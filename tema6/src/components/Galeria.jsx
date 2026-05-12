/**
 * Recorre el array de fotos con .map y renderiza un <Ficha> por cada una.
 * key={foto.id}: React usa la key para reconciliar listas (no confundir con props normales).
 */
import Ficha from "./Ficha.jsx";
import "./Galeria.css";

function Galeria(props) {
  const fotos = props.fotos;
  return (
    <div className="galeria">
      {fotos.map((foto) => (
        <Ficha key={foto.id} foto={foto} />
      ))}
    </div>
  );
}

export default Galeria;
