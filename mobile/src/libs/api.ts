import axio from 'axios';

export const api = axio.create({
  baseURL: 'http://172.21.245.203:3333',
});
