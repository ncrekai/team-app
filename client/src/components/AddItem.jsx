import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {AuthContext} from "../services/authContext.jsx";
import { EditItemText, EditRadioSelect } from './EditItem.jsx';
import axios from 'axios';

const AddItem = ({ setAddItem, tripId }) => {
   const { token } = useContext(AuthContext);
   const [newItemData, setNewItemData] = useState([])
   const listId = useParams().id

   const handleInput = (name, value) => {
      setNewItemData(curr => ({ ...curr, [name]: value }));
   };

   const handleRadio = (e) => {
      // e.preventDefault()
      handleInput('type', e.target.value)
   }

   const clearClose = () => {
      let inputs = document.querySelectorAll('input');
      inputs.forEach((el, i) => {
         if (el.type == 'text') el.value = ''
         else if (el.type == 'radio') el.checked = false
      });
      setAddItem(false)
   }

   // Add an item to a specific wishlist. (POST)
   // router.post('/:wishlistId/items', authMiddleware, wishlistController.addWishlistItem);

   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload
      const updatedData = newItemData;
      const response = await axios.post(`http://localhost:8080/wishlists/${listId}/items`, updatedData, {
         params: {wishlistId: listId}, 
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },})
        setAddItem(false)
      return response.data;
   };

   return (
      <div className='add-item-container'>
         <EditItemText name='name' val={null} display='Name' required={true} handleInput={handleInput} />
         <EditItemText name='description' val={null} display='Description' required={false} handleInput={handleInput} />
         <div className='input-container'>
            <div className='input-label'>Type of Location:</div>
            <span className='required'>*</span>
            <div className='radio-display wide'>
               { ['landmark', 'activity', 'restaurant', 'hotel'].map((el, i) => {
                  return (
                     <div key={`radio-${i}`}>
                        <input name='type' onChange={handleRadio} type='radio' value={el} id={`radio-${i}`} />
                        <label htmlFor={`radio-${i}`}>{el}</label>
                     </div>
                  );
               })}
               <div>
                  <input name='type' onChange={handleRadio} type='radio' value='other' id='radio-none' />
                  <label htmlFor='radio-none'>other</label>
               </div>
            </div>
         </div>
         <div className='input-container wide'>
            <input onClick={handleSubmit} className='button' type='button' value='✔' />
            <input onClick={() => clearClose()} className='button' type='button' value='✖' />
         </div>
      </div>
   )
}
export default AddItem

// const { name, val, display, handleInput } = props;
