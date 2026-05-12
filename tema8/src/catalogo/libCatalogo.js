/**
 * Unidad 8 — 8.3.2 Catálogo de productos (lógica tipo `lib.js` del temario).
 * Exporta `creaApiCatalogo()` → objeto con métodos que devuelven Promesas (~1 s).
 */
const creaObjetoAleatorio = () => {
  const arrayTipos = ["Electrónica", "Libro", "Ropa", "Comida"];
  const precio = (Math.random() * 500).toFixed(2);
  const tipo = arrayTipos[Math.floor(Math.random() * 4)];
  return { precio, tipo };
};

const creaCatalogoAleatorio = (num) => {
  const cat = [];
  for (let i = 0; i < num; i += 1) {
    const obj = creaObjetoAleatorio();
    cat.push({ id: i, precio: obj.precio, tipo: obj.tipo });
  }
  return cat;
};

const catalogo = creaCatalogoAleatorio(100);

export const creaApiCatalogo = () => ({
  obtieneProductos: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(catalogo), 1000);
    }),

  obtieneProductoPorId: (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const producto = catalogo.find((p) => p.id == id);
        if (producto) resolve({ id: Number(id), precio: producto.precio, tipo: producto.tipo });
        else reject(new Error(`ID no encontrado: ${id}`));
      }, 1000);
    }),

  obtieneProductosPorTipo: (tipo) =>
    new Promise((resolve, reject) => {
      const tiposPosibles = ["Electrónica", "Libro", "Ropa", "Comida"];
      if (!tiposPosibles.includes(tipo)) {
        reject(new Error(`Tipo no válido: ${tipo}`));
        return;
      }
      setTimeout(() => {
        resolve(catalogo.filter((p) => p.tipo === tipo));
      }, 1000);
    }),

  obtieneProductosPorPrecio: (precio, diferencia) =>
    new Promise((resolve, reject) => {
      if (!Number.isFinite(Number(precio))) {
        reject(new Error(`Precio no válido: ${precio}`));
        return;
      }
      setTimeout(() => {
        const centro = Number(precio);
        const diff = Number(diferencia);
        resolve(catalogo.filter((p) => Math.abs(Number(p.precio) - centro) < diff));
      }, 1000);
    }),
});
