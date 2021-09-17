/* eslint-disable no-undef */
import axios from 'axios';
import { Config } from '../../config';

const logging = true;
const axiosapi = axios.create({
    baseURL : Config.Local_API_URL
});

// export const API = () => {
    /*** Authentication */
    /**
     * 
     * @param {*} username 
     * @param {*} password 
     * @returns Response or Error object
     */
     export const authenticate = (username, password) => {
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

    export const getCurrentUser = (token) => {
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
    };


//     return { 
//         authenticate(username, password), 
//         getCurrentUser(token) 
//     }
// };