const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Restaurant API',
    description: 'Final Project for CSE341'
  },
  host: 'final-project-restaurant-api.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);