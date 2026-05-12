const express = require("express");
const cors = require("cors");
const fs = require("node:fs/promises");
const path = require("node:path");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "data", "polizas.json");

app.use(cors());
app.use(express.json());

const allowedTransmisiones = ["Automática", "Manual"];
const allowedCombustible = ["Combustión", "Eléctrico"];

const regexRules = {
  idPoliza: /^ID\d{5}$/,
  matricula: /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,
};

const normalizeBody = (raw) => ({
  id_poliza: String(raw.id_poliza || "").trim(),
  vigencia: Number(raw.vigencia),
  matricula: String(raw.matricula || "").trim().toUpperCase(),
  edad_coche: Number(raw.edad_coche),
  edad_tomador: Number(raw.edad_tomador),
  cilindrada: Number(raw.cilindrada),
  cilindros: Number(raw.cilindros),
  transmision: String(raw.transmision || "").trim(),
  comb_electrico: String(raw.comb_electrico || "").trim(),
  peso: Number(raw.peso),
  siniestro: Number(raw.siniestro),
});

const validatePoliza = (poliza, options = { isUpdate: false }) => {
  const errors = [];

  const requiredFields = [
    "id_poliza",
    "vigencia",
    "matricula",
    "edad_coche",
    "edad_tomador",
    "cilindrada",
    "cilindros",
    "transmision",
    "comb_electrico",
    "peso",
    "siniestro",
  ];

  for (const field of requiredFields) {
    const value = poliza[field];
    if (value === "" || value === null || Number.isNaN(value) || value === undefined) {
      errors.push(`El campo '${field}' es obligatorio.`);
    }
  }

  if (!regexRules.idPoliza.test(poliza.id_poliza)) {
    errors.push("id_poliza debe tener formato IDXXXXX (5 digitos).");
  }
  if (!regexRules.matricula.test(poliza.matricula)) {
    errors.push("La matricula debe tener formato espanol valido (4 numeros + 3 letras).");
  }
  if (poliza.vigencia < 1 || poliza.vigencia > 21) {
    errors.push("vigencia debe estar entre 1 y 21 meses.");
  }
  if (poliza.edad_coche < 0 || poliza.edad_coche > 10) {
    errors.push("edad_coche debe estar entre 0 y 10.");
  }
  if (poliza.edad_tomador < 18 || poliza.edad_tomador > 90) {
    errors.push("edad_tomador debe estar entre 18 y 90.");
  }
  if (!allowedTransmisiones.includes(poliza.transmision)) {
    errors.push("transmision solo admite 'Automática' o 'Manual'.");
  }
  if (!allowedCombustible.includes(poliza.comb_electrico)) {
    errors.push("comb_electrico solo admite 'Combustión' o 'Eléctrico'.");
  }
  if (![0, 1].includes(poliza.siniestro)) {
    errors.push("siniestro debe ser 0 o 1.");
  }

  if (options.isUpdate && options.original) {
    if (poliza.id_poliza !== options.original.id_poliza) {
      errors.push("No se permite modificar id_poliza.");
    }
    if (poliza.matricula !== options.original.matricula) {
      errors.push("No se permite modificar matricula.");
    }
  }

  return errors;
};

const readPolizas = async () => {
  const data = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(data);
};

const writePolizas = async (rows) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(rows, null, 2), "utf8");
};

const filterPolizas = (rows, { transmision, comb_electrico, siniestro }) =>
  rows.filter((row) => {
    if (transmision && row.transmision !== transmision) return false;
    if (comb_electrico && row.comb_electrico !== comb_electrico) return false;
    if (siniestro !== undefined && siniestro !== "" && row.siniestro !== Number(siniestro)) return false;
    return true;
  });

app.get("/polizas", async (_, res) => {
  const rows = await readPolizas();
  res.json(rows);
});

app.get("/polizas/:id_poliza", async (req, res) => {
  const rows = await readPolizas();
  const found = rows.find((r) => r.id_poliza === req.params.id_poliza);
  if (!found) return res.status(404).json({ error: "Poliza no encontrada." });
  res.json(found);
});

app.post("/polizas", async (req, res) => {
  const rows = await readPolizas();
  const payload = normalizeBody(req.body);
  const errors = validatePoliza(payload);
  if (rows.some((r) => r.id_poliza === payload.id_poliza)) {
    errors.push("Ya existe una poliza con ese id_poliza.");
  }
  if (rows.some((r) => r.matricula === payload.matricula)) {
    errors.push("Ya existe una poliza para esa matricula.");
  }
  if (errors.length) return res.status(400).json({ errors });

  rows.push(payload);
  await writePolizas(rows);
  res.status(201).json(payload);
});

app.put("/polizas", async (req, res) => {
  const rows = await readPolizas();
  const payload = normalizeBody(req.body);
  const index = rows.findIndex((r) => r.id_poliza === payload.id_poliza);
  if (index === -1) return res.status(404).json({ error: "Poliza no encontrada." });

  const errors = validatePoliza(payload, { isUpdate: true, original: rows[index] });
  if (errors.length) return res.status(400).json({ errors });

  rows[index] = payload;
  await writePolizas(rows);
  res.json(payload);
});

app.delete("/polizas/:id_poliza", async (req, res) => {
  const rows = await readPolizas();
  const index = rows.findIndex((r) => r.id_poliza === req.params.id_poliza);
  if (index === -1) return res.status(404).json({ error: "Poliza no encontrada." });

  const [deleted] = rows.splice(index, 1);
  await writePolizas(rows);
  res.json(deleted);
});

app.get("/estadisticas", async (req, res) => {
  const rows = await readPolizas();
  const filtered = filterPolizas(rows, req.query);
  const total = filtered.length;

  const siniestros = filtered.filter((r) => r.siniestro === 1).length;
  const noSiniestros = total - siniestros;
  const ratio = (count) => (total ? Number(((count / total) * 100).toFixed(2)) : 0);
  const avg = (key) =>
    total ? Number((filtered.reduce((acc, curr) => acc + curr[key], 0) / total).toFixed(2)) : 0;

  res.json({
    filtros: req.query,
    total_polizas: total,
    porcentaje_siniestro: ratio(siniestros),
    porcentaje_sin_siniestro: ratio(noSiniestros),
    media_edad_coche: avg("edad_coche"),
    media_edad_tomador: avg("edad_tomador"),
  });
});

app.listen(PORT, () => {
  console.log(`API de polizas ejecutandose en http://localhost:${PORT}`);
});
