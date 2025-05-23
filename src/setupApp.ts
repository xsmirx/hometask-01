import express, { type Express } from 'express';
import { HttpStatus } from './core/types/http-statuses';
import { db } from './db/in-memory.db';
import { Video } from './videos/types/video';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

  app.get('/hometask_01/api/videos', (req, res) => {
    res.status(HttpStatus.Ok).json(db.videos);
  });

  app.post('/hometask_01/api/videos', (req, res) => {
    const createdAt = new Date();
    const publicationDate = createdAt.setDate(createdAt.getDate() + 1);

    const video: Video = {
      id: Date.now(),
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: createdAt.toISOString(),
      publicationDate: new Date(publicationDate).toISOString(),
      availableResolutions: req.body.availableResolutions,
    };
    db.videos.push(video);
    res.status(HttpStatus.Created).send(video);
  });

  app.get('/hometask_01/api/videos/:id', (req, res) => {
    const video = db.videos.find((video) => video.id === +req.params.id);
    if (video) {
      res.status(HttpStatus.Ok).send(video);
    } else {
      res.sendStatus(HttpStatus.NotFound);
    }
  });

  app.put('/hometask_01/api/videos/:id', (req, res) => {
    const videoIndex = db.videos.findIndex(
      (video) => video.id === +req.params.id,
    );
    if (videoIndex === -1) {
      res.sendStatus(HttpStatus.NotFound);
    } else {
      const updatedVideo: Video = {
        ...db.videos[videoIndex],
        ...req.body,
      };
      db.videos[videoIndex] = updatedVideo;
      res.status(HttpStatus.NoContent).send();
    }
  });

  app.delete('/hometask_01/api/videos/:id', (req, res) => {
    const videoIndex = db.videos.findIndex(
      (video) => video.id === +req.params.id,
    );
    if (videoIndex === -1) {
      res.sendStatus(HttpStatus.NotFound);
    } else {
      db.videos.splice(videoIndex, 1);
      res.sendStatus(HttpStatus.NoContent);
    }
  });

  app.delete('/hometask_01/api/testing/all-data', (req, res) => {
    db.videos = [];
    res.sendStatus(HttpStatus.NoContent);
  });

  return app;
};
