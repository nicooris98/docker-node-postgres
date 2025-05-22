require('dotenv').config()
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de tu proyecto',
      version: '1.0.0',
      description: 'Documentación con Swagger',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`, // ajusta según tu entorno
      },
    ],
  },
  apis: ['./src/routes/*.js'], // rutas donde están las anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
