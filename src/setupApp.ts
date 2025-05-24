import express, { type Express } from 'express';
import { videosRouter } from './videos/routers/videos.router';
import { testingRouter } from './testing/routers/testing.router';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

  app.use('/videos', videosRouter);
  app.use('/testing/all-data', testingRouter);

  return app;
};
