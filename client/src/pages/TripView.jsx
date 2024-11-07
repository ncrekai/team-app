import { useParams, useOutletContext, Link } from 'react-router-dom';
import { DisplayList } from '../components/DisplayBoxes';
import ReturnEdit from '../components/ReturnEdit';

const TripView = () => {
   const id = useParams().id;
   const trip = useOutletContext().trips[id - 1];
   const lists = useOutletContext().lists.filter((list) => list.trip == id);

   return (
      <div className='page-inner'>
         <div className='page trips'>
            <div className='page-title'>Trip to {trip.name}</div>
            <div className='body-container'>
               <div className='trip-body'>
                  <h4>From: {trip.startDate}</h4>
                  <h4>To: {trip.endDate}</h4>
                  <div className='page-subtitle'>Trip Lists:</div>
                  {lists.length ? lists.map((list, i) => <DisplayList key={`list-${i}`} list={list} />) : <p>None</p>}
               </div>
               <ReturnEdit />
            </div>
         </div>
      </div>
   );
};

export default TripView;
