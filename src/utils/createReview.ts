import axios from 'axios';

type GeneratedReview = {
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

export const createReview = (review: GeneratedReview) => {
  // Get curent date as YYYY-MM-DD
  const reviewDate = new Date().toISOString().split('T')[0];

  const data = { ...review, reviewDate };

  console.log('Posting Following Review', data);
  return axios.post('https://liveapi.yext.com/v2/accounts/me/reviewSubmission', data, {
    params: {
      api_key: '7579d93a8ebdcbe477e3f59f50376a04',
      v: 20220101,
    },
  });
};

export default createReview;
