/**
 * Unidad 7 — 7.6: en React suele usarse un objeto en useState en lugar de FormData + DOM.
 */
import { useState } from "react";

export default function FormDataEstadoObjeto() {
  const [formData, setFormData] = useState({ nombre: "", email: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(`nombre=${formData.nombre}, email=${formData.email}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="nombre" value={formData.nombre} onChange={onChange} placeholder="Nombre" />
      <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" />
      <button type="submit">Enviar</button>
    </form>
  );
}
