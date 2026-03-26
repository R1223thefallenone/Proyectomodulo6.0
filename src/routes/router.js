/**
 * --- SISTEMA DE ENRUTAMIENTO MODULAR ---
 * Este archivo centraliza todas las rutas de la aplicación, separando la lógica 
 * de acceso de la configuración principal del servidor (app.js).
 */

// Importación de la clase Router de Express para crear rutas modulares y montables
import { Router } from 'express';

// Importación de las funciones controladoras que contienen la lógica de negocio para los Módulos 6 y 7
import { 
    getStatus, 
    getHome, 
    getUsers, 
    seedUsers, 
    updateUser,
    deleteUser 
} from '../controllers/mainController.js';

// Importación del middleware encargado de la persistencia de logs en el archivo log.txt
import { loggerMiddleware } from '../middlewares/loggerMiddleware.js';

// Inicialización del objeto router que agrupará nuestras rutas
const router = Router();

/**
 * --- RUTAS MÓDULO 6: SERVICIOS BÁSICOS Y PERSISTENCIA ---
 * En estas rutas aplicamos el 'loggerMiddleware' como paso previo para registrar 
 * cada visita en el archivo plano antes de ejecutar el controlador final.
 */

// Ruta raíz: Carga el archivo index.html para el frontend
router.get('/', loggerMiddleware, getHome); 

// Ruta de estado: Verifica la salud del servidor y registra el acceso en logs
router.get('/status', loggerMiddleware, getStatus); 

/**
 * --- RUTAS MÓDULO 7: GESTIÓN DE BASE DE DATOS (CRUD) ---
 * Estas rutas interactúan directamente con PostgreSQL a través de Sequelize.
 */

// 1. SEMILLA (Seed): Inserta 3 usuarios de prueba para inicializar la base de datos de forma rápida
router.get('/seed', seedUsers);

// 2. LECTURA (Read): Retorna todos los usuarios en formato JSON, aplicando el filtro de seguridad (excluye passwords)
router.get('/usuarios', getUsers);

// 3. ACTUALIZACIÓN (Update): Modifica los datos de un usuario existente mediante su ID enviado por parámetro
router.put('/usuarios/:id', updateUser);

// 4. ELIMINACIÓN (Delete): Remueve un usuario de la tabla basándose en su ID único
router.delete('/usuarios/:id', deleteUser);

/**
 * Exportación por defecto del router utilizando ES Modules.
 * Esto permite que app.js lo importe y lo monte como middleware de nivel de aplicación.
 */
export default router;