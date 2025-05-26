import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Videos API',
      version: '1.0.0',
      description: 'Videos API',
    },
    tags: [
      { name: 'Testing', description: 'API for clearing the database' },
      { name: 'Videos', description: 'API for managing drivers' },
    ],
  },
  apis: ['./src/**/*.router.ts', './src/**/*.swagger.yml'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
