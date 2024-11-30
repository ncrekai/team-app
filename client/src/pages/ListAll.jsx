import { useParams, generatePath, Link } from 'react-router-dom';
import { useContext } from 'react';
// import { DisplayList } from '../components/DisplayBoxes';
import { AuthContext } from '../services/authContext';

const ListAll = () => {
   const { user } = useContext(AuthContext);
   const id = useParams().userId;

   const path = generatePath('../user/:id/wishlists/new', {
      id: id,
    })

   if(!user) {
      return <div>Loading user trips...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>All My Lists</div>
               <div className='body-container'>
                  {[...user.tripWishlist, ...user.generalWishlist].map((list, i) => (
                     <DisplayList key={`list-${i}`} user={id} list={list} />
                  ))}
                  <Link to={path}>Add New List</Link>
               </div>
            </div>
         </div>
      ); 
   }
};

export default ListAll;

const DisplayList = ({ user, list }) => {
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