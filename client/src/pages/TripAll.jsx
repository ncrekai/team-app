import { useParams, generatePath, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../services/authContext';

const TripAll = () => {
   const { user } = useContext(AuthContext);
   const id = useParams().userId;

   const path = generatePath('../user/:id/trips/new', {
      id: id,
    })

   if(!user) {
      return <div>Loading user trips...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>All Saved Trips</div>
               <div className='body-container'>
                  {user.trips.map((trip, i) => <DisplayTrip key={`trip-${i}`} user={id} trip={trip} />)}
                  <Link to={path}>Add New Trip</Link>
               </div>
            </div>
         </div>
      );
   }
};

export default TripAll;

const DisplayTrip = ({ user, trip }) => {
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