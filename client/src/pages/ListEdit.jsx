import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {AuthContext} from "../services/authContext.jsx";
import { EditItemText, EditRadioSelect } from '../components/EditItem';
import axios from 'axios';

const ListEdit = () => {
   const { user, token } = useContext(AuthContext);
   const { id } = useParams()
   const navigate = useNavigate();

  const [list, setList] = useState(null)
  const [newListData, setNewListData] = useState({});


  useEffect(() => {
    if (user) {
      let allLists = [...user.generalWishlist, ...user.tripWishlist]
      let current = allLists.find(el => el._id == id)
      setList(current)
    }
   }, [user]);

   useEffect(() => console.log(newListData), [newListData]);

   const handleInput = (name, value) => {
      setNewListData(curr => ({ ...curr, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload
      const updatedData = { ...list, ...newListData };
      const response = await axios.put(`http://localhost:8080/wishlists/${id}`, updatedData, {
         params: {wishlistId: id}, 
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },})
        navigate('/dashboard')
      return response.data;
   };

  if (!list) {
    return (
         <div>Loading list Info...</div>
    )
  } else {
   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>Edit List</div>
            <form className='form-container' onSubmit={handleSubmit}>
              <EditItemText name='name' val={list.name} display='List Name' required={true} handleInput={handleInput} />
              <EditRadioSelect name='trip' id={id} type={list.type} list={user.trips} display='Linked Trips' required={true} handleInput={handleInput} nullLabel='No related trip' />
               <div className='input-container'>
                  <input className='button' type='submit' value='Submit' />
               </div>
            </form>
         </div>
      </div>
   );
}
};

export default ListEdit;