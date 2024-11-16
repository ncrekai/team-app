import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { DisplayList } from '../components/DisplayBoxes';
import { AuthContext } from '../services/authContext';
import {getUserLists} from '../services/listsApi.jsx'

const ListAll = () => {
   const { user, token } = useContext(AuthContext);
   const [userLists, setUserLists] = useState(null)
   const id = useParams().userId;
   console.log(id)

   useEffect(() => {
      fetchLists();
   }, [user, token]);


   const fetchLists = async () => {
      try {
         const lists = await getUserLists(user.userId, token)
         const allLists = lists.generalWishlist.concat(lists.tripWishlist)
         setUserLists(allLists)
      } catch {
         console.log('error in fetchLists');
      }
   }

   useEffect(() => console.log(userLists), [userLists])
   if (userLists) {


   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>All My Lists</div>
            <div className='body-container'>
               {userLists.map((list, i) => (
                  <DisplayList key={`list-${i}`} user={id} list={list} />
               ))}
            </div>
         </div>
      </div>
   );
}
};

export default ListAll;
