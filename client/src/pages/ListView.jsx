import { useParams, useOutletContext } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {AuthContext} from "../services/authContext.jsx";
import ReturnEdit from '../components/ReturnEdit';
import { getListById } from '../services/listsApi.jsx'
/*
import landmark from '../assets/003-landmark.png';
import activity from '../assets/004-hiking.png';
import restaurant from '../assets/002-restaurant.png';
import hotel from '../assets/001-reception.png';
import other from '../assets/005-map.png';
*/
const ListView = () => {

  const { user, token } = useContext(AuthContext);
   const {id, userId} = useParams()

  const [list, setList] = useState(null)
  console.log(id, userId)

  useEffect(() => {
    fetchList();
 }, [user, token]);

 const fetchList = async () => {
    try {
       const ListData = await getListById(id,userId,token);
       setList(ListData.wishlist);
    } catch {
       console.log('error in fetchTrip');
    }
 };

  if (list) {
    return (
      <div className='page-inner'>
            <div className='page lists'>
              <div className='page-title'>{list.name}</div>
              <div className='body-container'>
              <div className='location-list'>
                {list.items.map((item,i) => <ListItem key={`list-item-${i}`} item={item}/> )}
                </div>
                {/* <ReturnEdit /> */}
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