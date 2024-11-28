import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ReturnEdit from '../components/ReturnEdit';
import {AuthContext} from "../services/authContext.jsx";
import { EditItemText, EditItemDate, EditItemSelect, EditChecklistSelect } from '../components/EditItem';

const TripEdit = () => {
   const { user } = useContext(AuthContext);
   const {id} = useParams()
   const [trip, setTrip] = useState()
   // const [lists, setLists]
   const [updatedTrip, setUpdatedTrip] = useState({})

   // const allLists = user.generalWishlist.concat(user.tripWishlist)
   useEffect(() => {
      if (user) {
         const current = user.trips.filter(trip => trip._id == id)
         current[0].startDate = current[0].startDate.slice(0,10)
         current[0].endDate = current[0].endDate.slice(0,10)
         console.log(user)
         setTrip(current[0])
      }
   }, [user])

   const handleInput = (name, value) => {
      setUpdatedTrip({ ...updatedTrip, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      const updatedData = { ...trip, ...updatedTrip };
      const jsonBody = JSON.stringify(updatedData);
      console.log(jsonBody);
   };

   if(!trip) {
      return <div>Loading user Info...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>Edit Trip</div>
               <form className='form-container' onSubmit={handleSubmit}>
                  <EditItemText name='name' val={trip.name} display='Name' handleInput={handleInput} />
                  <EditItemText name='destination' val={trip.destination} display='Place' handleInput={handleInput} />
                  <EditItemDate name='startDate' date={trip.startDate} display='Start Date' handleInput={handleInput} />
                  <EditItemDate name='endDate' date={trip.endDate} display='End Date' handleInput={handleInput} />
                  <EditChecklistSelect name='lists' lists={user.generalWishlist.concat(user.tripWishlist)} current={trip.tripWishlist} display='Linked Lists' 
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

export default TripEdit;