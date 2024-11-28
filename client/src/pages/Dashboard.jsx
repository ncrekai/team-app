import { Link, generatePath } from 'react-router-dom';

import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../services/authContext.jsx";


const Dashboard = () => {
   const { user, token } = useContext(AuthContext);

   const [loading, setLoading] = useState(true);

   useEffect(() => {
<<<<<<< HEAD
      setLoading(false)
      if (user) console.log(user)
=======
      const fetchUserTrips = async () => {
         try {
            // Wait until the user and token are fetched
            if(!user || !token) return;

            const tripsData = await getUserTrips(token);
            setUserTrips(tripsData);
         } catch {
            console.log('error in fetchTrips');
         } finally {
            setLoading(false)
         }
      };
      fetchUserTrips();
>>>>>>> part-4
   }, [user, token])


   if(!user || loading) {
      return <div>Loading user Info...</div>
   } else {
      return (
          <div className='page-inner'>
             <div className='page dashboard'>
                <div className='dashboard-container'>
                   <div className='page-title'>Welcome {user.name}</div>
                   <h3>My Trips</h3>
                   { user.trips && user.trips.length ? (
                       user.trips.map((trip,i) => {
                          return <DashboardTrip key={i} userId={user._id} trip={trip} lists={trip.tripWishlist.length ? user.tripWishlist : null} />
                       })) : <p>No Trips</p>
                   }
                   <h3>My General Wishlists</h3>
                   { user.generalWishlist && user.generalWishlist.length ? (
                       user.generalWishlist.map((list,i) => {
                          return <DashboardList key={i} userId={user._id} list={list} />
                       })) : <p>No General Wishlists</p>
                   }
                </div>
             </div>
          </div>
      );
   }
};

export default Dashboard;

const DashboardTrip = ({ userId, trip, lists }) => {
   const formatStart = trip.startDate.slice(0,10)
   const formatEnd = trip.endDate.slice(0,10)

   const tripLists = []

   trip.tripWishlist.forEach(listId => {
      lists.filter(el => {
         if (el._id === listId) tripLists.push(el);
      })
   })

   const tripPath = generatePath('../user/:id/:entity/:entityId', {
      id: userId,
      entity: 'trips',
      entityId: trip._id
   })

   return (
       <div className='dashboard-display'>
          <div>Trip: <Link to={tripPath}>{trip.name}</Link></div>
          <div>{formatStart} - {formatEnd}</div>
          { tripLists.length ? tripLists.map((list,i) => {
            return <DashboardList key={i} userId={userId} list={list}/>
          }) : null }
       </div>
   )
}
const DashboardList = ({ userId, list }) => {
   
   const path = generatePath('../user/:id/:entity/:entityId', {
      id: userId,
      entity: 'wishlists',
      entityId: list._id
   })

   return (
       <div className='dashboard-display'>
          <div><Link to={path}>{list.name}</Link></div>
          
       </div>
   )
}

//