import Axios from 'axios'

const API_URL = 'http://localhost:8080';

export const getUserTrips = async (token) => {
    try {
        const response = await Axios.get(`${API_URL}/trips/user/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error('Error getting user trips');
    }
}

export const getTripsById = async (tripId, userId, token) => {
    try {
        const response = await Axios.get(`${API_URL}/trips/${tripId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error('Error getting trip');
    }
}