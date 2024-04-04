const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Web API Development Project',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers:[{url:"https://web-api-development-project.onrender.com"},{url:"http://localhost:3001"}],
   
  },
  apis: ['./src/api/routes/*.js'],
 
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };