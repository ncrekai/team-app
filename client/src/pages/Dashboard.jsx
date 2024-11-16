import { useOutletContext, Link, generatePath } from 'react-router-dom';
import { DisplayTrip, DisplayList, DisplayProfile } from '../components/DisplayBoxes';

import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../services/authContext.jsx";
import {getProfile} from "../services/profileApi.jsx";
import {getUserTrips} from '../services/tripsApi.jsx';
import {getUserLists} from '../services/listsApi.jsx'

const Dashboard = () => {
   const { user, token } = useContext(AuthContext);
   const [profile, setProfile] = useState(null);
   const [userTrips, setUserTrips] = useState(null)
   const [userLists, setUserLists] = useState(null)

   useEffect(() => {
      const fetchProfile = async () => {
         try {
            const profileData = await getProfile(user.userId, token);
            setProfile(profileData);
         } catch (error) {
            console.log('error in fetchProfile');
         }
      };
      fetchProfile();
   }, [user, token]);

   useEffect(() => {
      fetchTrips()
      fetchLists()
   }, [profile])

   const fetchTrips = async () => {
      try {
         const tripData = await getUserTrips(user.userId, token)
         const trips = await tripData.filter(trip => trip.createdBy == user.userId)
         setUserTrips(trips)
      } catch {
         console.log('error in fetchTrips');
      }
   }

   const fetchLists = async () => {
      try {
         const lists = await getUserLists(user.userId, token)
         const allLists = lists.generalWishlist.concat(lists.tripWishlist)
         setUserLists(allLists)
      } catch {
         console.log('error in fetchList');
      }
   }

   if (profile) {
      return (
         <div className='page-inner'>
            <div className='page dashboard'>
               <div className='dashboard-container'>
                  <div className='page-title'>Welcome {profile.user.name}</div>
                  <h3>My Trips</h3>
                  { userTrips ? userTrips.map((trip,i) => <DashboardTrip key={i} user={user.userId} trip={trip}/>) : 'No Trips'}
                  <h3>My Wishlist</h3>
                  { userLists ? userLists.map((list,i) => <DashboardList key={i} user={user.userId} list={list}/>) : 'No Lists'}
               </div>
            </div>
         </div>
      );
   } else {
      return (
         <div className='page-inner'>
            <div className='page dashboard'>
               <div className='dashboard-container'>
                  <div className='page-title'>Profile Not Loaded</div>
               </div>
            </div>
         </div>
      );
   }

};

export default Dashboard;

const DashboardTrip = ({ user, trip }) => {
   const formatStart = trip.startDate.slice(0,10)
   const formatEnd = trip.endDate.slice(0,10)

   const path = generatePath('../user/:id/:entity/:entityId', {
      id: user,
      entity: 'trips',
      entityId: trip._id
    })

   return (
      <div className='dashboard-display'>
         <div>Trip: <Link to={path}>{trip.name}</Link></div>
         <div>{formatStart} - {formatEnd}</div>
      </div>
   )
 }
const DashboardList = ({ user, list }) => {
   const path = generatePath('../user/:id/:entity/:entityId', {
      id: user,
      entity: 'wishlists',
      entityId: list._id
    })
   return (
     <div className='dashboard-display'>
       <div><Link to={path}>{list.name}</Link></div>
     </div>
   )
 }