import axios from 'axios';

export const path = process.env.PATH;
const client = axios.create();

export default client;
