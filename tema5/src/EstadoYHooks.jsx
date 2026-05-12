/**
 * Unidad 5 — 5.5.2 Estado y hooks (material CIFP Avilés, DWEC)
 *
 * Resumen del temario:
 * - El estado (state) permite controlar y modificar el componente durante su ejecución.
 * - A diferencia de las props, el estado sí debe modificarse para cambiar apariencia y comportamiento.
 * - Al cambiar el estado, React vuelve a renderizar el componente.
 * - Un hook es una función reutilizable en componentes funcionales; useState define valor inicial,
 *   el valor actual y una función "setter" (p. ej. setNombre) — nunca se asigna directamente al estado.
 *
 * Props vs estado (cierre del apartado):
 * - Props: datos que vienen del padre; no debes mutarlas dentro del hijo (en la práctica, "solo lectura").
 * - Estado: situación interna del componente; al cambiar, se re-renderiza por eventos, usuario, datos, etc.
 */

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/* Ejemplo 1 (PDF): varias variables de estado antes del return               */
/* -------------------------------------------------------------------------- */

function EjemploVariasVariablesEstado() {
  // useState devuelve [valor, setter]. El valor inicial es el argumento de useState.
  const [nombre, setNombre] = useState("Alicia");
  const [datos, setDatos] = useState([]);

  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>1. Varios useState (nombre + array datos)</h2>
      <p>
        En el PDF, <code>datos</code> empieza como array vacío; aquí añadimos un botón de demo para
        usar <code>setDatos</code> sin mutar el array a mano (spread + nuevo elemento).
      </p>
      <header>
        <h3>{nombre}</h3>
      </header>
      <main>
        <button type="button" onClick={() => setNombre(nombre === "Alicia" ? "Bob" : "Alicia")}>
          Alternar nombre
        </button>{" "}
        <button type="button" onClick={() => setDatos([...datos, `elemento-${datos.length + 1}`])}>
          Añadir a datos
        </button>
        <pre>{JSON.stringify(datos, null, 2)}</pre>
      </main>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Ejemplo 2 (PDF): contador — estado simple y evento onClick                 */
/* -------------------------------------------------------------------------- */

function EjemploContador() {
  const [contador, setContador] = useState(0);

  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>2. Estado simple: contador</h2>
      <p>Al pulsar, se llama a <code>setContador</code>; React re-renderiza y ves el número nuevo.</p>
      <h3>Estado simple: {contador}</h3>
      <button type="button" onClick={() => setContador(contador + 1)}>
        Cambio de estado
      </button>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Ejemplo 3 (PDF): un solo estado como objeto + actualización con spread     */
/* -------------------------------------------------------------------------- */

function EjemploEstadoObjeto() {
  const [estado, setEstado] = useState({
    nombre: "Beetlejuice",
    datos: [],
  });

  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h2>3. Estado agrupado en un objeto</h2>
      <p>
        Para cambiar solo una propiedad hay que conservar el resto con el spread{" "}
        <code>{`{ ...estado, nombre: "Bob" }`}</code> (si no, pierdes el resto de campos).
      </p>
      <header>
        <h3>{estado.nombre}</h3>
      </header>
      <button
        type="button"
        onClick={() =>
          setEstado({
            ...estado,
            nombre: estado.nombre === "Beetlejuice" ? "Bob" : "Beetlejuice",
          })
        }
      >
        Cambiar nombre (spread)
      </button>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Ejemplo 4 (PDF): estado más elaborado — número aleatorio, lista, hora…    */
/* -------------------------------------------------------------------------- */

function EjemploEstadoComplejo() {
  const [estado, setEstado] = useState({
    titulo: "Por defecto",
    hora: new Date().toLocaleTimeString(),
    numero: 0,
    numeros: [],
  });

  const cambiarEstado = () => {
    const numero = Math.round(Math.random() * 4);

    // El PDF hace numeros.push sobre una copia de la referencia del array del estado.
    // Eso muta el array anterior y puede dar problemas. Aquí: nuevo array inmutable.
    const numeros = [...estado.numeros, numero];

    setEstado({
      hora: new Date().toLocaleTimeString(),
      numeros,
      numero,
      titulo: numero % 2 === 0 ? "Número par" : "Número impar",
    });

    // Ojo: en consola aún verás el estado "anterior" en el mismo tick (React 18 agrupa updates).
    console.log("cambiarEstado> ", estado);
  };

  const colores = ["red", "yellow", "green", "blue", "orange"];

  return (
    <section
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: colores[estado.numero] ?? "#fff",
      }}
    >
      <h2>4. Estado complejo (título, hora, número, lista, color de fondo)</h2>
      <header>
        <h3>
          {estado.titulo} — {estado.numero}
        </h3>
      </header>
      <div>
        <div>{estado.hora}</div>
        <p>Pulsa el botón para cambiar el estado.</p>
        <div>
          <button type="button" onClick={cambiarEstado}>
            Cambiar estado
          </button>
        </div>
        <div>
          Números generados:
          <ul>
            {estado.numeros.map((n, i) => (
              // key con índice: los números pueden repetirse
              <li key={`${i}-${n}`}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Componente contenedor: monta todos los ejemplos del apartado               */
/* -------------------------------------------------------------------------- */

export default function EstadoYHooksEjemplos() {
  return (
    <article style={{ maxWidth: 720, margin: "0 auto" }}>
      <h3>5.5.2 Estado y hooks — ejemplos del temario</h3>
      <EjemploVariasVariablesEstado />
      <EjemploContador />
      <EjemploEstadoObjeto />
      <EjemploEstadoComplejo />
    </article>
  );
}
