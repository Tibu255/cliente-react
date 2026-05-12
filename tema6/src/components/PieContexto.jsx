import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const PieContexto = () => {
  const contexto = useContext(AppContext);
  return (
    <footer>
      <small>Este es el pie de página — {contexto.titulo}</small>
    </footer>
  );
};

export default PieContexto;
