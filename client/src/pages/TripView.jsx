import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { DisplayList } from '../components/DisplayBoxes';
import ReturnEdit from '../components/ReturnEdit';
import { getTripsById } from '../services/tripsApi';
import {AuthContext} from "../services/authContext.jsx";

const TripView = () => {
   const { user, token } = useContext(AuthContext);
   const {id, userId} = useParams()

   const [trip, setTrip] = useState([])

   useEffect(() => {
      fetchTrip();
   }, [user, token]);

   const fetchTrip = async () => {
      try {
         const TripData = await getTripsById(id,userId,token);
         setTrip(TripData);
      } catch (error) {
         console.log('error in fetchTrip');
      }
   };
   useEffect(() => console.log(trip),[trip])

   return (
      <div className='page-inner'>
         <div className='page trips'>
         {/* <div className='page-title'>Trip to Nowhere</div> */}
            <div className='page-title'>{trip.name}</div>
            <div className='body-container'>
               <div className='trip-body'>
                  <h2>{trip.destination}</h2>
                  <h4>From: {trip.startDate}</h4>
                  <h4>To: {trip.endDate}</h4>
                  {/* <h4>From: {trip.startDate.slice(0,10)}</h4> */}
                  {/* <h4>To: {trip.endDate.slice(0,10)}</h4> */}

                  {/* <div className='page-subtitle'>Trip Lists:</div>
                  {lists.length ? lists.map((list, i) => <DisplayList key={`list-${i}`} list={list} />) : <p>None</p>} */}
               </div>
               {/* <ReturnEdit /> */}
            </div>
         </div>
      </div>
   );
};

export default TripView;
