// Importación del módulo 'fs' (File System) para interactuar con el sistema de archivos del servidor 
import fs from 'fs';
// Importación de 'path' para gestionar rutas de archivos de forma segura entre distintos sistemas operativos
import path from 'path';
// Importación de utilidades para reconstruir variables de entorno de rutas en ES Modules
import { fileURLToPath } from 'url';

// Configuración manual de __dirname (necesario en ES Modules para obtener la ruta del directorio actual)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Middleware de registro (Logger):
 * Captura información de cada solicitud y la persiste en un archivo de texto.
 */
export const loggerMiddleware = (req, res, next) => {
    
    // Define la ruta del archivo log.txt subiendo dos niveles (../../) para llegar a la carpeta raíz 'logs' 
    const logPath = path.join(__dirname, '..', '..', 'logs', 'log.txt');
    
    // Log de depuración en consola para confirmar que el middleware interceptó la petición
    console.log(`---> Middleware ejecutado para la ruta: ${req.url}`);

    // Captura de la fecha y hora actual para cumplir con el formato solicitado 
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    // Creación de la línea de texto que se guardará (Template String con fecha, hora y ruta) 
    const logEntry = `[${date} ${time}] Ruta accedida: ${req.url}\n`; 

    // Log de depuración para verificar la ruta absoluta donde se intentará escribir
    console.log(`---> Intentando escribir en: ${logPath}`);

    // Uso de fs.appendFile para agregar contenido al final del archivo sin borrar lo anterior (asíncrono) 
    fs.appendFile(logPath, logEntry, (err) => {
        if (err) {
            // Manejo de errores: se dispara si la carpeta no existe o no hay permisos de escritura
            console.error('X Error al escribir en el archivo:', err.message);
        } else {
            // Confirmación de que la persistencia fue exitosa 
            console.log('V Log guardado exitosamente en log.txt');
        }
    });

    // Función crucial que permite que la solicitud continúe hacia el siguiente middleware o controlador
    next();
};