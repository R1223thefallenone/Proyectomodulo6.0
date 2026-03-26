// Importación de módulos utilizando sintaxis de ES Modules (import/export)
import express from 'express'; // Framework principal para la creación del servidor web
import dotenv from 'dotenv'; // Dependencia para gestionar variables de entorno desde el archivo .env
import path from 'path'; // Módulo nativo de Node.js para manejar y transformar rutas de archivos
import { fileURLToPath } from 'url'; // Utilidad para convertir URLs de módulos en rutas compatibles con el sistema
import mainRoutes from './routes/router.js'; // Importación del enrutador principal modularizado
import { connectDB } from './config/db.js'; // Importamos la función lógica para conectar la base de datos

// Carga las variables de entorno definidas en el archivo .env al objeto process.env
dotenv.config();

// Inicialización de la aplicación Express
const app = express();

// Definición del puerto: usa el valor del archivo .env o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

/** 
 * Configuración de __dirname para ES Modules:
 * En ES Modules estas variables no existen por defecto y deben reconstruirse manualmente
 */
const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta absoluta del archivo actual
const __dirname = path.dirname(__filename); // Obtiene la ruta absoluta de la carpeta contenedora

// Middleware para que el servidor pueda interpretar y procesar datos en formato JSON
app.use(express.json());

// Middleware para servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
// Usamos path.join para asegurar la compatibilidad de rutas entre distintos sistemas operativos
app.use(express.static(path.join(__dirname, '../public'))); 

// Implementación del enrutador principal: todas las peticiones se gestionan a través de mainRoutes
app.use('/', mainRoutes);

/**
 * Ejecución de la conexión a la base de datos PostgreSQL.
 * Esta función (importada de db.js) se encarga de autenticar y sincronizar los modelos.
 */
connectDB(); 

// Método para poner el servidor en escucha de peticiones en el puerto definido
app.listen(PORT, () => {
    // Mensaje por consola para confirmar que el servidor arrancó correctamente y mostrar la URL
    console.log(`Servidor iniciado en http://localhost:${PORT}`); 
});