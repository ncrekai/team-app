import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ProfileEdit.css';

const ProfileEdit = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    /*I mostly went off based on what I did in register.jsx
    combined with how Natalie and/or Toqa did login
    to account for the fact that a user is logged in
    and has to be authenticated
    */
    
    //Pre-fills current email if available
    const [formData, setFormData] = useState({
        email: user?.email || '', 
        password: '',              
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',   
                password: '',              
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user || !user._id) {
            console.error("User is not available or missing ID");
            return;
        }
    
        try {
            const dataToUpdate = { ...formData };
    
            // Only sends the password field if it's not empty
            if (!dataToUpdate.password) {
                delete dataToUpdate.password; 
            }
    
            const response = await axios.put(`http://localhost:8080/users/${user._id}`, dataToUpdate);
    
            if (response.data) {
                navigate(`/user/${user._id}`);
            }
        } catch (err) {
            console.error('Error updating user', err);
        }
    };

    //If a user tries to access this without being logged in
    if (!user) {
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


