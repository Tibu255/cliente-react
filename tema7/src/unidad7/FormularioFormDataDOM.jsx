/**
 * Unidad 7 — 7.6: FormData sobre el nodo <form> del DOM (como en el PDF).
 * Útil para comparar con el enfoque solo con estado en React.
 */
import { useRef } from "react";

const procesarDatos = (datos) => ({
  nombreusuario: datos.nombre.trim().toUpperCase(),
  email: datos.email.toLowerCase(),
});

export default function FormularioFormDataDOM() {
  const formRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);
    const datosProcesados = procesarDatos({
      nombre: String(fd.get("nombre") ?? ""),
      email: String(fd.get("email") ?? ""),
    });
    window.console.info("Datos procesados:", datosProcesados);
    window.alert("Datos enviados correctamente (ver consola).");
  };

  return (
    <form ref={formRef} id="infoUsuario" onSubmit={onSubmit}>
      <p>
        <label htmlFor="nombre-fd">Introduce tu nombre de usuario:</label>
        <input type="text" id="nombre-fd" name="nombre" defaultValue="Juan Nadie" />
      </p>
      <p>
        <label htmlFor="email-fd">Introduce tu correo electrónico:</label>
        <input type="email" id="email-fd" name="email" required />
      </p>
      <button type="submit">Enviar</button>
    </form>
  );
}
