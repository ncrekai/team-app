import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EditItemText, EditItemSelect } from '../components/EditItem';

const ListEdit = () => {
   const navigate = useNavigate();
   const id = useParams().id;
   const lists = useOutletContext().lists
   const listIndex = lists.findIndex((arr) => arr.id == id);
   const list = lists[listIndex];

   const trips = useOutletContext().trips;

   const [newListData, setNewListData] = useState({});

   useEffect(() => console.log(newListData), [newListData]);

   const handleInput = (name, value) => {
      setNewListData({ ...newListData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      const updatedData = { ...list, ...newListData };
      const jsonBody = JSON.stringify(updatedData);
      console.log(jsonBody);
      navigate('/dashboard');
   };

   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>Edit List</div>
            <form className='form-container' onSubmit={handleSubmit}>
              <EditItemText name='name' val={list.name} display='List Name' handleInput={handleInput} />
              <EditItemSelect name='trip' val={trips} current={list.trip} display='Linked Trips' 
                multiple={false} handleInput={handleInput} />
                <p>(Editing / creating list locations is not built yet)</p>
               <div className='input-container'>
                  <input className='button' type='submit' value='Submit' />
               </div>
            </form>
         </div>
      </div>
   );
};

export default ListEdit;