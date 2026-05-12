/**
 * Apartado 5 (Unidades 5 y 6): muestra la canción con mayor `track_popularity` del array recibido.
 */

function MasPopular({ canciones }) {
  if (!canciones.length) {
    return (
      <section className="bloque">
        <h2>Canción más popular</h2>
        <p>No hay datos.</p>
      </section>
    );
  }

  const masPopular = canciones.reduce((mejor, actual) => {
    const pMejor = typeof mejor.track_popularity === "number" ? mejor.track_popularity : -1;
    const pActual =
      typeof actual.track_popularity === "number" ? actual.track_popularity : -1;
    return pActual > pMejor ? actual : mejor;
  });

  return (
    <section className="bloque">
      <h2>Canción más popular</h2>
      <div className="tarjeta-popular">
        <p>
          <strong>Título:</strong> {masPopular.track_name}
        </p>
        <p>
          <strong>Artista:</strong> {masPopular.track_artist}
        </p>
        <p>
          <strong>Popularidad:</strong>{" "}
          {typeof masPopular.track_popularity === "number"
            ? masPopular.track_popularity
            : "—"}
        </p>
      </div>
    </section>
  );
}

export default MasPopular;
