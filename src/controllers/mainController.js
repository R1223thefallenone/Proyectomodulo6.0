/**
 * Controlador para la ruta raíz ('/')
 * Objetivo: Servir contenido visual al usuario en formato HTML.
 */
export const getHome = (req, res) => {
    // res.send() se utiliza aquí para enviar una respuesta de texto/HTML al cliente.
    // Esto cumple con el requisito de servir al menos una ruta en formato HTML.
    res.send('<h1>Bienvenido a la Web App</h1>');
};

/**
 * Controlador para la ruta de estado ('/status')
 * Objetivo: Devolver información técnica sobre el estado del servidor.
 */
export const getStatus = (req, res) => {
    // res.json() envía una respuesta en formato JSON con los encabezados adecuados.
    // Estructuramos la respuesta con (status, message) para mantener consistencia en la API
    // Este endpoint es el que dispara el loggerMiddleware para la persistencia
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando correctamente' 
    });
};