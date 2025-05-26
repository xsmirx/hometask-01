import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setupApp';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import {
  CreateVideoInputDTO,
  UpdateVideoInputDTO,
} from '../../../src/videos/dto/video.input-dto';
import { Resolutions } from '../../../src/videos/types/video';

describe('Validation tests for videos', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
  });

  it('should return 400 for invalid data; POST /videos', async () => {
    const invalidVideoBody: CreateVideoInputDTO = {
      title: 'This title is definitely longer than forty characters in length',
      author: 'This author name is definitely longer than twenty characters',
      availableResolutions: ['p489' as Resolutions],
    };
    const responce = await request(app)
      .post('/videos')
      .send(invalidVideoBody)
      .expect(HttpStatus.BadRequest);

    expect(responce.body.errorsMessages).toHaveLength(3);
  });

  let createdVaildeoId: number | null = null;
  it('should create video with valid data; POST /videos', async () => {
    const createVideoBody: CreateVideoInputDTO = {
      title: 'Test video',
      author: 'Test author',
      availableResolutions: [Resolutions.P1440, Resolutions.P2160],
    };
    const response = await request(app)
      .post('/videos')
      .send(createVideoBody)
      .expect(HttpStatus.Created);
    createdVaildeoId = response.body.id;
  });

  it('should return 400 for invalid update data; PUT /videos/:id', async () => {
    if (!createdVaildeoId) throw new Error('Video have not been created');

    const invalidUpdateBody: UpdateVideoInputDTO = {
      title: 'This title is definitely longer than forty characters in length',
      author: 'This author name is definitely longer than twenty characters',
      availableResolutions: ['p489' as Resolutions],
      canBeDownloaded: false,
      minAgeRestriction: 20,
      publicationDate: 'some string',
    };
    const response = await request(app)
      .put(`/videos/${createdVaildeoId}`)
      .send(invalidUpdateBody)
      .expect(HttpStatus.BadRequest);
    expect(response.body.errorsMessages).toHaveLength(5);
  });
});
