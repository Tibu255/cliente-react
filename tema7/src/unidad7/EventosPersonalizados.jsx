/**
 * Unidad 7 — 7.3: Event y CustomEvent con addEventListener / dispatchEvent.
 * useRef + useEffect engancha listeners al botón DOM (equivalente al script del PDF).
 */
import { useEffect, useRef } from "react";

export default function EventosPersonalizados() {
  const refBtn = useRef(null);

  useEffect(() => {
    const el = refBtn.current;
    if (!el) return;

    const onPersonalizado = () => {
      window.alert("Has lanzado el evento personalizado");
    };
    const onPersonalizado2 = (e) => {
      window.console.info("Evento disparado:", e);
      window.console.info("Datos del evento:", e.detail);
    };

    el.addEventListener("personalizado", onPersonalizado, false);
    el.addEventListener("personalizado2", onPersonalizado2);

    return () => {
      el.removeEventListener("personalizado", onPersonalizado);
      el.removeEventListener("personalizado2", onPersonalizado2);
    };
  }, []);

  return (
    <button
      ref={refBtn}
      type="button"
      onClick={() => {
        refBtn.current?.dispatchEvent(new Event("personalizado"));
        refBtn.current?.dispatchEvent(new CustomEvent("personalizado2", { detail: { id: 1 } }));
      }}
    >
      Elemento de prueba (1º alert; 2º mira consola)
    </button>
  );
}
