// import axios
import axios from 'axios';

// const instance
export const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

// create the base url
export const matchesForFlatee = '/matches/matchesForFlatee';
export const matchesForFlat = '/matches/matchesForFlat';
export const addFlat = '/matches/addFlat';
export const addFlatee = '/matches/addFlatee';
export const unmatch = '/matches/unmatch';
