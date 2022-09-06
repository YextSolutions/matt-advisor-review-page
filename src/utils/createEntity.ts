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



export const createEntity = (entity: GeneratedEntity) => {
  // Get curent date as YYYY-MM-DD
  const reviewDate = new Date().toISOString().split('T')[0];

  const data = { ...entity, reviewDate };

  console.log('Posting Following Review', data);
  return axios.post('https://api.yext.com/v2/accounts/me/entities', data, {
    params: {
      api_key: '7579d93a8ebdcbe477e3f59f50376a04',
      v: 20220101,
    },
  });
};

export default createEntity;
