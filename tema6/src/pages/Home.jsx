/**
 * Unidad 6 — 6.4.2: página inicial del ejemplo de React Router (temario).
 * Link navega en SPA sin recargar toda la página.
 */
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section id="home">
      <h1>Bienvenid@</h1>
      <p>
        <Link to="/pagina1">Entrar a Página 1</Link>
      </p>
      <p>
        <Link to="/u6">Ver ejemplos de la Unidad 6 (componentes, BOM, galería, contexto…)</Link>
      </p>
      <p>
        <Link to="/producto/demo-1">Ejemplo ruta con parámetro /producto/:id</Link>
      </p>
    </section>
  );
};

export default Home;
