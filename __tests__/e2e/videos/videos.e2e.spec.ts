import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setupApp';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import {
  CreateVideoInputDTO,
  UpdateVideoInputDTO,
} from '../../../src/videos/dto/video.input-dto';
import { Resolutions } from '../../../src/videos/types/video';

describe('Videos E2E Tests', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
  });

  it('should return []; GET /videos', async () => {
    await request(app).get('/videos').expect(HttpStatus.Ok).expect([]);
  });

  it('should return 404; GET /videos/1', async () => {
    await request(app).get('/videos/1').expect(HttpStatus.NotFound);
  });

  let createdVideoId: number | null = null;
  let createdPublicationDate: string | null = null;

  it('shold create video; POST /videos', async () => {
    const createVideoBody: CreateVideoInputDTO = {
      title: 'Test video',
      author: 'Test author',
      availableResolutions: [Resolutions.P144, Resolutions.P1080],
    };

    const response = await request(app)
      .post('/videos')
      .send(createVideoBody)
      .expect(HttpStatus.Created);

    createdVideoId = response.body.id;
    createdPublicationDate = response.body.publicationDate;
  });

  it('shold update video; PUT /videos/:id', async () => {
    if (!createdPublicationDate || !createdVideoId)
      throw new Error('Video have not been created');

    const publicationDate = new Date(createdPublicationDate);
    publicationDate.setDate(publicationDate.getDate() + 10);

    const updateVideoBody: UpdateVideoInputDTO = {
      title: 'Updated video',
      author: 'Updated author',
      availableResolutions: [Resolutions.P360, Resolutions.P720],
      canBeDownloaded: true,
      minAgeRestriction: 18,
      publicationDate: publicationDate.toISOString(),
    };

    await request(app)
      .put(`/videos/${createdVideoId}`)
      .send(updateVideoBody)
      .expect(HttpStatus.NoContent);
  });

  it('should delete video; DELETE /videos/:id', async () => {
    if (!createdVideoId) throw new Error('Video have not been created');
    await request(app)
      .delete(`/videos/${createdVideoId}`)
      .expect(HttpStatus.NoContent);
  });
});
