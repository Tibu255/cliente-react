/**
 * Unidad 7 — Interacción con el usuario: eventos y formularios (CIFP Avilés, DWEC).
 * Mismo enfoque que tema5: un contenedor con secciones enmarcadas y comentarios en cada fichero.
 *
 * Contenido cubierto: 7.1 eventos + closures, 7.2 teclado, 7.3 personalizados, 7.4 React sintéticos,
 * 7.2 formularios / inputs, 7.2.2 controlado, refs, 7.3 file+FileReader, 7.4 apariencia, 7.5 validación,
 * 7.6 FormData / estado objeto, 7.7 regex + filtrado, 7.8 prueba (Vitest) + formulario de ejemplo.
 *
 * 7.8 Storybook: el PDF indica `npx storybook init` y crear stories; no se incluye el servidor Storybook
 * para no inflar el repo. Prueba de integración: `src/test/FormularioEjemplo.test.jsx` (`pnpm test`).
 */

import BotonFuncionExterna from "./unidad7/BotonFuncionExterna.jsx";
import CampoArchivoLectura from "./unidad7/CampoArchivoLectura.jsx";
import ClosuresEjemplo from "./unidad7/ClosuresEjemplo.jsx";
import EventosPersonalizados from "./unidad7/EventosPersonalizados.jsx";
import EventosRaton from "./unidad7/EventosRaton.jsx";
import EventosReactSinteticos from "./unidad7/EventosReactSinteticos.jsx";
import EventosTeclado from "./unidad7/EventosTeclado.jsx";
import FiltradoUsuarios from "./unidad7/FiltradoUsuarios.jsx";
import FormDataEstadoObjeto from "./unidad7/FormDataEstadoObjeto.jsx";
import FormularioApariencia from "./unidad7/FormularioApariencia.jsx";
import FormularioControlado from "./unidad7/FormularioControlado.jsx";
import FormularioFormDataDOM from "./unidad7/FormularioFormDataDOM.jsx";
import FormularioModeloHTML from "./unidad7/FormularioModeloHTML.jsx";
import FormularioNoControladoRef from "./unidad7/FormularioNoControladoRef.jsx";
import PatronesInputHTML from "./unidad7/PatronesInputHTML.jsx";
import RegexYReemplazo from "./unidad7/RegexYReemplazo.jsx";
import ValidacionHTML5 from "./unidad7/ValidacionHTML5.jsx";
import FormularioEjemplo from "./components/FormularioEjemplo.jsx";

const marco = {
  border: "1px solid #ccc",
  padding: "1rem",
  marginBottom: "1rem",
  borderRadius: "4px",
};

function Bloque({ titulo, apartado, children }) {
  return (
    <section style={marco}>
      <h2 style={{ marginTop: 0 }}>{titulo}</h2>
      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "-0.25rem" }}>{apartado}</p>
      {children}
    </section>
  );
}

export default function Unidad7Ejemplos() {
  return (
    <article style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Unidad 7 — Eventos y formularios</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        Ejemplos comentados en <code>src/unidad7/</code> y <code>src/components/FormularioEjemplo.jsx</code>.
      </p>

      <Bloque titulo="Modelo de eventos y función externa" apartado="§7.1 — patrón onclick → manejador">
        <BotonFuncionExterna />
      </Bloque>

      <Bloque titulo="Ratón: borde al pasar (equivalente onmouseover/out)" apartado="§7.1 — tabla de eventos">
        <EventosRaton />
      </Bloque>

      <Bloque titulo="Closures (MsgBox)" apartado="§7.1 — self y setTimeout">
        <ClosuresEjemplo />
      </Bloque>

      <Bloque titulo="Eventos de teclado" apartado="§7.2 — key, modificadores">
        <EventosTeclado />
      </Bloque>

      <Bloque titulo="Eventos personalizados (DOM)" apartado="§7.3 — Event / CustomEvent">
        <EventosPersonalizados />
      </Bloque>

      <Bloque titulo="Eventos sintéticos en React" apartado="§7.4 — onClick, onChange, preventDefault">
        <EventosReactSinteticos />
      </Bloque>

      <Bloque titulo="Formulario modelo (inputs del temario)" apartado="§7.2 / §7.2.1 — text, file, select, pattern DNI">
        <FormularioModeloHTML />
      </Bloque>

      <Bloque titulo="Formulario controlado (nombre + email)" apartado="§7.2.2">
        <FormularioControlado />
      </Bloque>

      <Bloque titulo="Formulario no controlado (useRef)" apartado="§7.2.2 — alternativa poco recomendada">
        <FormularioNoControladoRef />
      </Bloque>

      <Bloque titulo="FormData sobre el nodo form" apartado="§7.6 — procesarDatos + FormData">
        <FormularioFormDataDOM />
      </Bloque>

      <Bloque titulo="Estado objeto (estilo FormData en React)" apartado="§7.6 — recomendación temario">
        <FormDataEstadoObjeto />
      </Bloque>

      <Bloque titulo="Campo file + FileReader.readAsText" apartado="§7.3 — archivos en formulario">
        <CampoArchivoLectura />
      </Bloque>

      <Bloque titulo="Apariencia (CSS del PDF)" apartado="§7.4 — botón, inputs, fieldset">
        <FormularioApariencia />
      </Bloque>

      <Bloque titulo="Validación HTML5 + checkValidity" apartado="§7.5 — validacion.js adaptado">
        <ValidacionHTML5 />
      </Bloque>

      <Bloque titulo="pattern en inputs (NIF, teléfono)" apartado="§7.7">
        <PatronesInputHTML />
      </Bloque>

      <Bloque titulo="Filtrado con RegExp" apartado="§7.7 — componente Filtrado">
        <FiltradoUsuarios />
      </Bloque>

      <Bloque titulo="Regex: email, replace y flag g" apartado="§7.7">
        <RegexYReemplazo />
      </Bloque>

      <Bloque titulo="Formulario para prueba 7.8 (integración)" apartado="§7.8 — ver src/test/FormularioEjemplo.test.jsx">
        <FormularioEjemplo />
      </Bloque>
    </article>
  );
}
