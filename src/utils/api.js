/* eslint-disable no-undef */
import axios from 'axios';
const apiURL = 'http://localhost:3000'

const unauthaxios = axios.create({
    timeout: 10000,
    headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
    }
});

const authaxios = (jwt) => { 
    return axios.create({
        timeout: 10000,
        headers: { 
            'Authorization': `Bearer ${jwt}`, 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }
    });
}

const authparamaxios = (jwt, param) => { 
    return axios.create({
        timeout: 10000,
        params: param,
        headers: { 
            'Authorization': `Bearer ${jwt}`, 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }
    });
}

// User Requests
const authenticate = async ( payload)  => await unauthaxios.post(`/api/users/authenticate`, payload);
const register = async ()  => await unauthaxios.post(`/api/users/register`);
const logout = async (jwt) => await authaxios(jwt).post(`/api/logout`);
const getAllUsers = async (jwt)  => await authaxios(jwt).get(`/api/users/`);
const getUserById = async (id, jwt)  => await authaxios(jwt).get(`/api/users/${id}`);
const getJWTUser = async (jwt)  => await authaxios(jwt).get(`/api/users/current` );
const updateUserById = async (id, jwt, payload)  => await authaxios(jwt).put(`/api/users/${id}`, payload);
const deleteUserById = async (id, jwt)  => await authaxios(jwt).delete(`/api/users/${id}`);

// Flat Requests
const getOwnedFlats = async (jwt)  => await authaxios(jwt).get(`/api/flats/`);
const getFlatById = async (id, jwt)  => await authaxios(jwt).get(`/api/flats/${id}`);
const getAllFlats = async (jwt)  => await authaxios(jwt).get(`/api/flats/all`);
const updateFlatById = async (id, jwt, payload)  => await authaxios(jwt).put(`/api/flats/${id}`, payload);
const deleteFlatById = async (id, jwt)  => await authaxios(jwt).delete(`/api/flats/${id}`);

// Location Requests
const addLocation = async (jwt, payload)  => await authaxios(jwt).post(`/api/locations/`, payload)
const getAllLocations = async (jwt)  => await authaxios(jwt).get(`/api/locations/`);
const getLocationById = async (id, jwt)  => await authaxios(jwt).get(`/api/locations/${id}`);
const updateLocationById = async (id, jwt, payload)  => await authaxios(jwt).put(`/api/locations/${id}`, payload);
const deleteLocationById = async (id, jwt)  => await authaxios(jwt).delete(`/api/locations/${id}`);

// Match Requests
const getAllMatches = async (jwt)  => await authaxios(jwt).get(`/api/matches/`);
const getMatchById = async (id, jwt)  => await authaxios(jwt).get(`/api/matches/${id}`);
const findFlatee = async (id, jwt)  => await authaxios(jwt).get(`/api/match/findFlatee/${id}`)
const getFlateeMatches = async (id, jwt)  => await authaxios(jwt).get(`/api/matches/successMatchesForFlatee/${id}`);
const getListingMatches = async (id, jwt)  => await authaxios(jwt).get(`/api/matches/successMatchesForListing/${id}`);
const getPotFlateeMatches = async (jwt, payload)  => await authparamaxios(jwt, payload).get(`/api/matches/potentialMatchesForFlatee/`);
const getPotListingMatches = async (jwt, payload)  => await authparamaxios(jwt, payload).get(`/api/matches/potentialMatchesForListing/`);
const addListingToMatch = async (jwt, payload)  => await authaxios(jwt).post(`/api/matches/addListing/`, payload);
const addFlateeToMatch = async (jwt, payload)  => await authaxios(jwt).post(`/api/matches/addFlatee/`, payload);
const unmatch = async (id, jwt, payload)  => await authaxios(jwt).put(`/api/matches/unmatch/${id}`, payload);
const deleteMatchById = async (id, jwt)  => await authaxios(jwt).delete(`/api/matches/${id}`);

// Listing Requests
const addListing = async (jwt, payload)  => await authaxios(jwt).post(`/api/listings/`, payload);
const getListingByFlatId = async (flatId, jwt) => await authaxios(jwt).get(`/api/listings/flat/${flatId}`);
const getListingById = async (id, jwt)  => await authaxios(jwt).get(`/api/listings/${id}`);
const getAllListings = async (jwt)  => await authaxios(jwt).get(`/api/listings/all`);
const getFlatAccount = async (id, jwt) => await authaxios(jwt).get(`/api/flatAccount/${id}`);
const updateListingById = async (id, jwt, payload)  => await authaxios(jwt).put(`/api/listings/${id}`, payload);
const deleteListingById = async (id, jwt)  => await authaxios(jwt).delete(`/api/listings/${id}`);

// Chat Requests
const addChat = async (jwt, payload)  => await authaxios(jwt).post(`/api/chat/`, payload);
const addMessageToChat = async (id, jwt, payload)  => await authaxios(jwt).post(`//apichat/message/${id}`, payload);
const getChatById = async (id, jwt)  => await authaxios(jwt).get( `/api/chat/${id}`);
const getChatByMatchId = async (matchId, jwt)  => await authaxios(jwt).get( `/api/chat/match/${matchId}`);
const getAllChats = async (jwt)  => await authaxios(jwt).get(`/api/chat/`);
const updateChatById = async (id, jwt, payload)  => await authaxios(jwt).put(`/api/chat/${id}`, payload);
const deleteChatById = async (id, jwt)  => await authaxios(jwt).delete(`/api/chat/${id}`);

// Notificaiton Requests
const getUsersNotifications = async (jwt)  => await authaxios(jwt).get(`/api/notifications/`);
const readNotfication = async (id, jwt)  => await authaxios(jwt).put(`/api/notifications/read/${id}`);
const addNotification = async (jwt, payload)  => await authaxios(jwt).get(`/api/notifications/`, payload);
const deleteNotificationById = async (id, jwt)  => await authaxios(jwt).delete(`/api/notification/${id}`);

const api = {
    authenticate,
    register,
    logout,
    getUserById,
    getAllUsers,
    getJWTUser,
    updateUserById,
    deleteUserById,
    getAllMatches,
    getMatchById,
    findFlatee, 
    getFlateeMatches,
    getListingMatches,
    getPotFlateeMatches,
    getPotListingMatches,
    addListingToMatch,
    addFlateeToMatch,
    unmatch,
    deleteMatchById,
    getOwnedFlats,
    getFlatById,
    getAllFlats,
    updateFlatById,
    deleteFlatById,
    addLocation,
    getAllLocations,
    getLocationById,
    updateLocationById,
    deleteLocationById,
    addListing,
    getListingByFlatId,
    getListingById,
    getAllListings,
    getFlatAccount,
    updateListingById,
    deleteListingById,
    addChat,
    addMessageToChat,
    getChatById,
    getChatByMatchId,
    getAllChats,
    updateChatById,
    deleteChatById,
    getUsersNotifications,
    readNotfication,
    addNotification,
    deleteNotificationById
}

export default api;