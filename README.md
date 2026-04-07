## Proyecto Backend Integrador: API RESTful, Seguridad JWT y Gestión de Archivos

Descripción
Este proyecto representa la consolidación final del backend, evolucionando de una estructura básica a una **API RESTful profesional**. Se integró persistencia en **PostgreSQL**, seguridad mediante **JSON Web Tokens (JWT)** para la protección de rutas y un sistema de carga de archivos multimedia con **Multer**.

## Justificaciones Técnicas
Punto de entrada (app.js): Se mantiene como el núcleo del servidor, inicializando la conexión a la base de datos y configurando los middlewares globales para el manejo de JSON y archivos estáticos.

## ES Modules:
Se continúa utilizando la sintaxis moderna de import/export, lo que facilitó la integración de los Modelos de Sequelize y la configuración de la base de datos de forma limpia.

## Estructura de Carpetas:
Se mantuvo la arquitectura modular añadiendo middlewares de autenticación y configuración de archivos, respetando el patrón **controllers/, routes/, middlewares/** solicitado.

## Seguridad con JWT:
Se implementó un middleware de autenticación que protege las rutas sensibles (`PUT`, `DELETE`, `POST /upload`). Esta decisión técnica asegura que solo usuarios con un token válido puedan modificar los datos.

## Gestión de Archivos (Multer):
Se eligió Multer para procesar la subida de imágenes, implementando validaciones de tamaño y tipo de archivo en el servidor para garantizar la seguridad y el correcto almacenamiento en la carpeta **uploads/**.

## Instalación y Ejecución
Clonar el repositorio.

Ejecutar `npm install` para instalar las dependencias (`sequelize`, `pg`, `jsonwebtoken`, `multer`, `bcrypt`).

Configurar el archivo `.env` con las credenciales de PostgreSQL y la clave `JWT_SECRET`.

Crear manualmente la carpeta `uploads/` en la raíz del proyecto.

Ejecutar con `npm run dev` para que el servidor inicie con sincronización automática.

## Rutas
POST /login: Autentica al usuario y entrega un JWT válido.

GET /usuarios: Devuelve la lista de usuarios en JSON (público).

PUT /usuarios/:id: Actualiza datos de un usuario específico. **(Requiere JWT)**.

DELETE /usuarios/:id: Elimina un registro por su ID. **(Requiere JWT)**.

POST /upload: Permite la subida de una imagen (campo: `archivo`). **(Requiere JWT)**.

## reflexion tecnica
Este entregable cierra el ciclo completo de desarrollo backend: desde la estructura inicial y lógica de negocio, hasta la exposición de una API segura. La integración de JWT y Multer demuestra la capacidad de construir aplicaciones robustas que protegen la información y manejan recursos multimedia, quedando en condiciones óptimas para ser consumidas por cualquier cliente externo.

## GITHUB
https://github.com/R1223thefallenone/Proyectomodulo6.0