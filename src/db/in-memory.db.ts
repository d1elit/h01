import {Video, availableResolutions} from "../videos/types/video";

export const db = {
  videos: <Video[]>[
    {
      id: 1,
      title: 'How to learn js',
      author: 'Marko Polo',
      canBeDownloaded: false,
      minAgeRestriction: 18,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: Object.values(availableResolutions),
    },
    {
      id: 2,
      title: 'How to learn Express',
      author: 'James Blunt',
      canBeDownloaded: false,
      minAgeRestriction: 18,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: Object.values(availableResolutions),
    },
    {
      id: 3,
      title: 'How to learn MongoDB',
      author: 'Rick Rubin',
      canBeDownloaded: false,
      minAgeRestriction: 18,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: Object.values(availableResolutions),
    },
  ],
};
