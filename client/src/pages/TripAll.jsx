import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { DisplayTrip } from '../components/DisplayBoxes';
import { AuthContext } from '../services/authContext';
import {getUserTrips} from '../services/tripsApi.jsx'

const TripAll = () => {
   const { user, token } = useContext(AuthContext);
   const [userTrips, setUserTrips] = useState(null)
   const id = useParams().userId;

   useEffect(() => {
      fetchTrips();
   }, [user, token]);

   const fetchTrips = async () => {
      try {
         const tripData = await getUserTrips(user.userId, token)
         const trips = await tripData.filter(trip => trip.createdBy == user.userId)
         setUserTrips(trips)
      } catch {
         console.log('error in fetchTrips');
      }
   }

   // useEffect(() => {
   //    if (userTrips) console.log(userTrips)
   // }, [userTrips])

   if (userTrips) {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>All My Trips</div>
               <div className='body-container'>
                  {userTrips.map((trip, i) => <DisplayTrip key={`trip-${i}`} user={id} trip={trip} />)}
               </div>
            </div>
         </div>
      );
   }
};

export default TripAll;
