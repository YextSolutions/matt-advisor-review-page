import axios from 'axios';

type GeneratedEntity = {
  entity: {
    id: string;
  };
  authorName: string;
  authorEmail: string;
  title: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  reviewLabelNames: string[];
  invitationUid?: string;
};

// {
//   "EntityType": "string",
//   "meta": {
//     "countryCode": "string",
//     "folderId": "string",
//     "id": "string",
//     "labels": [
//       "string"
//     ],
//     "language": "string"
//   },
//   "name": "string"
// }



export const createEntity = (testimonial: GeneratedEntity) => {
  // Get curent date as YYYY-MM-DD
  const reviewDate = new Date().toISOString().split('T')[0];

  const data = { ...testimonial, reviewDate };

  console.log('Posting Following Review', data);
  return axios.get ('https://huma4jczdk-41836-d.preview.pagescdn.com/functions/api/serverless/createTestimonial.ts', {
    params: {
      entityId: testimonial.entity.id,
      title: testimonial.title,
    },
  });
};

export default createEntity;
