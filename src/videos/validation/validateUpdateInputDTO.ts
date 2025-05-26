import { UpdateVideoInputDTO } from '../dto/video.input-dto';
import { ValidationError } from '../types/validationError';
import { Resolutions } from '../types/video';

export const validateUpdateInputDTO = (body: UpdateVideoInputDTO) => {
  const errors: ValidationError[] = [];

  if (
    !body.title ||
    typeof body.title !== 'string' ||
    body.title.trim().length > 40
  ) {
    errors.push({ message: 'Invalid title', field: 'title' });
  }
  if (
    !body.author ||
    typeof body.author !== 'string' ||
    body.author.trim().length > 20
  ) {
    errors.push({ message: 'Invalid author', field: 'author' });
  }
  if (
    !body.availableResolutions ||
    !Array.isArray(body.availableResolutions) ||
    body.availableResolutions.length === 0 ||
    body.availableResolutions.some(
      (resolution) => !Object.values(Resolutions).includes(resolution),
    )
  ) {
    errors.push({
      message: 'Invalid availableResolutions',
      field: 'availableResolutions',
    });
  }
  if (
    body.canBeDownloaded === undefined ||
    typeof body.canBeDownloaded !== 'boolean'
  ) {
    errors.push({
      message: 'Invalid canBeDownloaded',
      field: 'canBeDownloaded',
    });
  }
  if (
    !body.minAgeRestriction ||
    (body.minAgeRestriction !== null &&
      typeof body.minAgeRestriction !== 'number') ||
    (body.minAgeRestriction !== null && body.minAgeRestriction < 1) ||
    (body.minAgeRestriction !== null && body.minAgeRestriction > 18)
  ) {
    errors.push({
      message: 'Invalid minAgeRestriction',
      field: 'minAgeRestriction',
    });
  }
  if (
    !body.publicationDate ||
    typeof body.publicationDate !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(
      body.publicationDate,
    ) ||
    isNaN(Date.parse(body.publicationDate)) ||
    new Date(body.publicationDate).getTime() < Date.now()
  ) {
    errors.push({
      message: 'Invalid publicationDate',
      field: 'publicationDate',
    });
  }

  return errors;
};
