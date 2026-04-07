import jwt from 'jsonwebtoken';

/**
 * --- MIDDLEWARE DE AUTENTICACIÓN (JWT) ---
 * Este es el "guardia de seguridad" de nuestra API. 
 * Su función es interceptar la petición y verificar si el usuario tiene permiso para pasar.
 */
export const verifyToken = (req, res, next) => {
    // Extraemos el token del encabezado 'authorization'.
    // Usamos el encadenamiento opcional (?.) y split para limpiar el prefijo 'Bearer'.
    const token = req.headers['authorization']?.split(' ')[1]; 

    // Primera validación: Si no hay token, cortamos la ejecución de inmediato.
    if (!token) {
        // Devolvemos un 403 (Forbidden) porque la ruta es privada.
        return res.status(403).json({ 
            status: "error", 
            message: "Acceso denegado: No se proporcionó un token de seguridad" 
        });
    }

    try {
        /**
         * Verificamos la autenticidad del token usando nuestra clave secreta.
         * Si el token fue alterado o la clave no coincide, saltará al catch.
         */
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_provisoria');
        
        // Adjuntamos los datos decodificados (id, email) al objeto req.
        // Esto nos permite saber quién es el usuario en los siguientes controladores.
        req.user = decoded; 
        
        // Si todo está ok, usamos next() para darle paso a la ruta final.
        next(); 
    } catch (error) {
        // Si el token expiró o la firma es falsa, devolvemos 401 (Unauthorized).
        return res.status(401).json({ 
            status: "error", 
            message: "El token no es válido o ya expiró. Por favor, inicia sesión de nuevo." 
        });
    }
};