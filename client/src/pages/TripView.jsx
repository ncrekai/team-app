import { useParams, Link, generatePath } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ReturnEdit from '../components/ReturnEdit';
import {AuthContext} from "../services/authContext.jsx";

const TripView = () => {
   const { user } = useContext(AuthContext);
   const {id} = useParams()
   const [trip, setTrip] = useState()
   const [lists, setLists] = useState([])

   useEffect(() => {
      if (user) {
         const current = user.trips.filter(trip => trip._id == id)
         current[0].startDate = current[0].startDate.slice(0,10)
         current[0].endDate = current[0].endDate.slice(0,10)
         setTrip(current[0])
      }
   }, [user])

   useEffect(() => {
      if (trip && trip.tripWishlist.length) {
         const tripLists = []
         trip.tripWishlist.forEach(id => {
            user.tripWishlist.filter(el => {
               if (el._id === id) tripLists.push(el)
            })
         })
         setLists(tripLists)
      }
   }, [trip])

   useEffect(() => {
      if (lists && lists.length) console.log(lists)
   }, [lists])

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
                     {/* { lists.length ? } */}
                     <div className='page-subtitle'>Trip Lists:</div>
                     {lists.length ? lists.map((list, i) => <TripListDisplay key={`list-${i}`} id={user._id} list={list} />) : <p>None</p>}
                  </div>
                  <ReturnEdit />
               </div>
            </div>
         </div>
      );
   }
};

const TripListDisplay = ({ id, list }) => {

     const path = generatePath('../user/:id/:entity/:entityId', {
     id: id,
     entity: 'wishlists',
     entityId: list._id
   })

   return (
      <div className='dashboard-display'>
         <div><Link to={path}>{list.name}</Link></div>
      </div>
   )
}

export default TripView;
