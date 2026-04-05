# Aplicación Colaborativa de Tareas

Una aplicación web full-stack de gestión de tareas colaborativa, donde los usuarios pueden crear listas, invitar compañeros, asignar roles y administrar tareas en conjunto.

---

## ¿Qué problema resuelve?

La mayoría de las aplicaciones de tareas son individuales. Este proyecto aborda la necesidad de **gestión de tareas compartida**: varios usuarios pueden colaborar en una misma lista con permisos basados en roles. El dueño de una lista puede invitar miembros, asignarles roles (admin, editor, viewer) y controlar quién puede crear, editar o eliminar tareas. Cada usuario solo ve las listas a las que pertenece, y todas las acciones están protegidas por autenticación en cada endpoint.

---

## Funcionalidades

- **Autenticación** — Registro e inicio de sesión con sesiones basadas en JWT. Las contraseñas se almacenan con hash usando bcrypt.
- **Listas de tareas** — Crear, renombrar y eliminar listas personales o compartidas.
- **Tareas** — Crear, actualizar, completar, eliminar y reordenar tareas dentro de una lista.
- **Colaboración** — Invitar a otros usuarios a una lista y asignarles un rol.
- **Permisos por rol** — Cuatro roles con distintas capacidades:

  | Rol    | Crear/Editar tareas | Eliminar tareas | Gestionar miembros |
  | ------ | :-----------------: | :-------------: | :----------------: |
  | Owner  |         Sí          |       Sí        |         Sí         |
  | Admin  |         Sí          |       Sí        |         Sí         |
  | Editor |         Sí          |       No        |         Sí         |
  | Viewer |         No          |       No        |         No         |

- **Gestión de miembros** — Cambiar el rol de un miembro o eliminarlo de la lista.
- **Reordenamiento con drag & drop** — Reorganizar tareas arrastrando y soltando (dnd-kit).

---

## Estructura del proyecto

```
Dec2025/
├── backend/          # API REST (Node.js + Express + PostgreSQL)
└── login-practice/   # SPA Frontend (React + Vite + Tailwind)
```

---

## Tecnologías utilizadas

### Backend (`/backend`)

| Tecnología       | Uso                              |
| ---------------- | -------------------------------- |
| **Node.js**      | Entorno de ejecución             |
| **Express 5**    | Servidor HTTP y enrutamiento     |
| **PostgreSQL**   | Base de datos relacional         |
| **pg**           | Cliente de PostgreSQL            |
| **jsonwebtoken** | Generación y validación de JWT   |
| **bcrypt**       | Hash de contraseñas              |
| **dotenv**       | Gestión de variables de entorno  |
| **cors**         | Control de acceso entre orígenes |
| **Vitest**       | Testing unitario e integración   |
| **Supertest**    | Testing de endpoints HTTP        |

El backend sigue una arquitectura por capas: `routes → controllers → services → repositories`.

### Frontend (`/login-practice`)

| Tecnología               | Uso                                 |
| ------------------------ | ----------------------------------- |
| **React 19**             | Librería de interfaz de usuario     |
| **Vite**                 | Bundler y servidor de desarrollo    |
| **React Router DOM v7**  | Enrutamiento del lado del cliente   |
| **Tailwind CSS v4**      | Estilos utility-first               |
| **shadcn/ui + Radix UI** | Componentes UI accesibles           |
| **Framer Motion**        | Animaciones y transiciones          |
| **dnd-kit**              | Drag & drop para reordenar tareas   |
| **Axios**                | Cliente HTTP para llamadas a la API |
| **HugeIcons**            | Librería de iconos                  |

---

## Resumen de la API

Todas las rutas excepto `/login` y `/register` requieren un header `Authorization: Bearer <token>` válido.

| Método | Endpoint                                | Descripción                                 |
| ------ | --------------------------------------- | ------------------------------------------- |
| POST   | `/login`                                | Autenticar usuario                          |
| POST   | `/register`                             | Crear nueva cuenta                          |
| GET    | `/lists`                                | Obtener todas las listas del usuario actual |
| POST   | `/lists`                                | Crear una nueva lista                       |
| GET    | `/lists/:listId`                        | Obtener una lista con sus miembros          |
| PATCH  | `/lists/:listId`                        | Renombrar una lista                         |
| DELETE | `/lists/:listId`                        | Eliminar una lista                          |
| GET    | `/lists/:listId/todos`                  | Obtener todas las tareas de una lista       |
| POST   | `/lists/:listId/todos`                  | Crear una tarea                             |
| PATCH  | `/lists/:listId/todos/:todoId`          | Actualizar una tarea                        |
| DELETE | `/lists/:listId/todos/:todoId`          | Eliminar una tarea                          |
| GET    | `/lists/:listId/members`                | Obtener miembros de la lista                |
| POST   | `/lists/:listId/members`                | Invitar a un miembro                        |
| PATCH  | `/lists/:listId/members/:memberId/role` | Cambiar el rol de un miembro                |
| DELETE | `/lists/:listId/members/:memberId`      | Eliminar un miembro                         |

---

## Cómo ejecutar el proyecto

### Requisitos previos

- Node.js 18+
- PostgreSQL corriendo localmente

### Backend

```bash
cd backend
npm install
# Crear un archivo .env con: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET
npm run dev
```

### Frontend

```bash
cd login-practice
npm install
npm run dev
```
