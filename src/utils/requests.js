// import axios
import axios from 'axios';

// const instance
export const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

// create the base url
export const matchesForFlatee = '/matches/potentialMatchesForFlatee';
export const matchesForListing = '/matches/potentialMatchesForListing';
export const addListing = '/matches/addListing';
export const addFlatee = '/matches/addFlatee';
export const unmatch = '/matches/unmatch';
