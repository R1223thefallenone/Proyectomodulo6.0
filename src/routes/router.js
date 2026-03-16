// Importación de la clase Router de Express para crear rutas modulares y montables
import { Router } from 'express';
// Importación de las funciones controladoras desde el archivo de controladores
import { getStatus, getHome } from '../controllers/mainController.js';
// Importación del middleware de persistencia (logger)
import { loggerMiddleware } from '../middlewares/loggerMiddleware.js';

// Inicialización del objeto router
const router = Router();

/**
 * Definición de la ruta '/status':
 * 1. Primero se ejecuta 'loggerMiddleware' para persistir el acceso en log.txt.
 * 2. Si todo sale bien, se ejecuta 'getStatus' para enviar la respuesta JSON.
 */
router.get('/status', loggerMiddleware, getStatus); 

/**
 * Definición de la ruta raíz ('/'):
 * Se aplica el middleware de log para registrar cada visita a la página principal
 * y luego se llama al controlador 'getHome' que responde con el HTML.
 */
router.get('/', loggerMiddleware, getHome); 

// Exportación por defecto del router para ser utilizado en app.js mediante ES Modules
export default router;