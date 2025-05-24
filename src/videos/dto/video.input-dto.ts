import { Resolutions } from '../types/video';

export interface CreateVideoInputDTO {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
}

export interface UpdateVideoInputDTO {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: string;
}
