import { useParams, useNavigate } from 'react-router-dom';
import { FormGroup, FormControlLabel, Checkbox, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../services/authContext.jsx';
import { EditItemText, EditRadioSelect } from '../components/EditItem';
import AddItem from '../components/AddItem.jsx';
import axios from 'axios';

const ListEdit = () => {
   const { user, token } = useContext(AuthContext);
   const { id } = useParams();
   const navigate = useNavigate();

   const [list, setList] = useState(null);
   const [newListData, setNewListData] = useState({});
   const [addItem, setAddItem] = useState(false);

   useEffect(() => {
      if (user) {
         let allLists = [...user.generalWishlist, ...user.tripWishlist];
         let current = allLists.find((el) => el._id == id);
         setList(current);
      }
   }, [user]);

   useEffect(() => {
      if (newListData.items)
      setList((curr) => ({...curr, items: newListData.items}))
   }, [newListData])

   const handleAdd = (e) => {
      e.preventDefault();
      setAddItem(true);
   };

   const handleInput = (name, value, index) => {
      setNewListData((curr) => {
         if (name == 'tripId') {
            return { ...curr, [name]: value, type: value ? 'trip' : 'general' };
         } else if (name == 'items' && index) {
            let newItems = curr.items ? [...curr.items] : [...list.items]
            if (value) newItems[index] = value
            else newItems.splice(index, 1)
            return { ...curr, [name]: newItems };
         } else if (name == 'items') {
            let newItems = curr.items ? [...curr.items] : [...list.items]
            newItems.push(value)
            return { ...curr, [name]: newItems };
         } else {
            return { ...curr, [name]: value };
         }
      });
   };
   // const { name, items, type, tripId } = req.body;
   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page reload
      const updatedData = { ...list, ...newListData };
      console.log(updatedData)
      // const response = await axios.put(`http://localhost:8080/wishlists/${id}`, updatedData, {
      //    params: { wishlistId: id },
      //    headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //    },
      // });
      // navigate('/dashboard');
      // return response.data;
   };

   const handleNewItem = (val) => {
      setAddItem(false)
      handleInput('items', val)
   }

   if (!list) {
      return <div>Loading list Info...</div>;
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>Edit List</div>
               <form className='form-container'>
                  <EditItemText name='name' val={list.name} display='List Name' required={true} handleInput={handleInput} />
                  <div className='location-list'>
                     {list.items.map((item, i) => (
                        <ListItem key={`list-item-${i}`} index={i} item={item} handleInput={handleInput} />
                     ))}
                  </div>

                  {addItem ? (
                     <AddItem setAddItem={setAddItem} item={null} tripId={null} handleSubmit={handleNewItem}/>
                  ) : (
                     <div className='input-container'>
                        <Button colour='primary' onClick={handleAdd} variant='outlined' startIcon={<AddIcon />}>Add to List</Button>
                     </div>
                  )}

                  <EditRadioSelect name='trip' id={id} type={list.type} list={user.trips} display='Linked Trips' required={true} handleInput={handleInput} nullLabel='No related trip'/>
                  <div className='input-container'>
                     <Button onClick={handleSubmit} color='success' variant='contained'>Submit</Button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
};

export default ListEdit;

const ListItem = ({ index, item, handleInput}) => {
   const [editItem, setEditItem] = useState(false)
   
   const handleEdit = (e) => {
      e.preventDefault();
      setEditItem(true);
   };

   const handleUpdate = (val) => {
      setEditItem(false)
      handleInput('items', {...item, ...val}, index)
   }

   const handleDelete = (e) => {
      e.preventDefault
      handleInput('items', null, index)
   }

   const handleCheck = (e) => {
      e.preventDefault
      const itemCopy = {...item}
      itemCopy.status = e.target.checked ? 'completed' : 'pending'
      handleInput('items', itemCopy, index)
   }

   if (editItem) {
      return <AddItem setAddItem={setEditItem} item={item} tripId={null} handleSubmit={handleUpdate} />
   } else {
      return (
         <div className='display-list-container'>
            <div className='display-list'>
               <div>{item.name}</div>
               <div>{item.description}</div>
            </div>
            <FormGroup row={true}>
               <IconButton onClick={handleEdit} aria-label='edit' size='medium'>
                  <EditIcon fontSize='inherit' />
               </IconButton>
               <IconButton onClick={handleDelete} aria-label='delete' size='medium'>
                  <DeleteIcon fontSize='inherit' />
               </IconButton>
               <FormControlLabel control={<Checkbox onClick={handleCheck} checked={item.status == 'completed'} />} label='Complete' />
            </FormGroup>
         </div>
      );
   }
};
