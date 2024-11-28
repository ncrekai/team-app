import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/authContext';

const ProfileEdit = () => {
      const { profile } = useContext(AuthContext);
   
      /* 
      NOTE: see below for structure of profile object organization
      - make form fields using current profile values as default
      - profile picture is a URL to an external image
      - I added enum array to all Profile.preferences except destinations - maybe use that to make a checklist/radio?
      - add submit that call update profile api 
   
      profile = {
         email: "",
         name: "",
         preferences: {
            accommodation: "",
            activities: ["", ...],
            destinations: ["", ...],
            travelType: "",
         }
         profilePicture: ""   
      }
      */
   
   return (
      <div className='page-inner'>
         <div className='page'>
            <div className='page-title'>Edit Profile</div>
            
         </div>
      </div>
   );
};

export default ProfileEdit;
