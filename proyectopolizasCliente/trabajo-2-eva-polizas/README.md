# Trabajo 2 Evaluacion - Polizas de Automovil

Aplicacion full stack para la gestion de polizas:

- `frontend`: React + Vite
- `backend`: Node.js + Express

## Estructura

- `frontend/` interfaz de usuario
- `backend/` API REST y persistencia en JSON
- `backend/data/polizas.json` datos de polizas

## Requisitos

- Node.js 18 o superior
- npm

## Instalacion

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Ejecucion en desarrollo

Abrir dos terminales:

### Terminal 1 (backend)

```bash
cd backend
npm run dev
```

Servidor API en `http://localhost:3001`.

### Terminal 2 (frontend)

```bash
cd frontend
npm run dev
```

Aplicacion web en `http://localhost:5173`.

## Endpoints principales

- `GET /polizas`
- `GET /polizas/:id_poliza`
- `POST /polizas`
- `PUT /polizas`
- `DELETE /polizas/:id_poliza`
- `GET /estadisticas`

## Notas

- Las estadisticas se calculan en backend.
- Las validaciones incluyen expresiones regulares para `id_poliza` y `matricula`.
