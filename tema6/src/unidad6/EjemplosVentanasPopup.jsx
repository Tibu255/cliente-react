/**
 * Unidad 6 — 6.4.1 Ventanas: window.open, close, postMessage.
 * Requiere `public/popup.html` (mismo origen en Vite: http://localhost:5173/popup.html).
 * El temario avisa: algunos “live server” bloquean popups; en Vite suele funcionar si el navegador permite ventanas.
 */
import { useRef } from "react";

export default function EjemplosVentanasPopup() {
  const popupRef = useRef(null);

  const abrirPopup = () => {
    popupRef.current = window.open("/popup.html", "PopupU6", "width=420,height=320");
  };

  const enviarMensaje = () => {
    const popup = popupRef.current;
    if (popup && !popup.closed) {
      popup.postMessage("Te saludo desde la ventana principal", "*");
    } else {
      window.alert("La ventana emergente no está abierta.");
    }
  };

  return (
    <section className="u6-bloque">
      <h2>6.4.1 Gestión de ventanas y postMessage</h2>
      <p>
        <code>window.open(url, nombre, features)</code> devuelve referencia a la ventana hija.{" "}
        <code>postMessage</code> envía datos; la hija escucha el evento <code>message</code>.
      </p>
      <button type="button" onClick={abrirPopup}>
        Abrir ventana
      </button>{" "}
      <button type="button" onClick={enviarMensaje}>
        Enviar mensaje
      </button>
    </section>
  );
}
