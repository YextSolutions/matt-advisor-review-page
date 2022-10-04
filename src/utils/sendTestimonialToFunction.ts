import axios from 'axios';

type testimonialSubmission = {
  entity: {
    id: string;
  };
  authorName: string;
  authorEmail: string;
  rating: number;
  content: string;
  label1: string;
  currentClient: string;
  label2: string;
  conflictDetails: string;
  label3: string;
  compensationDetails: string;
  invitationUid?: string;
};


export const sendTestimonialToFunction = (testimonial: testimonialSubmission) => {
  // Get curent date as YYYY-MM-DD
  const reviewDate = new Date().toISOString().split('T')[0];
  const reviewTitleDate = new Date().toISOString();

  const data = { ...testimonial};

  console.log('Posting Following Review', data);
  return axios.get ('https://gains-lather-catatonic.pgsdemo.com/serverless/createTestimonial', {
    params: {
      author: testimonial.authorName,
      authorEmail: testimonial.authorEmail,
      content: testimonial.content,
      label1: testimonial.label1,
      currentClient: testimonial.currentClient,
      label2: testimonial.label2,
      conflictDetails: testimonial.conflictDetails,
      label3: testimonial.label3,
      compensationDetails: testimonial.compensationDetails,
      locationId: testimonial.entity.id,
      rating: testimonial.rating,
      date: reviewDate,
      date2: reviewTitleDate
    },
  });
};

export default sendTestimonialToFunction;
