import { useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { EditItemText, EditItemDate, EditItemSelect } from '../components/EditItem';

const TripNew = () => {
   const navigate = useNavigate();
   const id = useParams().id;
   const lists = useOutletContext().lists;

   const dateToday = new Date()

   const [tripData, setTripData] = useState({ id: null, user: id, name: '', startDate: dateToday, endDate: '', lists: [] });

   const handleInput = (name, value) => {
      setTripData({ ...tripData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      // const updatedData = { ...trip, ...newTripData };
      const jsonBody = JSON.stringify(tripData);
      console.log(jsonBody);
      navigate('/dashboard');
   };
   
   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>New Trip</div>
            <form className='form-container' onSubmit={handleSubmit}>
              <EditItemText name='name' val='' display='Place' handleInput={handleInput} />
              <EditItemDate name='startDate' val={dateToday} display='Start Date' handleInput={handleInput} />
              <EditItemDate name='endDate' val={dateToday} display='End Date' handleInput={handleInput} />
              <EditItemSelect name='lists' val={lists} current={[]} display='Linked Lists' 
                multiple={true} handleInput={handleInput} />
               <div className='input-container'>
                  <input className='button' type='submit' value='Submit' />
               </div>
            </form>
         </div>
      </div>
   );
};
export default TripNew;
