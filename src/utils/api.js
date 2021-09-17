/* eslint-disable no-undef */
import axios from 'axios';
require('dotenv').config();

const api = axios.create({
    baseURL : process.env.baseURL || "https://flinder-api-staging.herokuapp.com",
});

export const authenticate = payload => api.post(`/users/authenticate`, payload);
export const register = () => api.get(`/users/register`);
export const getUserById = (id, payload) => api.get(`/users/${id}`, payload);
export const deleteArticleById = id => api.delete(`/article/${id}`);
export const getArticleById = id => api.get(`/article/${id}`);

const apiRoute = {
    authenticate,
    register,
    getUserById,
    deleteArticleById,
    getArticleById,
}

export default apiRoute;