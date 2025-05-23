import { Resolutions, Video } from '../videos/types/video';

export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: 'Introduction to TypeScript',
      author: 'Jane Doe',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: '2024-06-01T10:00:00Z',
      publicationDate: '2024-06-02T10:00:00Z',
      availableResolutions: [Resolutions.P720, Resolutions.P1080],
    },
    {
      id: 2,
      title: 'Advanced Node.js',
      author: 'John Smith',
      canBeDownloaded: false,
      minAgeRestriction: 16,
      createdAt: '2024-06-03T12:00:00Z',
      publicationDate: '2024-06-04T12:00:00Z',
      availableResolutions: [Resolutions.P480, Resolutions.P720],
    },
    {
      id: 3,
      title: 'React Basics',
      author: 'Alice Johnson',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: '2024-06-05T14:00:00Z',
      publicationDate: '2024-06-06T14:00:00Z',
      availableResolutions: [
        Resolutions.P360,
        Resolutions.P720,
        Resolutions.P1080,
      ],
    },
  ],
};
