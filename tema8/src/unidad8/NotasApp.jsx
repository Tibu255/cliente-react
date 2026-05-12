import { useEffect, useState } from "react";
import { notasApi } from "../notas/notasApi.js";

/**
 * 8.3.4 CRUD notas — sin `VITE_NOTAS_URL` usa localStorage (simula servidor).
 */
export function NotasApp() {
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const refresh = () => {
    setError("");
    notasApi
      .getAll()
      .then(setLista)
      .catch((e) => setError(String(e.message || e)));
  };

  useEffect(() => {
    refresh();
  }, []);

  const guardar = async () => {
    setError("");
    try {
      if (editId != null) {
        await notasApi.update({ id: editId, titulo, contenido });
      } else {
        await notasApi.create({ titulo, contenido });
      }
      setTitulo("");
      setContenido("");
      setEditId(null);
      refresh();
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  const editar = (n) => {
    setEditId(n.id);
    setTitulo(n.titulo);
    setContenido(n.contenido);
  };

  const borrar = async (id) => {
    setError("");
    try {
      await notasApi.remove(id);
      if (editId === id) {
        setEditId(null);
        setTitulo("");
        setContenido("");
      }
      refresh();
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  return (
    <div className="u8-bloque">
      <h3>8.3.4 Notas (CRUD)</h3>
      <p>
        Opcional: <code>.env</code> con <code>VITE_NOTAS_URL=http://localhost:8000/notas.php</code>{" "}
        para apuntar a tu PHP. Sin variable, datos en <code>localStorage</code> (clave{" "}
        <code>u8_notas_demo</code>).
      </p>
      <div className="u8-notas-form">
        <input
          className="u8-input"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          className="u8-textarea"
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows={3}
        />
        <div className="u8-row">
          <button type="button" className="u8-btn" onClick={guardar}>
            {editId != null ? "Actualizar" : "Crear"}
          </button>
          {editId != null ? (
            <button
              type="button"
              className="u8-btn u8-btn--ghost"
              onClick={() => {
                setEditId(null);
                setTitulo("");
                setContenido("");
              }}
            >
              Cancelar edición
            </button>
          ) : null}
        </div>
      </div>
      {error ? <p className="u8-err">{error}</p> : null}
      <ul className="u8-notas-list">
        {lista.map((n) => (
          <li key={n.id} className="u8-notas-item">
            <strong>{n.titulo}</strong>
            <span className="u8-muted"> #{n.id}</span>
            <p>{n.contenido}</p>
            <div className="u8-row">
              <button type="button" className="u8-btn u8-btn--small" onClick={() => editar(n)}>
                Editar
              </button>
              <button type="button" className="u8-btn u8-btn--small u8-btn--danger" onClick={() => borrar(n.id)}>
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
