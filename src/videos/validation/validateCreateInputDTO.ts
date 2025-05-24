import { CreateVideoInputDTO } from '../dto/video.input-dto';
import { ValidationError } from '../types/validationError';
import { Resolutions } from '../types/video';

export const validateCreateInputDTO = (
  data: CreateVideoInputDTO,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    data.title.trim().length > 40
  ) {
    errors.push({ message: 'Invalid title', field: 'title' });
  }
  if (
    !data.author ||
    typeof data.author !== 'string' ||
    data.author.trim().length > 20
  ) {
    errors.push({ message: 'Invalid autor', field: 'author' });
  }

  if (
    !data.availableResolutions ||
    !Array.isArray(data.availableResolutions) ||
    data.availableResolutions.length === 0 ||
    data.availableResolutions.some(
      (resolution) => !Object.values(Resolutions).includes(resolution),
    )
  ) {
    errors.push({
      message: 'Invalid availableResolutions',
      field: 'availableResolutions',
    });
  }

  return errors;
};
