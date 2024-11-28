import { useContext } from 'react';
import { AuthContext } from '../services/authContext';
import { Typography, CircularProgress } from '@mui/material';
import '../css/profile.css';
import blankProfile from '../assets/blankProfile.jpg'
import ReturnEdit from '../components/ReturnEdit';

const Profile = () => {
   const { profile, loading } = useContext(AuthContext);

   const profileImage = {
      backgroundImage: profile?.profilePicture
         ? `url(${profile.profilePicture})`
         : `url(${blankProfile})`,
   };

   if (loading || !profile) {
      return (
         <div className="loading-container">
            <CircularProgress />
            <Typography>Loading user info...</Typography>
         </div>
      );
   }

   return (
      <div className="page-inner">
         <Typography variant="h4" className="page-title">My Profile</Typography>
         <div className="body-container">
            <div>
               <div className="profile-picture" style={profileImage}></div>
            </div>
            <div className="name-email-container">
               <Typography className="profile-detail">
                  <strong>Name:</strong> {profile.name || "Anonymous User"}
               </Typography>
               <Typography className="profile-detail">
                  <strong>Email:</strong> {profile.email || "No email provided"}
               </Typography>
            </div>
            <div className="profile-info-container">
               <Typography className="profile-section-header">
                  Travel Preferences:
               </Typography>
               <ul>
                  <li><strong>Accommodation:</strong> {profile.preferences.accommodation || "Not set"}</li>
                  <li><strong>Activities:</strong> {profile.preferences.activities?.join(", ") || "None"}</li>
                  <li><strong>Destinations:</strong> {profile.preferences.destinations?.join(", ") || "None"}</li>
                  <li><strong>Travel Type:</strong> {profile.preferences.travelType || "Not set"}</li>
               </ul>
            </div>
         </div>
         <div className="return-edit-container">
            <ReturnEdit />
         </div>
      </div>
   );
};

export default Profile;
