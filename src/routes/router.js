// Importación de la clase Router de Express
import { Router } from 'express';
// Importación de las funciones controladoras (Módulo 6 y 7)
import { 
    getStatus, 
    getHome, 
    getUsers, 
    seedUsers, 
    updateUser,
    deleteUser 
} from '../controllers/mainController.js';
// Importación del middleware de persistencia (logger)
import { loggerMiddleware } from '../middlewares/loggerMiddleware.js';

// Inicialización del objeto router
const router = Router();

/**
 * --- RUTAS MÓDULO 6 (Con Middleware de Log) ---
 * Se aplica loggerMiddleware antes de cada controlador para cumplir con la persistencia en log.txt
 */
router.get('/', loggerMiddleware, getHome); 
router.get('/status', loggerMiddleware, getStatus); 

/**
 * --- RUTAS MÓDULO 7 (Gestión de Base de Datos) ---
 */

// 1. Ruta para sembrar datos iniciales (Requisito: 3 registros simulados)
router.get('/seed', seedUsers);

// 2. Ruta para obtener usuarios (Requisito: Respuesta en JSON clara y sin datos sensibles)
router.get('/usuarios', getUsers);

router.put('/usuarios/:id', updateUser);

// 3. Ruta para eliminar un usuario por ID (Requisito: Validación de ID existente)
router.delete('/usuarios/:id', deleteUser);

// Exportación por defecto del router
export default router;