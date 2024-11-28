import {createContext, useEffect, useState} from 'react';
import {login, logout} from './authService.js';
import { getUserProfile } from './profileApi.jsx';
import { getUserTrips } from './tripsApi.jsx';
import { getUserLists } from './wishlistsApi.jsx';
import {jwtDecode} from "jwt-decode";
import Axios from "axios";

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
        const response = await Axios.get(`http://localhost:8080/users/user`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile", error);
        throw error;
    }
};


// create a Context for managing authentication state
export const AuthContext = createContext();

// provides the authentication state and functions to its children
export const AuthProvider = ({ children }) => {
    // State to store the current user
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const [profile, setProfile] = useState(null)
    const [trips, setTrips] = useState(null)
    const [lists, setLists] = useState(null)

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
        if (user) {
            fetchUserProfile()
            // fetchUserTrips()
            // fetchUserLists()
        } 
    }, [user])

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

    const handleLogout = () => {
        logout();
        setUser(null);
        setToken(null);
        // Remove token from localStorage
        localStorage.removeItem('token');
    };

    const fetchUserProfile = async () => {
        try {
            // Wait until the user and token are fetched
            if(!user || !token) return;
            getUserProfile(token)
            .then(profileData => 
                setProfile({
                    name: profileData.user.name,
                    email: profileData.user.email,
                    preferences: profileData.preferences,
                    profilePicture: profileData.profilePicture 
                })
            )
        } catch {
            console.log('error in authContext/fetchUserProfile');
        }
    }

    // const fetchUserTrips = async () => {
    //     try {
    //        // Wait until the user and token are fetched
    //        if(!user || !token) return;
    //         const userId = user._id;
    //        getUserTrips(token)
    //        .then(tripData => {
    //         setTrips(tripData)
    //        })
    //     } catch {
    //        console.log('error in authContext/fetchTrips');
    //     }
    //  }

    //  const fetchUserLists = async () => {
    //     if(!user || !token) return;
    //     const userId = user._id;
    //     getUserLists(userId, token)
    //     .then(listData => console.log(listData))
    //  }

    return (
        // make the authentication state and functions available to child components
        <AuthContext.Provider value={{ user, token, handleLogin, handleLogout, profile, trips }}>
            {children}
        </AuthContext.Provider>
    );
};
