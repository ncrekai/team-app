import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EditItemText } from '../components/EditItem';

const ProfileEdit = () => {
   const navigate = useNavigate();
   const id = useParams().id;
   const profile = useOutletContext().profile

   const [newProfileData, setNewProfileData] = useState({});

   useEffect(() => console.log(newProfileData), [newProfileData]);

   const handleInput = (name, value) => {
      setNewProfileData({ ...newProfileData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      // const updatedData = { ...list, ...newProfileData };
      const jsonBody = JSON.stringify(newProfileData);
      console.log(jsonBody);
      navigate('/dashboard');
   };
   
   return (
      <div className='page-inner'>
         <div className='page'>
            <div className='page-title'>Edit Profile</div>
            <form className='form-container' onSubmit={handleSubmit}>
               <EditItemText name='fname' val={profile.fname} display='First Name' handleInput={handleInput} />
               <EditItemText name='lname' val={profile.lname} display='Last Name' handleInput={handleInput} />

               <div className='input-container'>
                  <input className='button' type='submit' value='Submit' />
               </div>
            </form>
         </div>
      </div>
   );
};

export default ProfileEdit;
