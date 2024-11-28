import { useParams, generatePath, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
// import { DisplayTrip } from '../components/DisplayBoxes';
import { AuthContext } from '../services/authContext';
import {getUserTrips} from '../services/tripsApi.jsx'

const TripAll = () => {
   const { user, token, trips } = useContext(AuthContext);
   const [userTrips, setUserTrips] = useState(null)
   const id = useParams().userId;

 

   if(!trips) {
      return <div>Loading user Info...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>All Saved Trips</div>
               <div className='body-container'>
                  {trips.map((trip, i) => <DisplayTrip key={`trip-${i}`} user={id} trip={trip} />)}
               </div>
            </div>
         </div>
      );
   }
};

export default TripAll;

const DisplayTrip = ({ user, trip }) => {
   // console.log(user)
   // console.log(trip.name)
   const path = generatePath('../user/:id/trips/:tripid', {
     id: user,
     tripid: trip._id
   })
   return (
     <div className='dashboard-display'>
       <div>Trip: <Link to={path}>{trip.name}</Link></div>
       <div>From: {trip.startDate.slice(0,10)}</div>
       <div>To: {trip.endDate.slice(0,10)}</div>
     </div>
   )
 }