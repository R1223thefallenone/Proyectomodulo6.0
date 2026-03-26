import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, 
    }
);

export const connectDB = async () => {
    try {
        await db.authenticate();
        // Agregamos el sync aquí para que cree las tablas al conectar
        await db.sync({ alter: true }); 
        console.log('✅ Conexión exitosa a PostgreSQL y tablas sincronizadas.');
    } catch (error) {
        console.error('❌ No se pudo conectar a la DB:', error.message);
    }
};

export default db;