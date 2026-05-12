/**
 * 8.1.1–8.1.3 — Bucle de eventos, pila y cola (resumen del temario).
 */
export function BuclePilaColaTeoria() {
  return (
    <div className="u8-bloque">
      <h3>8.1.1 Bucle de eventos</h3>
      <p>
        El motor de JavaScript es <strong>monohilo</strong>: una sola pila de ejecución. Las tareas
        asíncronas (temporizadores, peticiones de red, promesas) se programan y el bucle de eventos
        las va despachando cuando la pila queda libre.
      </p>
      <h3>8.1.2 Pila (stack)</h3>
      <p>
        Las llamadas a funciones se apilan (LIFO). Si una función tarda mucho, bloquea la pila y la
        interfaz no puede actualizarse hasta que termine.
      </p>
      <h3>8.1.3 Cola (queue)</h3>
      <p>
        Las tareas asíncronas esperan en colas (FIFO u orden de microtareas). El bucle toma la
        siguiente tarea cuando la pila está vacía.
      </p>
    </div>
  );
}
