import { Resolutions } from '../types/video';

export interface CreateVideoDTO {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
}

export interface UpdateVideoDTO {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: string;
}
