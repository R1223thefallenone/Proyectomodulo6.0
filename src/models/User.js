import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('User', {
    // Definición de atributos del modelo
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false // Requisito: validación de datos
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Validación nativa del ORM
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Opciones del modelo
    timestamps: true, // Crea automáticamente createdAt y updatedAt
    tableName: 'usuarios' // Nombre de la tabla en PostgreSQL
});

export default User;