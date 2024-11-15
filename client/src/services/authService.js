import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    // Save token to local storage if login is successful
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

// Logout function
export const logout = () => {
    // Clear token from storage
    localStorage.removeItem('token');
};
