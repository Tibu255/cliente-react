/**
 * Unidad 7 — 7.7: filtrado de lista con RegExp (ejemplo Filtrado del PDF).
 */
import { useMemo, useState } from "react";

export default function FiltradoUsuarios() {
  const [busqueda, setBusqueda] = useState("");
  const usuarios = useMemo(
    () => [
      { id: 1, nombre: "Cassandra Smith" },
      { id: 2, nombre: "Ryan Curtis" },
      { id: 3, nombre: "Dean Walker" },
    ],
    [],
  );

  const usuariosFiltrados = useMemo(() => {
    const q = busqueda.trim();
    if (!q) return usuarios;
    const regex = new RegExp(q, "i");
    return usuarios.filter((usuario) => regex.test(usuario.nombre));
  }, [busqueda, usuarios]);

  return (
    <>
      <input
        type="text"
        placeholder="Buscar usuario…"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <ul>
        {usuariosFiltrados.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre}</li>
        ))}
      </ul>
    </>
  );
}
