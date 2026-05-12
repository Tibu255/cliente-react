/**
 * Unidad 7 — 7.1: mismo patrón que el botón del PDF (función externa en vez de código inline largo).
 */
const muestraMensaje = () => {
  window.alert("Gracias por hacer clic");
};

export default function BotonFuncionExterna() {
  return (
    <button type="button" onClick={muestraMensaje}>
      Pulsa y verás
    </button>
  );
}
