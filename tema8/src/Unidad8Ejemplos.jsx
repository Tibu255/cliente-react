/**
 * Unidad 8 — Comunicación asíncrona (CIFP Avilés / DWEC).
 * Contenedor con bloques alineado con tema5/tema7: secciones enmarcadas y módulos en `src/unidad8/`.
 *
 * Cubre: 8.1 bucle de eventos / pila / cola / bloqueo vs setTimeout; 8.2 Ajax (XHR, HTTP, callbacks,
 * promesas, fetch, async/await); 8.3 XML+select, catálogo con promesas, notas CRUD, referencia Express.
 */

import { AsyncAwaitEjemplos } from "./unidad8/AsyncAwaitEjemplos.jsx";
import { BuclePilaColaTeoria } from "./unidad8/BuclePilaColaTeoria.jsx";
import { CallbacksCalculadora } from "./unidad8/CallbacksCalculadora.jsx";
import { CatalogoProductos } from "./unidad8/CatalogoProductos.jsx";
import { ExpressApiResumen } from "./unidad8/ExpressApiResumen.jsx";
import { FetchJsonPlaceholder } from "./unidad8/FetchJsonPlaceholder.jsx";
import { FetchPostHeaders } from "./unidad8/FetchPostHeaders.jsx";
import { MetodosHTTPYJson } from "./unidad8/MetodosHTTPYJson.jsx";
import { NotasApp } from "./unidad8/NotasApp.jsx";
import { PromesasCadenaAllRace } from "./unidad8/PromesasCadenaAllRace.jsx";
import { TareaLentaVsAsincrono } from "./unidad8/TareaLentaVsAsincrono.jsx";
import { XHRTextoPlano } from "./unidad8/XHRTextoPlano.jsx";
import { XMLColoresSelect } from "./unidad8/XMLColoresSelect.jsx";

const marco = {
  border: "1px solid #ccc",
  padding: "1rem",
  marginBottom: "1rem",
  borderRadius: "4px",
};

function Bloque({ titulo, apartado, children }) {
  return (
    <section style={marco}>
      <h2 style={{ marginTop: 0 }}>{titulo}</h2>
      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "-0.25rem" }}>{apartado}</p>
      {children}
    </section>
  );
}

export default function Unidad8Ejemplos() {
  return (
    <article style={{ maxWidth: 960, margin: "0 auto", textAlign: "left", padding: "1rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Unidad 8 — Comunicación asíncrona</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        Ejemplos en <code>src/unidad8/</code>, catálogo en <code>src/catalogo/libCatalogo.js</code>, notas en{" "}
        <code>src/notas/notasApi.js</code> y estáticos en <code>public/</code>.
      </p>

      <Bloque titulo="Bucle de eventos, pila y cola" apartado="§8.1.1–8.1.3">
        <BuclePilaColaTeoria />
      </Bloque>

      <Bloque titulo="Tarea lenta vs setTimeout" apartado="§8.1.4–8.1.5 — bloqueo del hilo">
        <TareaLentaVsAsincrono />
      </Bloque>

      <Bloque titulo="XMLHttpRequest (texto plano)" apartado="§8.2.1 — GET a public/demo-xhr.txt">
        <XHRTextoPlano />
      </Bloque>

      <Bloque titulo="Métodos HTTP y JSON" apartado="§8.2.2">
        <MetodosHTTPYJson />
      </Bloque>

      <Bloque titulo="Callbacks" apartado="§8.2.3">
        <CallbacksCalculadora />
      </Bloque>

      <Bloque titulo="Promesas: cadena, all, race" apartado="§8.2.4">
        <PromesasCadenaAllRace />
      </Bloque>

      <Bloque titulo="Fetch GET (JSON)" apartado="§8.2.5 — jsonplaceholder + response.ok">
        <FetchJsonPlaceholder />
      </Bloque>

      <Bloque titulo="Fetch POST y cabeceras" apartado="§8.2.5">
        <FetchPostHeaders />
      </Bloque>

      <Bloque titulo="async / await" apartado="§8.2.6">
        <AsyncAwaitEjemplos />
      </Bloque>

      <Bloque titulo="XML y desplegable" apartado="§8.3.1 — DOMParser + public/*.xml">
        <XMLColoresSelect />
      </Bloque>

      <Bloque titulo="Catálogo con promesas e intersección" apartado="§8.3.2 — libCatalogo.js">
        <CatalogoProductos />
      </Bloque>

      <Bloque titulo="API con Express (referencia)" apartado="§8.3.3">
        <ExpressApiResumen />
      </Bloque>

      <Bloque titulo="Notas CRUD" apartado="§8.3.4 — notasApi.js (localStorage o VITE_NOTAS_URL)">
        <NotasApp />
      </Bloque>
    </article>
  );
}
