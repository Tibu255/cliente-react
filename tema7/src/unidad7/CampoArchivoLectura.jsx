/**
 * Unidad 7 — 7.3 (campos de archivo): FileReader + evento load (PDF).
 * Solo lectura de texto; si eliges binario el “slice” puede verse raro.
 */
import { useState } from "react";

export default function CampoArchivoLectura() {
  const [msg, setMsg] = useState("Selecciona un archivo de texto (.txt)…");

  const onChange = (e) => {
    const input = e.target;
    if (!input.files?.length) return;
    setMsg("Leyendo…");
    const f = input.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      window.console.info("Fichero", f.name, "comienza por", text.slice(0, 20));
      setMsg(`Archivo ${f.name} — primeros caracteres: ${text.slice(0, 120)}`);
    });
    reader.readAsText(f);
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      <p style={{ fontSize: 14 }}>{msg}</p>
    </div>
  );
}
