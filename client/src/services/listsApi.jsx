import Axios from 'axios'

const API_URL = 'http://localhost:8080';

export const getUserLists = async (userId, token) => {
    try {
        const response = await Axios.get(`${API_URL}/users/${userId}/wishlists`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error('Error getting profile');
    }
}

export const getListById = async (listId, userId, token) => {
    try {
        const response = await Axios.get(`${API_URL}/wishlists/${listId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error('Error getting list');
    }
 }