/**
 * --- MODELO DE DATOS: USER ---
 * Este archivo define la estructura de la tabla 'usuarios' en PostgreSQL.
 * Sequelize utiliza este modelo para mapear los objetos de JavaScript a la base de datos.
 */

// Importación de los tipos de datos nativos de Sequelize (STRING, INTEGER, etc.)
import { DataTypes } from 'sequelize';
// Importación de la instancia de conexión configurada en db.js
import db from '../config/db.js';

/**
 * Definición del modelo 'User':
 * Sequelize creará (o modificará) la tabla basándose en estos atributos.
 */
const User = db.define('User', {
    
    // Identificador único de cada usuario: se autoincrementa solo
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define esta columna como la Llave Primaria
        autoIncrement: true // PostgreSQL gestionará el conteo (1, 2, 3...)
    },

    // Nombre del usuario: es obligatorio para el registro
    nombre: {
        type: DataTypes.STRING,
        allowNull: false // Validación: no permite que el campo esté vacío en la DB
    },

    // Correo electrónico: debe ser único y tener formato válido
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // No permite que dos usuarios se registren con el mismo correo
        validate: {
            isEmail: true // Validación nativa del ORM: comprueba que tenga un '@' y un dominio
        }
    },

    // Contraseña: almacenada temporalmente como texto (se mejorará en el Módulo 8)
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    /**
     * --- OPCIONES ADICIONALES DEL MODELO ---
     */
    
    // Timestamps: Crea automáticamente las columnas 'createdAt' y 'updatedAt'
    // Esto es vital para auditoría y saber cuándo se creó un usuario.
    timestamps: true, 
    
    // Definimos explícitamente el nombre de la tabla en plural para la DB
    tableName: 'usuarios' 
});

/**
 * Exportación del modelo para que pueda ser utilizado por los controladores
 * para realizar operaciones CRUD (Create, Read, Update, Delete).
 */
export default User;