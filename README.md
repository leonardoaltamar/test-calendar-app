# 📅 TestCalendarApp - Prueba Técnica

Este proyecto es una aplicación de gestión de sesiones de formación basada en un calendario interactivo. Ha sido desarrollada utilizando **Angular 21**, **PrimeNG** y **FullCalendar**, siguiendo las mejores prácticas de arquitectura modular y seguridad.

## 🚀 Cómo empezar

Para ejecutar este proyecto localmente, sigue estos pasos:

### 1. Requisitos previos
- **Node.js**: Versión 18 o superior.
- **npm**: Instalado junto con Node.js.

### 2. Instalación de dependencias
Clona el repositorio y ejecuta:

```bash
npm install
```

### 3. Ejecutar el Backend (Mock API)
La aplicación utiliza un backend simulado con `json-server`. Debes tenerlo corriendo en segundo plano:

```bash
npm run mock:api
```
*Esto iniciará el servidor en [http://localhost:3000](http://localhost:3000).*

### 4. Ejecutar el Frontend (Angular)
En otra terminal, corre el servidor de desarrollo de Angular:

```bash
npm start
```
*Navega a [http://localhost:4200](http://localhost:4200). El login redirigirá automáticamente gracias al AuthGuard.*

---

## 🏗️ Arquitectura del Proyecto

El código está organizado siguiendo un patrón modular y escalable:

- **`src/app/core/`**: Lógica global, servicios singleton (Auth, Sessions), modelos de datos compartidos y guardianes de ruta (`AuthGuard`).
- **`src/app/features/`**: Módulos funcionales de la aplicación (`auth`, `calendar`). Cada uno con su propia lógica y componentes.
- **`src/app/shared/`**: Componentes reutilizables (Navbar, Layouts), utilidades y constantes globales.

## ✨ Características Principales

### 🔐 Seguridad y Permisos
- **AuthGuard**: Protege las rutas privadas. No se puede acceder al calendario sin una sesión activa.
- **RBAC (Role Based Access Control)**: Sistema de permisos granulares por usuario (`create_session`, `read_session`, `update_session`, `delete_session`).
- **UI Reactiva**: Los botones y acciones (crear, editar, borrar) se ocultan o deshabilitan automáticamente según los permisos del usuario logueado.

### 📅 Gestión de Calendario
- **CRUD Completo**: Creación, edición y eliminación de sesiones persistente en el backend.
- **Filtros Avanzados**: Filtrado en tiempo real por categoría y estado de sesión.
- **Interfaz Premium**: Integración de la tipografía **Satoshi** y componentes de **PrimeNG v21** para una experiencia de usuario moderna.

---

## 👤 Credenciales de prueba

Puedes probar los diferentes niveles de permisos con estos usuarios:

| Perfil | Email | Password | Permisos |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@sdi.es` | `123` | Todos (CRUD Total) |
| **Test** | `test@gmail.com` | `123` | Lectura, Creación y Edición |

---

*Desarrollado como prueba técnica de alto nivel.*
