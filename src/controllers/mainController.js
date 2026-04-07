/**
 * --- CONTROLADORES DE LA APLICACIÓN (VERSIÓN FINAL MÓDULO 8) ---
 * Aquí es donde sucede toda la magia y la lógica de negocio. 
 * Pasamos de un CRUD simple a una API blindada con JWT y capaz de recibir archivos.
 */

import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** * --- LÓGICA DE AUTENTICACIÓN --- 
 */

// POST /login: El corazón de la seguridad.
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Primero verificamos si el usuario existe en nuestra base de datos PostgreSQL.
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

        // Comparamos contraseñas. 
        // Nota: En un entorno real usaríamos bcrypt.compare para mayor seguridad.
        const validPassword = (password === user.password); 
        if (!validPassword) return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });

        // Si las credenciales son correctas, le entregamos su "llave" (Token JWT).
        // El token expira en 1 hora por seguridad, para que no quede abierto para siempre.
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET || 'secret_key_provisoria', 
            { expiresIn: '1h' }
        );

        res.json({
            status: "success",
            message: "Autenticación exitosa, ¡bienvenido!",
            token: token // El cliente debe guardar esto para sus próximas peticiones.
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

/** * --- GESTIÓN DE ARCHIVOS --- 
 */

// POST /upload: Para cuando el usuario quiere subir su avatar o archivos.
export const uploadFile = (req, res) => {
    try {
        // Multer ya hizo el trabajo sucio; aquí solo verificamos si llegó el archivo.
        if (!req.file) {
            return res.status(400).json({ status: "error", message: "No se subió ningún archivo" });
        }
        
        // Respondemos con la info del archivo para que el frontend sepa dónde quedó guardado.
        res.json({
            status: "success",
            message: "Archivo procesado y guardado correctamente",
            data: {
                filename: req.file.filename,
                path: req.file.path
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

/** * --- SERVICIOS BÁSICOS Y CRUD --- 
 */

// Cargamos la vista principal (index.html)
export const getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
};

// Check rápido para ver si el servidor sigue vivo.
export const getStatus = (req, res) => {
    res.json({
        status: 'Server Active',
        message: 'Módulo 8: API RESTful Operativa y Segura'
    });
};

// Obtenemos todos los usuarios pero PROTEGEMOS la privacidad.
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Jamás enviamos las contraseñas al frontend.
        });
        res.json({ status: "success", data: users });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// Función de "Semilla" para no tener que crear usuarios a mano cada vez que reiniciamos.
export const seedUsers = async (req, res) => {
    try {
        await User.bulkCreate([
            { nombre: 'Juan Perez', email: 'juan@mail.com', password: '123' },
            { nombre: 'Maria G.', email: 'maria@mail.com', password: '456' },
            { nombre: 'Carlos R.', email: 'carlos@mail.com', password: '789' }
        ]);
        res.json({ status: "success", message: 'Usuarios de prueba inyectados con éxito' });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// Borramos un usuario usando su ID único.
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.json({ status: "success", message: `Usuario con ID ${id} ha sido eliminado` });
        } else {
            res.status(404).json({ status: "error", message: "Ese usuario no existe" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// Actualizamos datos básicos (nombre/email) de un registro existente.
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email } = req.body;
        
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ status: "error", message: "No encontramos al usuario para actualizar" });

        await user.update({ nombre, email });
        res.json({ status: "success", message: "Datos actualizados correctamente", data: user });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};