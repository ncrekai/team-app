import {createContext, useEffect, useState, useRef } from 'react';
import {login, logout} from './authService.js';
import { getUserProfile } from './profileApi.jsx';
import {jwtDecode} from "jwt-decode";
import Axios from "axios";

// create a Context for managing authentication state
export const AuthContext = createContext();

// provides the authentication state and functions to its children
export const AuthProvider = ({ children }) => {
    // State to store the current user
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const profileFetched = useRef(false);

    const decodeToken = (token) => {
        try {
            // This will return the entire load (you can filter specific fields like `decoded.user`)
            return jwtDecode(token);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const fetchUserInfo = async (token) => {
        try {
            const response = await Axios.get(`http://localhost:8080/users/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user profile", error);
            throw error;
        }
    };

    const fetchUserProfile = async () => {
        try {
            // Wait until the user and token are fetched
            if(!user || !token) {
                console.log('User or token is missing. Cannot fetch profile.');
                return;
            }

            console.log('Fetching profile with token: ', token);

            const profileData = await getUserProfile(token);
            console.log('Fetched profile data: ', profileData)

            if (!profile || profile.name !== profileData.user.name) {
                setProfile({
                    _id: profileData.user._id,
                    name: profileData.user.name,
                    email: profileData.user.email,
                    preferences: profileData.preferences,
                    profilePicture: profileData.profilePicture 
                    });
            } 
        } catch (error) {
            console.log('error in authContext/fetchUserProfile');
        } finally {
            setLoading(false);
        }
    }

    //save the token to the local storage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Decode token to get userId or user data
            const userInfo = decodeToken(storedToken);
            setToken(storedToken);

            // Fetch the full user profile if the token contains only userId
            if (userInfo) {
                fetchUserInfo(storedToken)
                    .then(userInfo => {
                        setUser(userInfo);
                    })
                    .catch(error => {
                        console.error("Error fetching user data after login", error);
                    });
            } else {
                // If user data is already in the token
                setUser(userInfo);
            }
        }
    }, []);

    // Save profile data to context provider after user is set
    useEffect(() => {
        if (user && token && !profileFetched.current) {
            profileFetched.current = true;
            fetchUserProfile();
        }
    }, [user, token]);

    const handleLogin = async (email, password) => {
        try {
            // Call the login function from authService to verify the user
            const data = await login(email, password);
            setUser(data.user);
            setToken(data.token);
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const handleLogout = (navigate) => {
        logout();
        setUser(null);
        setToken(null);
        setProfile(null);
        // Remove token from localStorage
        profileFetched.current = false;
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        // make the authentication state and functions available to child components
        <AuthContext.Provider value={{ user, token, handleLogin, handleLogout, profile }}>
            {children}
        </AuthContext.Provider>
    );
};





