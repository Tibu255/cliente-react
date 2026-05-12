import { Link } from "react-router-dom";

const Pagina1 = () => {
  return (
    <>
      <p>Página 1</p>
      <p>
        <Link to="/">← Inicio</Link>
      </p>
    </>
  );
};

export default Pagina1;
