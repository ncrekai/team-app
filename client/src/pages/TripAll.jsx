import { useParams, useOutletContext } from 'react-router-dom';
import { DisplayTrip } from '../components/DisplayBoxes';

const TripAll = () => {
   const id = useParams().id;
   const trips = useOutletContext().trips;

   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>All My Trips</div>
            <div className='body-container'>
               {trips.map((trip, i) => (
                  <DisplayTrip key={`trip-${i}`} trip={trip} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default TripAll;
