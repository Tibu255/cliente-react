/**
 * Unidad 6 — Rutas según temario 6.4.2 (react-router-dom).
 * BrowserRouter envuelve esta app en main.jsx.
 */
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Pagina1 from "./pages/Pagina1.jsx";
import Producto from "./pages/Producto.jsx";
import Unidad6Demos from "./pages/Unidad6Demos.jsx";
import "./App.css";

function App() {
  return (
    <div className="App u6-root">
      <nav className="u6-nav" aria-label="Navegación principal">
        <Link to="/">Inicio</Link>
        <Link to="/pagina1">Página 1</Link>
        <Link to="/u6">Ejemplos U6</Link>
        <Link to="/producto/abc-123">Producto demo</Link>
      </nav>

      <main className="u6-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pagina1" element={<Pagina1 />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/u6" element={<Unidad6Demos />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
