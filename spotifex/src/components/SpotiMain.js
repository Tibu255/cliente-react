import { useEffect, useState } from "react";
import ListadoCanciones from "./ListadoCanciones";
import FiltradoCanciones from "./FiltradoCanciones";
import MasPopular from "./MasPopular";
import "./SpotiMain.css";

/**
 * Apartado 1 (Unidad 5): componente contenedor que renderiza el resto al abrir la app.
 *
 * Apartado 2 (Unidad 8): función asíncrona con fetch a `/json/Spotify.json` (archivo en `public`).
 *
 * Unidad 6: `useState` guarda la lista y el estado de carga/error; `useEffect` lanza la petición
 * al montar el componente (una vez, dependencias `[]`).
 */
function SpotiMain() {
  const [canciones, setCanciones] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    /**
     * Obtiene el array de canciones del JSON del proyecto (mismo formato que el esqueleto oficial).
     */
    async function obtenerCanciones() {
      setError("");
      setCargando(true);
      try {
        const respuesta = await fetch(`${process.env.PUBLIC_URL}/json/Spotify.json`);

        if (!respuesta.ok) {
          throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          throw new Error("Se esperaba un array de canciones en el JSON.");
        }

        setCanciones(datos);
      } catch (e) {
        setCanciones([]);
        setError(String(e.message || e));
      } finally {
        setCargando(false);
      }
    }

    obtenerCanciones();
  }, []);

  return (
    <main className="spotimain">
      <h1>SpotifEx</h1>

      {cargando ? <p>Cargando canciones…</p> : null}

      {!cargando && error ? (
        <p className="spotimain__error" role="alert">
          {error}
        </p>
      ) : null}

      {!cargando && !error ? (
        <>
          <ListadoCanciones canciones={canciones} />
          <FiltradoCanciones canciones={canciones} />
          <MasPopular canciones={canciones} />
        </>
      ) : null}
    </main>
  );
}

export default SpotiMain;
