/**
 * Apartado 3 (Unidades 5 y 6): tabla con id, nombre, artista, álbum y duración en segundos.
 * La lista llega como prop `canciones` desestructurada en la firma (pista del enunciado).
 *
 * Cada objeto del JSON del esqueleto trae: track_id, track_name, track_artist,
 * track_album_name, duration_ms, track_popularity, etc.
 */

function duracionSegundos(durationMs) {
  if (typeof durationMs !== "number") {
    return "—";
  }
  return Math.round(durationMs / 1000);
}

function ListadoCanciones({ canciones }) {
  return (
    <section className="bloque">
      <h2>Listado completo</h2>
      <div className="tabla-scroll">
        <table className="tabla-canciones">
          <thead>
            <tr>
              <th scope="col">Id de la pista</th>
              <th scope="col">Nombre</th>
              <th scope="col">Artista</th>
              <th scope="col">Nombre del álbum</th>
              <th scope="col">Duración (s)</th>
            </tr>
          </thead>
          <tbody>
            {canciones.map((pista) => (
              <tr key={pista.track_id}>
                <td>{pista.track_id}</td>
                <td>{pista.track_name}</td>
                <td>{pista.track_artist}</td>
                <td>{pista.track_album_name}</td>
                <td>{duracionSegundos(pista.duration_ms)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ListadoCanciones;
