import { ValidationError } from '../videos/types/validationError';

export const createErrorMessages = (
  errors: ValidationError[],
): { errorMessages: ValidationError[] } => ({ errorMessages: errors });
