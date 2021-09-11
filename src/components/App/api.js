/* eslint-disable no-undef */
import axios from 'axios';
import { Config } from '../../config';

const logging = true;
const axiosapi = axios.create({
    baseURL : Config.Local_API_URL
});

    /*** Authentication */
    /**
     * 
     * @param {*} username 
     * @param {*} password 
     * @returns Response or Error object
     */
    const authenticate = (username, password) => {
        axiosapi.post('/users/authenticate', { 
            username: username, 
            password: password
        })
        .then(function (response) {
            if(logging) 
                console.log(response)
            return response;
        })
        .catch(function (error) {
            if(logging)
                console.log(error)
            return error;
        })
    };

    const getCurrentUser = (token) => {
        axiosapi.get('/users/current', { 
            headers: { 'Authorization': `bearer ${token}`}
        })
        .then(function (response) {
            if(logging)
                console.log(response)
            return response;

        })
        .catch(function (error) {
            if(logging) 
                console.log(error)
            return error;
        })
        return null;
    };

export { authenticate, getCurrentUser };
