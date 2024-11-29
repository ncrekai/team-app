import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import {AuthContext} from "../services/authContext.jsx";
import ReturnEdit from '../components/ReturnEdit';
import AddItem from '../components/AddItem.jsx';



/*
import landmark from '../assets/003-landmark.png';
import activity from '../assets/004-hiking.png';
import restaurant from '../assets/002-restaurant.png';
import hotel from '../assets/001-reception.png';
import other from '../assets/005-map.png';
*/
const ListView = () => {

  const { user } = useContext(AuthContext);
  const {id, userId} = useParams()

  const [list, setList] = useState(null)
  const [addItem, setAddItem] = useState(false)
  const tripRef = useRef(null)

  const getListTrip = () => {
    user.trips.forEach(trip => { 
      if (trip.tripWishlist.includes(id)) tripRef.current = trip._id
   })
  }

  useEffect(() => {
    if (user) {
      getListTrip()
      let allLists = [...user.generalWishlist, ...user.tripWishlist]
      let current = allLists.filter(el => el._id == id)
      setList(current[0])
    }
 }, [user]);

 const handleAdd = (e) => {
  e.preventDefault();
  setAddItem(true)
 }

  if (!list) {
    return (
         <div>Loading list Info...</div>
    )
  } else {
    return (
      <div className='page-inner'>
            <div className='page lists'>
              <div className='page-title'>{list.name}</div>
              <div className='body-container'>
                <div className='location-list'>
                  {list.items.map((item,i) => <ListItem key={`list-item-${i}`} item={item}/> )}
                </div>
                { addItem ? <AddItem setAddItem={setAddItem} tripId={tripRef.current}/> :
                  <div className='input-container'>
                    <input onClick={handleAdd} className='button' type='submit' value='Add to List' />
                  </div> }
                { addItem ? null : <ReturnEdit />}
            </div>
            </div>
        </div>
    )
  }
}

export default ListView;

const ListItem = ({ item }) => {
  
  return (
    <div className='list-items'>
      <div>{item.name}</div>
      <div>{item.description}</div>
      {/* <div className='list-icon'><img src={item.type}/></div> */}
    </div>
  )
}