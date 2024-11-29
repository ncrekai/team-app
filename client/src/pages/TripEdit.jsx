import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ReturnEdit from '../components/ReturnEdit';
import {AuthContext} from "../services/authContext.jsx";
import { EditItemText, EditItemDate, EditChecklistSelect } from '../components/EditItem';
import axios from 'axios';

const TripEdit = () => {
   const { user, token } = useContext(AuthContext);
   const {id} = useParams()
   const navigate = useNavigate();
   const [trip, setTrip] = useState()
   // const [lists, setLists]
   const [updatedTrip, setUpdatedTrip] = useState({})

   // const allLists = user.generalWishlist.concat(user.tripWishlist)
   useEffect(() => {
      if (user) {
         const current = user.trips.filter(trip => trip._id == id)
         current[0].startDate = current[0].startDate.slice(0,10)
         current[0].endDate = current[0].endDate.slice(0,10)
         setTrip(current[0])
      }
   }, [user])

   const handleInput = (name, value) => {
      setUpdatedTrip({ ...updatedTrip, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload
      const updatedData = { ...trip, ...updatedTrip };
      const response = await axios.put(`http://localhost:8080/trips/${id}`, updatedData, {
         params: {tripId: id}, 
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },})
        navigate('/dashboard')
      return response.data;
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
                  <EditChecklistSelect lists={user.generalWishlist.concat(user.tripWishlist)} current={trip.tripWishlist} display='Linked Lists' 
                     handleInput={handleInput} />
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