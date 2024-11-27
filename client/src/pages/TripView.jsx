import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ReturnEdit from '../components/ReturnEdit';
import {AuthContext} from "../services/authContext.jsx";

const TripView = () => {
   const { trips } = useContext(AuthContext);
   const {id} = useParams()
   const [trip, setTrip] = useState()

   useEffect(() => {
      if (trips) {
         const current = trips.filter(trip => trip._id == id)
         current[0].startDate = current[0].startDate.slice(0,10)
         current[0].endDate = current[0].endDate.slice(0,10)
         setTrip(current[0])
      }
   }, [trips])

   useEffect(() => console.log(trip), [trip])

   if(!trip) {
      return <div>Loading user Info...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page trips'>
               <div className='page-title'>{trip.name}</div>
               <div className='body-container'>
                  <div className='trip-body'>
                     <h2>{trip.destination}</h2>
                     <h4>From: {trip.startDate}</h4>
                     <h4>To: {trip.endDate}</h4>

                     {/* <div className='page-subtitle'>Trip Lists:</div>
                     {lists.length ? lists.map((list, i) => <DisplayList key={`list-${i}`} list={list} />) : <p>None</p>} */}
                  </div>
                  <ReturnEdit />
               </div>
            </div>
         </div>
      );
   }
};

export default TripView;
