/**
 * Unidad 6 — 6.3.2: clase modelo para cada elemento de la galería (temario).
 * Cada Foto agrupa id, título, url en /images/, texto alt y descripción.
 */
export default class Foto {
  constructor(inicializador) {
    this.id = inicializador.id;
    this.titulo = inicializador.titulo;
    this.url = inicializador.url;
    this.alt = inicializador.alt;
    this.descripcion = inicializador.descripcion;
    // El PDF asigna siempre new Date() aquí; la prop fecha del inicializador se ignora en el original.
    this.fecha = new Date();
  }

  /** En el PDF: true si id es undefined (foto “sin registrar”). */
  esNueva() {
    return this.id === undefined;
  }
}
