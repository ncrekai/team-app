import Axios from 'axios'

const API_URL = 'http://localhost:8080';

export const getUserProfile = async (token) => {
    try {
        const response = await Axios.get(`${API_URL}/profiles/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error('Error getting profile');
    }
}

export const updateProfile = async (userId, profileDate, token) => {
    try {
        const response = await Axios.put(`${API_URL}/profiles/${userId}`, profileDate, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error('Failed to update profile');
    }
}