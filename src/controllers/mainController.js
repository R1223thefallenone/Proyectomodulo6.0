import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONTROLADORES MÓDULO 6 ---

// Esta es la que te falta o está mal escrita
export const getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
};

export const getStatus = (req, res) => {
    res.json({
        status: 'Server Initialized',
        message: 'Módulo 7: Conexión a DB exitosa'
    });
};

// --- CONTROLADORES MÓDULO 7 (Base de Datos) ---

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json({ status: "success", data: users });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const seedUsers = async (req, res) => {
    try {
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

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: `Usuario con ID ${id} eliminado.` });
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- NUEVO: Actualizar Usuario (Lección 3) ---
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email } = req.body;
        
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        await user.update({ nombre, email });
        res.json({ message: "Usuario actualizado con éxito", data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};