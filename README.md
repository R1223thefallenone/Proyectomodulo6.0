## Proyecto Backend - Módulo 7: Gestión de Usuarios y Persistencia en PostgreSQL
Descripción
Este proyecto ha evolucionado de una estructura básica a una aplicación profesional con Persistencia de Datos Relacional. Se integró PostgreSQL como motor de base de datos y Sequelize como ORM, permitiendo una gestión de usuarios eficiente y segura.

## Justificaciones Técnicas
Punto de entrada (app.js): Se mantiene como el núcleo del servidor, encargándose ahora de inicializar la conexión a la base de datos mediante la función connectDB antes de poner el servidor en escucha.

## ES Modules:
 Se continúa utilizando la sintaxis moderna de import/export, lo que facilitó la integración de los Modelos de Sequelize y la configuración de la base de datos de forma limpia.

## Estructura de Carpetas:
 Se expandió la modularidad añadiendo las carpetas models (para la definición de tablas) y config (para la conexión a la DB), cumpliendo con el patrón MVC.

## Persistencia con Sequelize (ORM):
Se eligió Sequelize porque permite abstraer las consultas SQL a objetos de JavaScript, facilitando el manejo de validaciones 
de datos (como el formato de email) y proporcionando seguridad nativa contra inyecciones SQL.

## Instalación y Ejecución clonar el repositorio.

Ejecutar npm install para instalar las nuevas dependencias (sequelize, pg, pg-hstore).

Configurar el archivo .env con las credenciales de PostgreSQL (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT).

Ejecutar con npm run dev para que Sequelize sincronice las tablas automáticamente.

## Rutas
GET /: Devuelve el index.html con la interfaz básica del proyecto.

GET /status: Devuelve el estado del servidor y persiste el acceso en log.txt.

GET /seed: Ruta de inicialización que inyecta automáticamente 3 usuarios de prueba en la base de datos.

GET /usuarios: Devuelve la lista de usuarios en JSON, protegiendo la privacidad al excluir el campo password.

PUT /usuarios/:id: Permite la actualización de datos de un usuario específico.

DELETE /usuarios/:id: Permite la eliminación lógica o física de un registro por su ID.

## reflexion tecnica
La implementación de una base de datos relacional mediante un ORM marca un hito en la escalabilidad del proyecto. Al definir un Modelo de Usuario, no solo automatizamos la creación de tablas, sino que centralizamos la lógica de validación. La arquitectura modular permitió que el paso de archivos planos (fs) a PostgreSQL fuera fluido, demostrando que el código está preparado para entornos productivos donde la integridad de los datos es prioritaria.

## GITHUB
https://github.com/R1223thefallenone/Proyectomodulo6.0