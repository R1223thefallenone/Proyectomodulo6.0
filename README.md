# Proyecto Backend - Módulo 6: Gestión de Usuarios y Datos

## Descripción
Este proyecto es la base de una aplicación web profesional desarrollada con **Node.js** y **Express**. Se implementó una arquitectura modular y persistencia básica en archivos planos.

## Justificaciones Técnicas (Requisito de entrega)
**Punto de entrada (`app.js`)**: Se eligió este nombre para seguir las convenciones modernas de Express, separando la configuración de la lógica de negocio.
* **ES Modules**: Se configuró `"type": "module"` en `package.json` para utilizar la sintaxis moderna de `import/export`, mejorando la legibilidad y mantenimiento del código.
**Estructura de Carpetas**: Se organizó en `routes`, `controllers`, `middlewares`, `public` y `logs` para cumplir con el requisito de modularidad y facilitar la escalabilidad en los módulos 7 y 8.
**Persistencia**: Se utilizó el módulo nativo `fs` con `appendFile` para registrar los accesos a la ruta `/status`, asegurando un registro histórico sin sobrescribir datos anteriores.

## Instalación y Ejecución
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar dependencias (`express`, `dotenv`, `nodemon`).
3. Crear un archivo `.env` y configurar el `PORT=3000`.
4. Ejecutar con `npm run dev` para entorno de desarrollo.

## Rutas
GET /`: Devuelve un mensaje de bienvenida en HTML.
GET /status`: Devuelve el estado del servidor en JSON y registra el acceso en `log.txt`