import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ProfileEdit.css';

const ProfileEdit = () => {
    const { user, profile, token } = useContext(AuthContext);
    const navigate = useNavigate();


    /*I mostly went off based on what I did in register.jsx
    combined with how Natalie and/or Toqa did login
    to account for the fact that a user is logged in
    and has to be authenticated
    */
    
    //Pre-fills current email if available
    const [formData, setFormData] = useState({
        email: profile?.email || '', 
        password: '',              
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                _id: profile._id,
                email: profile.email || '',   
                password: '',              
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // console.log('profile: ', profile);
    // console.log('profile._id: ', profile._id);
    // console.log('token: ', token);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!profile || !profile._id) {
            console.error("User is not available or missing ID");
            return;
        }
    
        try {
            const dataToUpdate = { ...formData };
    
            // Only sends the password field if it's not empty
            if (!dataToUpdate.password) {
                delete dataToUpdate.password; 
            }
            
            console.log("profile id?", profile._id);
            console.log("user id?: ", user._id);
            console.log("token:", token);
            
            const response = await axios.put(`http://localhost:8080/users/${profile._id}`, dataToUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            

            console.log('UserID?: ', profile._id);

            if (response.data) {
                navigate(`/user/${profile._id}`);
            }
        } catch (err) {
            console.error('Error updating user', err);
        }
    };

    //If a user tries to access this without being logged in
    if (!profile) {
        return <div>Login Required</div>;
    };

    return (
        <div className='page-inner'>
            <div className='page'>
                <div className='page-title'>Edit Profile</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;


