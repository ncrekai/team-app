import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {AuthContext} from "../services/authContext.jsx";
import { EditItemText, EditItemDate, EditChecklistSelect } from '../components/EditItem';
import { getDayIn } from '../helpfulFunctions.js';

const TripNew = () => {
   const { user } = useContext(AuthContext);

   const navigate = useNavigate();
   const id = useParams().userId;
   const dateToday = getDayIn(new Date())

   const [tripData, setTripData] = useState({ createdBy: id, name: '', destination: '', startDate:'', endDate: '', tripWishlist: [] });

   const handleInput = (name, value) => {
      setTripData({ ...tripData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      const jsonBody = JSON.stringify(tripData);
      console.log(jsonBody);
      // navigate('/dashboard');
   };
   if(!user) {
      return <div>Loading Page...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>New Trip</div>
               <form className='form-container' onSubmit={handleSubmit}>
               <EditItemText name='name' val='' display='Name' required={true} handleInput={handleInput} />
               <EditItemText name='destination' val='' display='Destination' required={true} handleInput={handleInput} />
               <EditItemDate name='startDate' val={dateToday} display='Start Date' required={true} handleInput={handleInput} />
               <EditItemDate name='endDate' val={dateToday} display='End Date' required={true} handleInput={handleInput} />
               <EditChecklistSelect name='lists' lists={user.generalWishlist.concat(user.tripWishlist)} current={[]} display='Linked Lists' 
                  multiple={true} handleInput={handleInput} />
                  <div className='input-container'>
                     <input className='button' type='submit' value='Submit' />
                  </div>
               </form>
            </div>
         </div>
      );
   }
};
export default TripNew;
