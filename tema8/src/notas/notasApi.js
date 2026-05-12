/**
 * Unidad 8 — 8.3.4 CRUD de notas.
 * Si defines `import.meta.env.VITE_NOTAS_URL` (p. ej. http://localhost:8000/notas.php),
 * se usa fetch como en el temario. Si no, se simula servidor con localStorage.
 */

const LS_KEY = "u8_notas_demo";

const getBase = () => (import.meta.env.VITE_NOTAS_URL || "").trim();

const readLocal = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocal = (arr) => {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
};

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const notasApi = {
  async getAll() {
    const base = getBase();
    if (base) {
      const res = await fetch(base);
      if (!res.ok) throw new Error(`GET notas: ${res.status}`);
      return res.json();
    }
    await delay();
    return readLocal();
  },

  async create(nota) {
    const base = getBase();
    if (base) {
      const res = await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nota),
      });
      if (!res.ok) throw new Error(`POST nota: ${res.status}`);
      return res.json();
    }
    await delay();
    const arr = readLocal();
    const id = arr.length ? Math.max(...arr.map((n) => n.id)) + 1 : 1;
    const nueva = { id, titulo: nota.titulo, contenido: nota.contenido };
    arr.push(nueva);
    writeLocal(arr);
    return nueva;
  },

  async update(nota) {
    const base = getBase();
    if (base) {
      const res = await fetch(base, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nota),
      });
      if (!res.ok) throw new Error(`PUT nota: ${res.status}`);
      return res.json();
    }
    await delay();
    const arr = readLocal();
    const i = arr.findIndex((n) => n.id === nota.id);
    if (i === -1) throw new Error("Nota no encontrada");
    arr[i] = { ...arr[i], ...nota };
    writeLocal(arr);
    return arr[i];
  },

  async remove(id) {
    const base = getBase();
    if (base) {
      const res = await fetch(base, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(`DELETE nota: ${res.status}`);
      return res.json();
    }
    await delay();
    const arr = readLocal().filter((n) => n.id !== id);
    writeLocal(arr);
    return { ok: true };
  },
};
