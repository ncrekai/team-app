import { useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { EditItemText, EditRadioSelect } from '../components/EditItem';

const ListNew = () => {
   const navigate = useNavigate();
   const id = useParams().id;
   const trips = useOutletContext().trips;

   const [listData, setListData] = useState({ id: null, user: id, name: '', trip: null, locations: [] });

   const handleInput = (name, value) => {
      setListData({ ...listData, [name]: value });
   };

   useEffect(() => console.log(listData), [listData]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      // const updatedData = { ...trip, ...newTripData };
      const jsonBody = JSON.stringify(listData);
      console.log(jsonBody);
      navigate('/dashboard');
   };
   
   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>New List</div>
            <form className='form-container' onSubmit={handleSubmit}>
              <EditItemText name='name' val='' display='List Name' handleInput={handleInput} />
              <EditRadioSelect name='trip' val={trips} current={null} display='Linked Trip' 
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

export default ListNew;