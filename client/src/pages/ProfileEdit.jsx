import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ProfileEdit.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileEdit = () => {
    const { profile, token, setProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    // Pre-fills form with current email if available
    const [formData, setFormData] = useState({
        email: profile?.email || '',
        password: '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                email: profile.email || '',
                password: '',
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profile || !profile._id) {
            console.error('Profile or profile ID is missing.');
            return;
        }
    
        try {
            const dataToUpdate = { ...formData };
    
            // Only include the password if it's not empty
            if (!dataToUpdate.password) {
                delete dataToUpdate.password;
            }
    
            const response = await axios.put(`http://localhost:8080/profile`, dataToUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Update the profile in context with the new profile data
            setProfile(response.data.profile);

            toast.success('Profile updated successfully! Redirecting...');
            setTimeout(() => navigate(`/profile`), 500);
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message || 'Failed to update profile.');
            } else if (err.request) {
                toast.error('Server did not respond. Please try again later.');
            } else {
                toast.error(`Unexpected error: ${err.message}`);
            }
        }
    };

    // If user is not logged in or profile is missing
    if (!profile) {
        return <div>Login Required</div>;
    }

    return (
        <div className='page-inner'>
            <div className='page'>
                <div className='page-title'>Edit Profile</div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type='submit'>Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;
