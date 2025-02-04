// Importar las dependencias necesarias
const jsonServer = require('json-server');
const path = require('path');

// Crear un servidor JSON
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // Asegúrate de que 'db.json' esté en la misma carpeta que 'server.js'

// Middleware para configurar el puerto dinámico
const middlewares = jsonServer.defaults();

// Definir el puerto que Render asigna (será pasado a través de la variable de entorno $PORT)
const port = process.env.PORT || 3000;

// Usar los middlewares por defecto de json-server
server.use(middlewares);

// Usar la API del archivo db.json
server.use(router);

// Iniciar el servidor en el puerto especificado
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
