import express, { type Express } from 'express';
import { videosRouter } from './videos/routers/videos.router';
import { testingRouter } from './testing/routers/testing.router';
import { setupSwagger } from './core/swagger/setupSwagger';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

  app.use('/api/videos', videosRouter);
  app.use('/api/testing/all-data', testingRouter);

  setupSwagger(app);

  return app;
};
