import { HttpStatus } from '../../core/types/http-statuses';
import { db } from '../../db/in-memory.db';
import express from 'express';

export const testingRouter = express.Router();

testingRouter.delete('/', (req, res) => {
  db.videos = [];
  res.sendStatus(HttpStatus.NoContent);
});
