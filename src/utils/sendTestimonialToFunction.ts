import axios from 'axios';

type testimonialSubmission = {
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


export const sendTestimonialToFunction = (testimonial: testimonialSubmission) => {
  // Get curent date as YYYY-MM-DD
  // const reviewDate = new Date().toISOString().split('T')[0];

  const data = { ...testimonial};

  console.log('Posting Following Review', data);
  return axios.get ('https://gains-lather-catatonic.pgsdemo.com/functions/api/serverless/createTestimonial.ts', {
    params: {
      title: testimonial.title,
      author: testimonial.authorName,
      authorEmail: testimonial.authorEmail,
      content: testimonial.content,
      labels: testimonial.reviewLabelNames,
      locationId: testimonial.entity.id
    },
  });
};

export default sendTestimonialToFunction;
