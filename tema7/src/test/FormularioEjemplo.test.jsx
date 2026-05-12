/**
 * Unidad 7 — 7.8 prueba de integración (Vitest + Testing Library), adaptada del PDF.
 */
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import FormularioEjemplo from "../components/FormularioEjemplo.jsx";

test("El formulario se envía correctamente con el valor del input", async () => {
  const user = userEvent.setup();
  render(<FormularioEjemplo />);

  const txtNombre = screen.getByLabelText("Nombre:");
  const btnEnviar = screen.getByText("Enviar datos");

  const mockAlert = vi.spyOn(window, "alert").mockImplementation(() => {});

  await user.type(txtNombre, "Juan Pérez");
  fireEvent.click(btnEnviar);

  expect(mockAlert).toHaveBeenCalledWith("Se ha enviado el formulario con el nombre: Juan Pérez");

  mockAlert.mockRestore();
});
