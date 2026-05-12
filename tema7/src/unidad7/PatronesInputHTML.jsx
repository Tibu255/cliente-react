/**
 * Unidad 7 — 7.7: pattern en inputs (NIF y teléfono del PDF).
 */
export default function PatronesInputHTML() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>
        <label htmlFor="nif">NIF:</label>
        <input
          type="text"
          id="nif"
          name="nif"
          pattern="^\d{8}[A-Za-z]$"
          title="El DNI debe tener 8 números y 1 letra."
        />
      </p>
      <p>
        <label htmlFor="tel">Número de teléfono:</label>
        <input
          type="text"
          id="tel"
          name="tel"
          pattern="^\d{9}$"
          title="El teléfono debe constar de 9 números exclusivamente."
        />
      </p>
      <button type="submit">Comprobar (validación nativa)</button>
    </form>
  );
}
