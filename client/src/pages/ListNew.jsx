import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {AuthContext} from "../services/authContext.jsx";
import { EditItemText, EditRadioSelect } from '../components/EditItem';
import AddItem from '../components/AddItem'

const ListNew = () => {
   const { user } = useContext(AuthContext);
   const navigate = useNavigate();
   const id = useParams().userId;

   const [listData, setListData] = useState({ name:'', items:[], type: '' });
   const [addItem, setAddItem] = useState(false)

   useEffect(() => console.log(listData), [listData]);

   const handleAdd = (e) => {
      e.preventDefault();
      setAddItem(true)
     }

     const handleInput = (name, value) => {
      setListData(curr => {
         if (name == 'tripId') {
            return ({ ...curr, [name]: value, type: value ? 'trip' : 'general' })
         } else return ({ ...curr, [name]: value })
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      // const updatedData = { ...trip, ...newTripData };
      const jsonBody = JSON.stringify(listData);
      console.log(jsonBody);
      navigate('/dashboard');
   };
   if(!user) {
      return <div>Loading Page...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>New List</div>
               <form className='form-container' onSubmit={handleSubmit}>

               <EditItemText name='name' val='' display='List Name' required={true} handleInput={handleInput} />
               <EditRadioSelect name='trip' id={null} type={null} list={user.trips} display='Linked Trip' 
                  required={true} handleInput={handleInput} nullLabel='No related trip' />

                  { addItem ? <AddItem setAddItem={setAddItem} tripId={null}/> :
                  <div className='input-container'>
                    <input onClick={handleAdd} className='button' type='submit' value='Add to List' />
                  </div> }

                  <div className='input-container'>
                     <input className='button' type='submit' value='Submit' />
                  </div>
               </form>
               

            </div>
         </div>
      );
   }
};

export default ListNew;