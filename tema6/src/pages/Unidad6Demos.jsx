/**
 * Página que agrupa los ejemplos prácticos del PDF Unidad 6 (misma carpeta proyecto tema6).
 */
import { Link } from "react-router-dom";
import { AppContext, valoresDefecto } from "../context/AppContext.jsx";
import EncabezadoContexto from "../components/EncabezadoContexto.jsx";
import PieContexto from "../components/PieContexto.jsx";
import Galeria from "../components/Galeria.jsx";
import { ColFotos } from "../data/ColFotos.jsx";
import EjemplosDateMath from "../unidad6/EjemplosDateMath.jsx";
import EjemplosBOM from "../unidad6/EjemplosBOM.jsx";
import EjemplosTemporizadores from "../unidad6/EjemplosTemporizadores.jsx";
import EjemplosVentanasPopup from "../unidad6/EjemplosVentanasPopup.jsx";
import EjemplosAlmacenamiento from "../unidad6/EjemplosAlmacenamiento.jsx";

export default function Unidad6Demos() {
  return (
    <article className="u6-demos">
      <p>
        <Link to="/">← Volver al Home</Link>
      </p>
      <h1>Unidad 6 — Componentes y objetos predefinidos</h1>
      <p className="u6-nota">
        Bloques comentados en los ficheros de <code>src/unidad6</code>, <code>src/components</code>,{" "}
        <code>src/data</code> y <code>src/context</code>. Material CIFP Avilés (DWEC).
      </p>

      <EjemplosDateMath />
      <EjemplosBOM />
      <EjemplosTemporizadores />
      <EjemplosVentanasPopup />

      <section className="u6-bloque">
        <h2>6.3.2 Listas en React — Galería con Ficha + map</h2>
        <Galeria fotos={ColFotos} />
      </section>

      <section className="u6-bloque">
        <h2>6.3.3 React Context — Provider + useContext</h2>
        <p>
          <code>Provider value=...</code> envuelve a los hijos; encabezado y pie leen el mismo objeto sin props en
          cadena.
        </p>
        <AppContext.Provider value={valoresDefecto}>
          <EncabezadoContexto />
          <div>Esto simplemente es contenido entre header y footer.</div>
          <PieContexto />
        </AppContext.Provider>
      </section>

      <EjemplosAlmacenamiento />
    </article>
  );
}
