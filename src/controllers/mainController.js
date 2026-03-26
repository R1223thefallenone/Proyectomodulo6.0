/**
 * --- CONTROLADORES DE LA APLICACIÓN ---
 * Este archivo contiene la lógica de negocio. Cada función responde a una ruta 
 * específica definida en el enrutador.
 */

// Importamos el modelo de Usuario para interactuar con la DB a través de Sequelize
import User from '../models/User.js';
// Módulos para manejo de rutas de archivos
import path from 'path';
import { fileURLToPath } from 'url';

// Reconstrucción de __dirname para entornos ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** 
 * --- LÓGICA MÓDULO 6: SERVICIOS BÁSICOS --- 
 */

// Envía el archivo index.html al cliente (Frontend)
export const getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
};

// Retorna un JSON con el estado actual del servidor
export const getStatus = (req, res) => {
    res.json({
        status: 'Server Initialized',
        message: 'Módulo 7: Conexión a DB exitosa'
    });
};

/** 
 * --- LÓGICA MÓDULO 7: GESTIÓN DE USUARIOS (CRUD) --- 
 * Nota: Usamos funciones 'async' porque las consultas a la DB son promesas.
 */

// LECTURA: Obtiene todos los usuarios de la tabla
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            // Seguridad: Indicamos a Sequelize que NO traiga la columna password
            attributes: { exclude: ['password'] }
        });
        res.json({ status: "success", data: users });
    } catch (error) {
        // Captura errores de conexión o de consulta
        res.status(500).json({ status: "error", message: error.message });
    }
};

// SEMILLA: Carga masiva de datos iniciales para pruebas
export const seedUsers = async (req, res) => {
    try {
        // bulkCreate inserta varios registros en una sola operación
        await User.bulkCreate([
            { nombre: 'Juan Perez', email: 'juan@mail.com', password: '123' },
            { nombre: 'Maria G.', email: 'maria@mail.com', password: '456' },
            { nombre: 'Carlos R.', email: 'carlos@mail.com', password: '789' }
        ]);
        res.json({ message: 'Semilla ejecutada: 3 usuarios creados.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ELIMINACIÓN: Borra un registro basado en su ID (Primary Key)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID desde la URL
        const deleted = await User.destroy({ where: { id } });
        
        // Verificamos si realmente se borró algo
        if (deleted) {
            res.json({ message: `Usuario con ID ${id} eliminado.` });
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZACIÓN: Modifica los campos de un usuario específico
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // ID de la URL
        const { nombre, email } = req.body; // Datos nuevos desde el cuerpo de la petición (JSON)
        
        // Primero buscamos si el usuario existe por su Llave Primaria (Pk)
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Si existe, actualizamos los campos permitidos
        await user.update({ nombre, email });
        res.json({ message: "Usuario actualizado con éxito", data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};