import { useState } from "react";

/**
 * Apartado 4 (Unidad 7): input de texto controlado; al cambiar el texto se filtra por artista
 * y se muestran solo los títulos (track_name) de las coincidencias.
 *
 * Apartado 5 de diseño del enunciado: estado local para el valor del cuadro de texto.
 */

function FiltradoCanciones({ canciones }) {
  const [textoArtista, setTextoArtista] = useState("");

  const filtro = textoArtista.trim().toLowerCase();

  const coincidencias =
    filtro === ""
      ? []
      : canciones.filter((pista) =>
          String(pista.track_artist).toLowerCase().includes(filtro),
        );

  return (
    <section className="bloque">
      <h2>Filtrar por artista</h2>
      <label className="filtro__label" htmlFor="input-artista">
        Nombre de artista
        <input
          id="input-artista"
          type="text"
          className="filtro__input"
          autoComplete="off"
          placeholder="Escribe parte del nombre…"
          value={textoArtista}
          onChange={(e) => setTextoArtista(e.target.value)}
        />
      </label>

      {filtro === "" ? (
        <p className="bloque__ayuda">Escribe para ver solo los títulos de ese artista.</p>
      ) : coincidencias.length === 0 ? (
        <p>No hay canciones para «{textoArtista.trim()}».</p>
      ) : (
        <ul className="lista-titulos">
          {coincidencias.map((pista) => (
            <li key={pista.track_id}>{pista.track_name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FiltradoCanciones;
