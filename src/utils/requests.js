// import axios
import axios from 'axios';

// const instance
export const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

// create the base url
export const getCards = '/flats/all';
