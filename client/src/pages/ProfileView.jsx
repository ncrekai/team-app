import { useOutletContext } from 'react-router-dom';
import ReturnEdit from '../components/ReturnEdit';

const Profile = () => {
   const profile = useOutletContext().profile

   return (
      <div className='page-inner'>
          <div className='page lists'>
            <div className='page-title'>My Profile</div>
            <div className='body-container'>
            <div className='trip-body'>
               <h4>First Name: {profile.fname}</h4>
               <h4>Last Name: {profile.lname}</h4>
            </div>
              <ReturnEdit />
          </div>
          </div>
      </div>
);
};

export default Profile;
