/**
 * Unidad 6 — 6.4.2 parámetros en rutas: useParams lee :id de la URL.
 */
import { Link, useParams } from "react-router-dom";

const Producto = () => {
  const { id } = useParams();
  return (
    <section id="producto">
      <p>
        Estás consultando el producto con identificador <strong>{id}</strong>
      </p>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </section>
  );
};

export default Producto;
