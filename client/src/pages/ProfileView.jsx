// import { useOutletContext } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/authContext';
import { Grid2, Container } from '@mui/material';
import ReturnEdit from '../components/ReturnEdit';
import blankProfile from '../assets/blankProfile.jpeg';

const Profile = () => {
   const { profile } = useContext(AuthContext);

   /* 
   NOTE: see below for structure of profile object organization
   - name is full name, not first and last
   - profile picture is a URL to an external image
   - display user name and preferences in first grid item - have already added a display that uses

   profile = {
      email: "",
      name: "", 
      preferences: {
         accommodation: "",
         activities: ["", ...],
         destinations: ["", ...],
         travelType: "",
      },
      profilePicture: ""
   }
   */

   const profileImage = {
      backgroundImage: profile ? `url(${profile.profilePicture})` : `url(${blankProfile})`
   }

   if(!profile) {
      return <div>Loading user Info...</div>
   } else {
      return (
         <div className='page-inner'>
             <div className='page lists'>
               <div className='page-title'>My Profile</div>
               <div className='body-container'>
                  <Grid2 container spacing={3} className='grid-container'>
                     <Grid2 size={8}>
                        {/* display user name + preferences in here - maybe check MUI List display - it has nice icons */}
                     </Grid2>
                     <Grid2 size={4}>
                        <div style={profileImage} className='profile-picture'></div>
                     </Grid2>
                  </Grid2>
                 <ReturnEdit />
             </div>
             </div>
         </div>
      );
   };
}

export default Profile;
