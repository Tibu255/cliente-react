/**
 * Unidad 6 — 6.3.3 React Context (material CIFP Avilés).
 * createContext define un “canal” de datos; Provider lo inyecta en el subárbol.
 */
import { createContext } from "react";

export const valoresDefecto = { titulo: "Prueba de contexto 1.0", color: "red" };

export const AppContext = createContext(valoresDefecto);
