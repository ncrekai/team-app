import { useOutletContext } from 'react-router-dom';
import { DisplayTrip, DisplayList, DisplayProfile } from '../components/DisplayBoxes';

const Dashboard = () => {

   const user = useOutletContext();
   
   console.log(user)
   return (
      <div className='page-inner'>
         <div className='page dashboard'>
            <div className='dashboard-container'>
               <div className='page-title'>Welcome {user.profile.fname}</div>
               <h3>My Trips</h3>
               {user.trips.map((trip, i) => (
                  <DisplayTrip key={`trip-${i}`} trip={trip} />
               ))}
               <h3>My Lists</h3>
               {user.lists.map((list, i) => (
                  <DisplayList key={`list-${i}`} list={list} />
               ))}
               <h3>My Profile</h3>
               <DisplayProfile userProfile={user.profile} />
            </div>
         </div>
      </div>
   );
   // if (user) {
   //    return (
   //       <div className='page-inner'>
   //          <div className='page dashboard'>
   //             <div className='dashboard-container'>
   //                <div className='page-title'>Welcome {user.profile.fname}</div>
   //                <h3>My Trips</h3>
   //                {user.trips.map((trip, i) => (
   //                   <DisplayTrip key={`trip-${i}`} trip={trip} />
   //                ))}
   //                <h3>My Lists</h3>
   //                {user.lists.map((list, i) => (
   //                   <DisplayList key={`list-${i}`} list={list} />
   //                ))}
   //                <h3>My Profile</h3>
   //                <DisplayProfile userProfile={user.profile} />
   //             </div>
   //          </div>
   //       </div>
   //    );
   // } else {
   //    return (
   //       <div className='page-inner'>
   //          <div className='page dashboard'>
   //             <div className='dashboard-container'>
   //                <div className='page-title'>Welcome to the Dashboard</div>
   //             </div>
   //          </div>
   //       </div>
   //    );
   // }
};

export default Dashboard;
