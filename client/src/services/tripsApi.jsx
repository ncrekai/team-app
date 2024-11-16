import Axios from 'axios'

const API_URL = 'http://localhost:8080';

export const getUserTrips = async (userId, token) => {
    try {
        const response = await Axios.get(`${API_URL}/trips/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
      //   const userTrips = 
        return response.data;
    } catch(error) {
        console.log(error);
        throw new Error('Error getting profile');
    }
}