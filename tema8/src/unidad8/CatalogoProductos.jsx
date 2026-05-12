import { useEffect, useMemo, useState } from "react";
import { creaApiCatalogo } from "../catalogo/libCatalogo.js";

const api = creaApiCatalogo();

function obtieneInterseccion(arrays) {
  if (!arrays.length) return [];
  return arrays.reduce((acc, cur) => acc.filter((x) => cur.some((y) => y.id === x.id)));
}

/**
 * 8.3.2 Catálogo en memoria — búsqueda por ID, tipo, precio e intersección (temario).
 */
export function CatalogoProductos() {
  const [todos, setTodos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [id, setId] = useState("");
  const [tipo, setTipo] = useState("Electrónica");
  const [precio, setPrecio] = useState("100");
  const [diferencia, setDiferencia] = useState("20");
  const [tablaId, setTablaId] = useState([]);
  const [tablaTipo, setTablaTipo] = useState([]);
  const [tablaPrecio, setTablaPrecio] = useState([]);
  const [interseccion, setInterseccion] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    setCargando(true);
    api
      .obtieneProductos()
      .then((p) => {
        if (!cancel) setTodos(p);
      })
      .catch((e) => {
        if (!cancel) setError(String(e.message || e));
      })
      .finally(() => {
        if (!cancel) setCargando(false);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const procesarBusqueda = () => {
    setError("");
    const pid = parseInt(id, 10);
    const promesas = [];

    if (Number.isFinite(pid)) {
      promesas.push(
        api.obtieneProductoPorId(pid).then((p) => {
          setTablaId([p]);
          return [p];
        }),
      );
    } else {
      setTablaId([]);
      promesas.push(Promise.resolve([]));
    }

    promesas.push(
      api.obtieneProductosPorTipo(tipo).then((p) => {
        setTablaTipo(p);
        return p;
      }),
    );

    const precioNum = Number(precio);
    const diffNum = Number(diferencia);
    if (Number.isFinite(precioNum) && Number.isFinite(diffNum)) {
      promesas.push(
        api.obtieneProductosPorPrecio(precioNum, diffNum).then((p) => {
          setTablaPrecio(p);
          return p;
        }),
      );
    } else {
      setTablaPrecio([]);
      promesas.push(Promise.resolve([]));
    }

    Promise.all(promesas)
      .then((arrays) => {
        const inter = obtieneInterseccion(arrays.filter((a) => a.length));
        setInterseccion(inter);
      })
      .catch((e) => setError(String(e.message || e)));
  };

  const filas = useMemo(
    () => (rows) =>
      rows.map((r) => (
        <tr key={r.id}>
          <td>{r.id}</td>
          <td>{r.precio}</td>
          <td>{r.tipo}</td>
        </tr>
      )),
    [],
  );

  return (
    <div className="u8-bloque">
      <h3>8.3.2 Catálogo (promesas + intersección)</h3>
      <p>
        Catálogo aleatorio de 100 productos en memoria; cada consulta tarda ~1 s (simula red).
        Pulsa &quot;Buscar&quot; para lanzar las tres consultas en paralelo y calcular la
        intersección por <code>id</code>.
      </p>
      {cargando ? <p>Cargando catálogo inicial…</p> : <p>Productos cargados: {todos.length}</p>}
      <div className="u8-grid-cat">
        <label className="u8-label">
          ID
          <input className="u8-input" value={id} onChange={(e) => setId(e.target.value)} placeholder="ej. 5" />
        </label>
        <label className="u8-label">
          Tipo
          <select className="u8-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {["Electrónica", "Libro", "Ropa", "Comida"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="u8-label">
          Precio centro
          <input className="u8-input" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </label>
        <label className="u8-label">
          Diferencia ±
          <input className="u8-input" value={diferencia} onChange={(e) => setDiferencia(e.target.value)} />
        </label>
      </div>
      <button type="button" className="u8-btn" onClick={procesarBusqueda}>
        Buscar (paralelo + intersección)
      </button>
      {error ? <p className="u8-err">{error}</p> : null}

      <div className="u8-tables">
        <div>
          <h4>Por ID</h4>
          <table className="u8-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Precio</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>{filas(tablaId)}</tbody>
          </table>
        </div>
        <div>
          <h4>Por tipo</h4>
          <table className="u8-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Precio</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>{filas(tablaTipo.slice(0, 15))}</tbody>
          </table>
          {tablaTipo.length > 15 ? <p className="u8-muted">… mostrando 15 de {tablaTipo.length}</p> : null}
        </div>
        <div>
          <h4>Por precio ±</h4>
          <table className="u8-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Precio</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>{filas(tablaPrecio.slice(0, 15))}</tbody>
          </table>
          {tablaPrecio.length > 15 ? (
            <p className="u8-muted">… mostrando 15 de {tablaPrecio.length}</p>
          ) : null}
        </div>
        <div>
          <h4>Intersección</h4>
          <table className="u8-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Precio</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>{filas(interseccion)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
