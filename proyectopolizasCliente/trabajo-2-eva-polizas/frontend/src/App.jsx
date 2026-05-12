import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import { ValidationContext } from "./ValidationContext";

const API = "http://localhost:3001";
const INITIAL_FORM = {
  id_poliza: "",
  vigencia: "",
  matricula: "",
  edad_coche: "",
  edad_tomador: "",
  cilindrada: "",
  cilindros: "",
  transmision: "Manual",
  comb_electrico: "Combustión",
  peso: "",
  siniestro: 0,
};

function App() {
  const [polizas, setPolizas] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filtros, setFiltros] = useState({ transmision: "", comb_electrico: "", siniestro: "" });
  const [estadisticas, setEstadisticas] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const { regexIdPoliza, regexMatricula } = useContext(ValidationContext);

  const sortedPolizas = useMemo(
    () => [...polizas].sort((a, b) => a.id_poliza.localeCompare(b.id_poliza)),
    [polizas],
  );

  const cleanForm = (raw) => ({
    ...raw,
    id_poliza: raw.id_poliza.trim().toUpperCase(),
    matricula: raw.matricula.trim().toUpperCase(),
    vigencia: Number(raw.vigencia),
    edad_coche: Number(raw.edad_coche),
    edad_tomador: Number(raw.edad_tomador),
    cilindrada: Number(raw.cilindrada),
    cilindros: Number(raw.cilindros),
    peso: Number(raw.peso),
    siniestro: Number(raw.siniestro),
  });

  const fetchPolizas = async () => {
    const res = await axios.get(`${API}/polizas`);
    setPolizas(res.data);
  };

  const fetchEstadisticas = async (nextFilters = filtros) => {
    const params = Object.fromEntries(Object.entries(nextFilters).filter(([, v]) => v !== ""));
    const res = await axios.get(`${API}/estadisticas`, { params });
    setEstadisticas(res.data);
  };

  useEffect(() => {
    fetchPolizas();
    fetchEstadisticas();
  }, []);

  const validateClient = (p) => {
    if (!regexIdPoliza.test(p.id_poliza)) return "id_poliza invalido (IDXXXXX).";
    if (!regexMatricula.test(p.matricula)) return "matricula invalida (0000XXX).";
    if (p.vigencia < 1 || p.vigencia > 21) return "vigencia debe estar entre 1 y 21.";
    if (p.edad_coche < 0 || p.edad_coche > 10) return "edad_coche debe estar entre 0 y 10.";
    if (p.edad_tomador < 18 || p.edad_tomador > 90) return "edad_tomador debe estar entre 18 y 90.";
    if (!["Automática", "Manual"].includes(p.transmision)) return "transmision invalida.";
    if (!["Combustión", "Eléctrico"].includes(p.comb_electrico)) return "comb_electrico invalido.";
    return "";
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMensaje("");
    const payload = cleanForm(form);
    const localError = validateClient(payload);
    if (localError) {
      setError(localError);
      return;
    }
    try {
      if (editMode) {
        await axios.put(`${API}/polizas`, payload);
        setMensaje("Poliza actualizada correctamente.");
      } else {
        await axios.post(`${API}/polizas`, payload);
        setMensaje("Poliza creada correctamente.");
      }
      setForm(INITIAL_FORM);
      setEditMode(false);
      await fetchPolizas();
      await fetchEstadisticas();
    } catch (e) {
      setError(e.response?.data?.errors?.join(" ") || e.response?.data?.error || "Error inesperado.");
    }
  };

  const loadForEdit = (id_poliza) => {
    const found = polizas.find((p) => p.id_poliza === id_poliza);
    if (!found) return;
    setForm(found);
    setEditMode(true);
  };

  const deletePoliza = async (id_poliza) => {
    try {
      await axios.delete(`${API}/polizas/${id_poliza}`);
      setMensaje(`Poliza ${id_poliza} eliminada.`);
      setError("");
      await fetchPolizas();
      await fetchEstadisticas();
    } catch (e) {
      setError(e.response?.data?.error || "No se pudo eliminar.");
    }
  };

  const deleteByInput = async (event) => {
    event.preventDefault();
    if (!deleteId) return;
    await deletePoliza(deleteId.trim().toUpperCase());
    setDeleteId("");
  };

  const onFilterChange = async (event) => {
    const next = { ...filtros, [event.target.name]: event.target.value };
    setFiltros(next);
    await fetchEstadisticas(next);
  };

  return (
    <main className="container">
      <h1>Gestor de Polizas de Automovil</h1>

      {mensaje && <p className="ok">{mensaje}</p>}
      {error && <p className="ko">{error}</p>}

      <section className="panel">
        <h2>{editMode ? "Actualizar poliza" : "Alta de poliza"}</h2>
        <form className="grid-form" onSubmit={onSubmit}>
          <label>
            ID poliza
            <input name="id_poliza" value={form.id_poliza} onChange={onFormChange} required disabled={editMode} />
          </label>
          <label>
            Vigencia (meses)
            <input type="number" min="1" max="21" name="vigencia" value={form.vigencia} onChange={onFormChange} required />
          </label>
          <label>
            Matricula
            <input name="matricula" value={form.matricula} onChange={onFormChange} required disabled={editMode} />
          </label>
          <label>
            Edad coche
            <input type="number" min="0" max="10" name="edad_coche" value={form.edad_coche} onChange={onFormChange} required />
          </label>
          <label>
            Edad tomador
            <input type="number" min="18" max="90" name="edad_tomador" value={form.edad_tomador} onChange={onFormChange} required />
          </label>
          <label>
            Cilindrada
            <input type="number" min="1" name="cilindrada" value={form.cilindrada} onChange={onFormChange} required />
          </label>
          <label>
            Cilindros
            <input type="number" min="1" name="cilindros" value={form.cilindros} onChange={onFormChange} required />
          </label>
          <label>
            Transmision
            <select name="transmision" value={form.transmision} onChange={onFormChange}>
              <option>Manual</option>
              <option>Automática</option>
            </select>
          </label>
          <label>
            Combustible/Electrico
            <select name="comb_electrico" value={form.comb_electrico} onChange={onFormChange}>
              <option>Combustión</option>
              <option>Eléctrico</option>
            </select>
          </label>
          <label>
            Peso (kg)
            <input type="number" min="1" name="peso" value={form.peso} onChange={onFormChange} required />
          </label>
          <label>
            Siniestro
            <select name="siniestro" value={form.siniestro} onChange={onFormChange}>
              <option value={0}>No</option>
              <option value={1}>Si</option>
            </select>
          </label>
          <div className="actions">
            <button type="submit">{editMode ? "Guardar cambios" : "Crear poliza"}</button>
            {editMode && (
              <button type="button" onClick={() => { setEditMode(false); setForm(INITIAL_FORM); }}>
                Cancelar edicion
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Eliminar por ID</h2>
        <form className="inline" onSubmit={deleteByInput}>
          <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="ID00001" />
          <button type="submit">Eliminar</button>
        </form>
      </section>

      <section className="panel">
        <h2>Listado de polizas</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Vigencia</th><th>Matricula</th><th>Edad coche</th><th>Edad tomador</th>
                <th>Cilindrada</th><th>Cilindros</th><th>Transmision</th><th>Tipo</th><th>Peso</th><th>Siniestro</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedPolizas.map((p) => (
                <tr key={p.id_poliza}>
                  <td>{p.id_poliza}</td><td>{p.vigencia}</td><td>{p.matricula}</td><td>{p.edad_coche}</td><td>{p.edad_tomador}</td>
                  <td>{p.cilindrada}</td><td>{p.cilindros}</td><td>{p.transmision}</td><td>{p.comb_electrico}</td><td>{p.peso}</td>
                  <td>{p.siniestro === 1 ? "Si" : "No"}</td>
                  <td className="actions">
                    <button onClick={() => loadForEdit(p.id_poliza)}>Editar</button>
                    <button onClick={() => deletePoliza(p.id_poliza)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Estadisticas</h2>
        <div className="inline filters">
          <label>Transmision
            <select name="transmision" value={filtros.transmision} onChange={onFilterChange}>
              <option value="">Todas</option><option value="Manual">Manual</option><option value="Automática">Automática</option>
            </select>
          </label>
          <label>Tipo
            <select name="comb_electrico" value={filtros.comb_electrico} onChange={onFilterChange}>
              <option value="">Todos</option><option value="Combustión">Combustión</option><option value="Eléctrico">Eléctrico</option>
            </select>
          </label>
          <label>Siniestro
            <select name="siniestro" value={filtros.siniestro} onChange={onFilterChange}>
              <option value="">Todos</option><option value="1">Si</option><option value="0">No</option>
            </select>
          </label>
        </div>
        {estadisticas && (
          <ul>
            <li>Total polizas: {estadisticas.total_polizas}</li>
            <li>Porcentaje con siniestro: {estadisticas.porcentaje_siniestro}%</li>
            <li>Porcentaje sin siniestro: {estadisticas.porcentaje_sin_siniestro}%</li>
            <li>Media edad coche: {estadisticas.media_edad_coche}</li>
            <li>Media edad tomador: {estadisticas.media_edad_tomador}</li>
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
