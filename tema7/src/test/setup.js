import "@testing-library/jest-dom/vitest";
import * as React from "react";

/** Vitest compila algunos .jsx en modo clásico; evita "React is not defined" en componentes bajo prueba. */
globalThis.React = React;
