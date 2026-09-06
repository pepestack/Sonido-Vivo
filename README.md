<p align="center"><img src="img/logo-v1.webp" alt="Sonido Vivo Logo" width=150></p>

<h1 align="center">Sonido Vivo</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Curso-DSY1104%20Desarrollo%20FullStack%20II-blue" alt="Curso">
  <img src="https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white" alt="HTML">
  <img src="https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff" alt="CSS">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff" alt="Bootstrap">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript">
</p>


<p align="center">Proyecto semestral para Desarrollo Fullstack II</p>

<hr>

## Descripción

**Sonido Vivo** es un sistema web integral diseñado para modernizar las operaciones de la **ficticia** tienda de instrumentos musicales y equipos de sonido ubicados en Viña del Mar, Región de Valparaíso. El propósito del proyecto es aplicar los conocimientos de la asignatura, que hasta ahora son, HTML estructurado, diseñado con CSS e interactividad simple con Javascript. 

### Integrantes (Grupo 1):
- José Calderón
- Sebastian Navarro
- Sebastian Apablaza

## Tabla de Contenidos
- [Stack tecnológico](#stack-tecnológico)


## Stack Tecnológico

Para la primera evaluación solamente se requiere realizar una pagina estática, a modo de prototipo. Las siguientes evaluaciones tendrán más componentes y capa de backend.

| Capa / Componente | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend** | **HTML/Bootstrap (CSS)/Javascript** | Interfaz web hecha con HTML, Bootstrap (CSS), y Javascript |


## Estructura de Vistas y Módulos

El proyecto está compuesto por las siguientes interfaces y lógicas implementadas en el frontend:

| Módulo / Archivo HTML | Descripción de lo que hace |
| :--- | :--- |
| **`home.html`** | Página principal y punto de bienvenida de la tienda con la presentación general. |
| **`catalogo.html`** | Visualización del catálogo de instrumentos y equipos de sonido disponibles. |
| **`detalle-producto.html`** | Vista individual detallada de cada producto seleccionado. |
| **`carrito.html`** | Interfaz del carro de compras. |
| **`contacto.html`** | Formulario de contacto. |
| **`blog.html` / `blog1.html` / `blog2.html`** | Sección de artículos y noticias relacionadas con el mundo de la música y el audio. |
| **`nosotros.html`** | Página informativa sobre la historia y el equipo detrás de la tienda. |
| **`login.html` / `registro.html`** | Interfaces de autenticación, registro y login de usuario. |
| **`admin-home.html`** | Panel principal de administración del sistema. |
| **`admin-productos.html` / `nuevo-producto.html` / `editar-producto.html` / `ver-producto.html`** | Página del administrador para los productos. |
| **`admin-usuario.html` / `nuevo-usuario.html` / `editar-usuario.html` / `ver-usuario.html`** | Página del administrador para administrar usuarios. |

## Estructura .js

La lógica interactiva y las validaciones del proyecto están organizadas por módulos independientes dentro de la carpeta `js/`:

| Archivo JavaScript | Descripción de la lógica |
| :--- | :--- |
| **`carrito.js`** | Controla el flujo dinámico del carro de compras. |
| **`catalogo.js`** | Maneja la interactividad y la visualización de los productos en la sección de tienda. |
| **`contacto.js`** | Aplica validaciones estrictas en el formulario. |
| **`login.js` / `register.js` / `crear-usuario.js`** | Gestionan la validación de formularios para la autenticación y el registro de nuevos usuarios. |
| **`validar-producto.js`** | Administra las validaciones y restricciones necesarias para la sección de administrar productos. |