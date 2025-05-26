import { HttpStatus } from '../../core/types/http-statuses';
import { db } from '../../db/in-memory.db';
import express from 'express';

export const testingRouter = express.Router();

/**
 * @swagger
 * /api/testing/all-data:
 *   delete:
 *     summary: Deletes all videos from the in-memory database.
 *     description: Removes all video entries from the in-memory database and returns a 204 No Content status.
 *     tags:
 *       - Testing
 *     responses:
 *       204:
 *         description: All videos have been deleted successfully.
 */

testingRouter.delete('/', (req, res) => {
  db.videos = [];
  res.sendStatus(HttpStatus.NoContent);
});
