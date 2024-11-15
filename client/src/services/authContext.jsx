import {createContext, useEffect, useState} from 'react';
import {login, logout} from './authService.js';
import {jwtDecode} from "jwt-decode";

const decodeToken = (token) => {
    try {
        // This will return the entire load (you can filter specific fields like `decoded.user`)
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// create a Context for managing authentication state
export const AuthContext = createContext();

// provides the authentication state and functions to its children
export const AuthProvider = ({ children }) => {
    // State to store the current user
    const [user, setUser] = useState(null);

    // check if there's a saved token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Assuming the token is decoded to get user info (e.g., with jwt-decode)
            const userInfo = decodeToken(token); // replace with actual decoding function
            setUser(userInfo);
        }
    }, []);

    const handleLogin = async (email, password) => {
        try {
            // Call the login function from authService to verify the user
            const data = await login(email, password);
            setUser(data.user);

            // Store token in localStorage
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);

        // Remove token from localStorage
        localStorage.removeItem('token');
    };

    return (
        // make the authentication state and functions available to child components
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
