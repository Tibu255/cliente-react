import { createContext } from "react";

export const ValidationContext = createContext({
  regexIdPoliza: /^ID\d{5}$/,
  regexMatricula: /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/,
});
