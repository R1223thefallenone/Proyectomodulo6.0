import multer from 'multer';
import path from 'path';

/**
 * --- CONFIGURACIÓN DE ALMACENAMIENTO (Multer) ---
 * Aquí definimos cómo y dónde se van a guardar los archivos que recibamos.
 */
const storage = multer.diskStorage({
    // Los archivos se guardarán en la carpeta 'uploads/'. 
    // Es importante que esta carpeta exista en la raíz del proyecto.
    destination: 'uploads/',
    
    // Para que dos usuarios no suban fotos con el mismo nombre y se pisen,
    // le generamos un nombre único usando el timestamp actual (Date.now()).
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

/**
 * --- FILTRO DE SEGURIDAD ---
 * No queremos que nos suban ejecutables o archivos raros.
 * Solo permitimos imágenes con formatos estándar (jpeg, png, jpg).
 */
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
    if (allowedTypes.includes(file.mimetype)) {
        // Si el tipo de archivo coincide, le damos luz verde.
        cb(null, true);
    } else {
        // Si intenta subir otra cosa, le lanzamos un error personalizado.
        cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'), false);
    }
};

/**
 * --- EXPORTACIÓN DEL MIDDLEWARE ---
 * Configuramos un límite de 10MB para no saturar el disco duro del servidor
 * y exportamos la instancia lista para usar en nuestras rutas.
 */
export const upload = multer({ 
    storage, 
    fileFilter, 
    limits: { fileSize: 10000000 } // Límite técnico de 10MB
});