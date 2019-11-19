import client, { path } from './client';

export const getReview = () => client.get(`${path}/api/adminReviews`);
