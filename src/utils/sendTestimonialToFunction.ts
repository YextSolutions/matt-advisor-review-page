import axios from 'axios';

type testimonialSubmission = {
  entity: {
    id: string;
  };
  authorName: string;
  authorEmail: string;
  title: string;
  rating: number;
  content: string;
  label1: string;
  label2: string;
  conflictDetails: string;
  label3: string;
  compensationDetails: string;
  invitationUid?: string;
};


export const sendTestimonialToFunction = (testimonial: testimonialSubmission) => {
  // Get curent date as YYYY-MM-DD
  const reviewDate = new Date().toISOString().split('T')[0];

  const data = { ...testimonial};

  console.log('Posting Following Review', data);
  return axios.get ('https://gains-lather-catatonic.pgsdemo.com/serverless/createTestimonial', {
    params: {
      title: testimonial.title,
      author: testimonial.authorName,
      authorEmail: testimonial.authorEmail,
      content: testimonial.content,
      label1: testimonial.label1,
      label2: testimonial.label2,
      conflictDetails: testimonial.conflictDetails,
      label3: testimonial.label3,
      compensationDetails: testimonial.compensationDetails,
      locationId: testimonial.entity.id,
      rating: testimonial.rating,
      date: reviewDate
    },
  });
};

export default sendTestimonialToFunction;
