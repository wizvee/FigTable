import client from './client';

export const getReview = () => client.get(`/figtable/api/adminReviews`);
