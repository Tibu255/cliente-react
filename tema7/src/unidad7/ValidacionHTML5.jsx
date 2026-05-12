/**
 * Unidad 7 — 7.5: validación HTML5 + checkValidity / validationMessage (lógica del validacion.js del PDF, en React).
 */
import { useRef, useState } from "react";

const error = (elemento, mensaje, setMensaje) => {
  setMensaje(mensaje === "" ? elemento.validationMessage : mensaje);
  elemento.className = "u7-error";
  elemento.focus();
};

const borrarError = (form, setMensaje) => {
  setMensaje("");
  const els = form?.elements;
  if (!els) return;
  Array.from(els).forEach((e) => {
    if (e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLButtonElement) {
      e.className = "";
    }
  });
};

const validaElemento = (id, setMensaje) => {
  const elemento = document.getElementById(id);
  if (!elemento || !("checkValidity" in elemento)) return true;
  if (!elemento.checkValidity()) {
    if (id === "nombre-val" && elemento.validity.valueMissing) {
      error(elemento, "Debe introducir un nombre", setMensaje);
    } else {
      error(elemento, "", setMensaje);
    }
    return false;
  }
  return true;
};

export default function ValidacionHTML5() {
  const formRef = useRef(null);
  const [mensajeError, setMensajeError] = useState("");

  const validar = (e) => {
    borrarError(formRef.current, setMensajeError);
    if (
      validaElemento("nombre-val", setMensajeError) &&
      validaElemento("edad-val", setMensajeError) &&
      window.confirm("¿Enviar el formulario?")
    ) {
      return true;
    }
    e.preventDefault();
    return false;
  };

  return (
    <form ref={formRef} onSubmit={validar}>
      <style>{`
        .u7-error { border: solid 2px #ff0 !important; }
      `}</style>
      <table>
        <tbody>
          <tr>
            <td>Nombre:</td>
            <td>
              <input type="text" name="nombre" id="nombre-val" maxLength={15} required />
            </td>
          </tr>
          <tr>
            <td>Edad:</td>
            <td>
              <input type="number" name="edad" id="edad-val" min={18} max={110} required />
            </td>
          </tr>
        </tbody>
      </table>
      <p id="mensajeError">{mensajeError}</p>
      <p>
        <button type="submit" id="enviar">
          Enviar
        </button>
        <button
          type="reset"
          id="borrar"
          onClick={() => {
            borrarError(formRef.current, setMensajeError);
          }}
        >
          Borrar
        </button>
      </p>
    </form>
  );
}
