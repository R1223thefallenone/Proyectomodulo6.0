/**
 * --- SISTEMA DE ENRUTAMIENTO MODULAR ---
 * Este archivo es el "director de tráfico" de la app. 
 * Separé las rutas por módulos para que el código no sea un caos y sea fácil de mantener.
 */
import { Router } from 'express';
import { 
    getStatus, 
    getHome, 
    getUsers, 
    seedUsers, 
    updateUser,
    deleteUser,
    login 
} from '../controllers/mainController.js';

import { loggerMiddleware } from '../middlewares/loggerMiddleware.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = Router();

/**
 * --- RUTAS PÚBLICAS (Módulo 6 y Login) ---
 * Estas rutas están abiertas porque son el punto de entrada. 
 * El login tiene que ser público sí o sí para que los usuarios puedan obtener su token.
 */
router.get('/', loggerMiddleware, getHome); 
router.get('/status', loggerMiddleware, getStatus); 
router.post('/login', login); 

/**
 * --- RUTAS PROTEGIDAS (Módulo 8 - Requieren JWT) ---
 * Acá es donde nos ponemos serios con la seguridad. 
 * El middleware 'verifyToken' actúa como un filtro: si no hay token válido, no pasan.
 */

// Subida de archivos (Lección 3): 
// Usamos Multer para procesar la imagen, pero solo si el usuario está autenticado.
router.post('/upload', verifyToken, upload.single('archivo'), (req, res) => {
    res.json({ status: "success", message: "Archivo subido con éxito", file: req.file });
});

// Gestión de usuarios (CRUD Protegido):
// No queremos que cualquiera pueda editar o borrar usuarios de la base de datos, 
// así que blindamos el PUT y el DELETE con JWT.
router.put('/usuarios/:id', verifyToken, updateUser);
router.delete('/usuarios/:id', verifyToken, deleteUser);

/**
 * --- RUTAS DE CONSULTA (Módulo 7) ---
 * El SEED es para poblar la base de datos rápido durante el desarrollo.
 * La lista de usuarios la dejé pública para poder ver los resultados del CRUD fácilmente.
 */
router.get('/seed', seedUsers);
router.get('/usuarios', getUsers); 

export default router;