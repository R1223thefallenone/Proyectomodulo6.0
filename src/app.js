import express from 'express'; 
import dotenv from 'dotenv'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import mainRoutes from './routes/router.js'; 
import { connectDB } from './config/db.js'; // Mantenemos esta importación

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); 
app.use('/', mainRoutes);

// EJECUTAMOS LA CONEXIÓN (La que viene de db.js)
connectDB(); 

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`); 
});