/**
 * 8.3.3 API REST con Node/Express (resumen del temario).
 * El ejemplo del PDF sirve JSON con corredores F1; aquí no arrancamos servidor,
 * solo se listan rutas típicas para que puedas reproducirlo en un proyecto aparte.
 */
export function ExpressApiResumen() {
  return (
    <div className="u8-bloque">
      <h3>8.3.3 Express (referencia)</h3>
      <p>
        Patrón habitual: <code>express()</code>, <code>app.get(&apos;/api/corredores&apos;, …)</code>,{" "}
        <code>res.json([…])</code>, <code>app.listen(3000)</code>. CORS:{" "}
        <code>Access-Control-Allow-Origin</code> si el front está en otro origen.
      </p>
      <pre className="u8-pre">
{`// Ejemplo mínimo (en carpeta server aparte)
import express from 'express';
const app = express();
app.get('/api/corredores', (req, res) => {
  res.json([{ id: 1, nombre: 'Alonso', equipo: 'Aston Martin' }]);
});
app.listen(3000, () => console.log('http://localhost:3000'));`}
      </pre>
    </div>
  );
}
