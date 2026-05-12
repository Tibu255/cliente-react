import HolaMundo, { AdiosMundo } from "./holamundo.jsx";
import Bucles from "./bucles.jsx";
import EstadoYHooksEjemplos from "./EstadoYHooks.jsx";
import Visor from "./components/Visor.jsx";

/**
 * Nombres de ficheros en `public/images/` (como en el temario).
 * Las rutas públicas en Vite/React se sirven desde la raíz: `/images/...`.
 */
const imagenesSrc = [
  "imagen1.png",
  "imagen2.png",
  "imagen3.png",
  "imagen4.png",
  "imagen5.jpg",
  "imagen6.jpg",
  // En el PDF aparece imagen7.webp; aquí usamos PNG real para que el navegador lo decodifique bien.
  "imagen7.png",
];

export default function App() {
  return (
    <div>
      <HolaMundo />
      <AdiosMundo />
      <Bucles />

      <section style={{ margin: "2rem 0" }}>
        <h2>Visor de imágenes (5.5.3)</h2>
        <Visor imagenes={imagenesSrc} />
      </section>

      <EstadoYHooksEjemplos />
    </div>
  );
}
