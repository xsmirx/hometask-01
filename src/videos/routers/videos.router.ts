import { HttpStatus } from '../../core/types/http-statuses';
import { db } from '../../db/in-memory.db';

import express from 'express';
import { Video } from '../types/video';
import { validateCreateInputDTO } from '../validation/validateCreateInputDTO';
import { createErrorMessages } from '../../core/util.error';
import { validateUpdateInputDTO } from '../validation/validateUpdateInputDTO';

export const defaultCanBeDownloaded = false;
export const defaultMinAgeRestriction = null;

export const videosRouter = express.Router();

videosRouter.get('/', (req, res) => {
  res.status(HttpStatus.Ok).json(db.videos);
});

videosRouter.post('/', (req, res) => {
  const validationErrors = validateCreateInputDTO(req.body);

  if (validationErrors.length > 0) {
    res
      .status(HttpStatus.BadRequest)
      .send(createErrorMessages(validationErrors));
    return;
  }

  const createdAt = new Date();
  const publicationDate = createdAt.setDate(createdAt.getDate() + 1);

  const video: Video = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: defaultCanBeDownloaded,
    minAgeRestriction: defaultMinAgeRestriction,
    createdAt: createdAt.toISOString(),
    publicationDate: new Date(publicationDate).toISOString(),
    availableResolutions: req.body.availableResolutions,
  };
  db.videos.push(video);
  res.status(HttpStatus.Created).send(video);
});

videosRouter.get('/:id', (req, res) => {
  if (req.params.id === 'undefined' || isNaN(+req.params.id)) {
    res.sendStatus(HttpStatus.BadRequest);
    return;
  }

  const video = db.videos.find((video) => video.id === +req.params.id);
  if (video) {
    res.status(HttpStatus.Ok).send(video);
  } else {
    res.sendStatus(HttpStatus.NotFound);
  }
});

videosRouter.put('/:id', (req, res) => {
  if (req.params.id === 'undefined' || isNaN(+req.params.id)) {
    res.sendStatus(HttpStatus.BadRequest);
    return;
  }
  const validationErrors = validateUpdateInputDTO(req.body);

  if (validationErrors.length > 0) {
    res
      .status(HttpStatus.BadRequest)
      .send(createErrorMessages(validationErrors));
    return;
  }

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

videosRouter.delete('/:id', (req, res) => {
  if (req.params.id === 'undefined' || isNaN(+req.params.id)) {
    res.sendStatus(HttpStatus.BadRequest);
    return;
  }
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
