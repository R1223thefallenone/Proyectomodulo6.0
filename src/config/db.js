/**
 * --- CONFIGURACIÓN DE LA BASE DE DATOS ---
 * Este archivo centraliza la conexión con PostgreSQL utilizando el ORM Sequelize.
 * Se encarga de la autenticación y la sincronización de modelos con la DB real.
 */

// Importamos Sequelize para gestionar la base de datos relacional
import { Sequelize } from 'sequelize';
// Importamos dotenv para leer las credenciales desde el archivo .env por seguridad
import dotenv from 'dotenv';

// Carga las variables de entorno configuradas
dotenv.config();

/**
 * Inicialización de la instancia de Sequelize.
 * Extraemos los datos sensibles desde process.env para no exponer contraseñas en el código.
 */
const db = new Sequelize(
    process.env.DB_NAME,     // Nombre de la base de datos (ej. 'bootcamp_node_db')
    process.env.DB_USER,     // Usuario de PostgreSQL (ej. 'postgres')
    process.env.DB_PASSWORD, // Contraseña del usuario
    {
        host: process.env.DB_HOST, // Dirección del servidor (ej. 'localhost')
        port: process.env.DB_PORT, // Puerto por defecto de Postgres (5432)
        dialect: 'postgres',       // Indicamos que el motor de DB es PostgreSQL
        logging: false,            // Desactivamos los logs de SQL en consola para limpiar la salida
    }
);

/**
 * Función connectDB:
 * Se encarga de validar la conexión y preparar las tablas.
 * Esta función es llamada desde el punto de entrada principal (app.js).
 */
export const connectDB = async () => {
    try {
        // 'authenticate' verifica que las credenciales del .env sean correctas
        await db.authenticate();
        
        /**
         * 'sync({ alter: true })':
         * Compara el estado actual de los modelos en el código con las tablas en la DB.
         * Si hay cambios (ej. agregamos una columna), actualiza la tabla sin borrar los datos.
         */
        await db.sync({ alter: true }); 
        
        console.log('✅ Conexión exitosa a PostgreSQL y tablas sincronizadas.');
    } catch (error) {
        // Si hay un error (ej. DB apagada o clave mal escrita), se captura aquí
        console.error('❌ No se pudo conectar a la DB:', error.message);
    }
};

/**
 * Exportación por defecto de la instancia de base de datos.
 * Esto permite que los Modelos (como User.js) la importen para definirse sobre ella.
 */
export default db;