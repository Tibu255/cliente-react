/**
 * Unidad 7 — 7.4: estilos del PDF (.azul, .col/.color, fieldset con leyenda).
 */
import "./FormularioApariencia.css";

export default function FormularioApariencia() {
  return (
    <div>
      <p>
        <button type="button" className="u7-azul">
          Botón azul (nombre de clase del PDF; texto rojo)
        </button>
      </p>
      <input className="u7-col" type="text" defaultValue="texto" readOnly />
      <br />
      <br />
      <input className="u7-color" type="text" defaultValue="texto" readOnly />
      <fieldset className="u7-fieldset">
        <legend>Formulario</legend>
        <div>
          <label htmlFor="nom-ap">Nombre</label>
          <input type="text" id="nom-ap" />
        </div>
        <div>
          <label htmlFor="ape-ap">Apellidos</label>
          <input type="text" id="ape-ap" size={35} />
        </div>
        <button type="button" className="u7-azul">
          Dar de alta
        </button>
      </fieldset>
    </div>
  );
}
