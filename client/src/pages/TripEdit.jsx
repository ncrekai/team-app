import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EditItemText, EditItemDate, EditItemSelect } from '../components/EditItem';

const TripEdit = () => {
   const navigate = useNavigate();
   const id = useParams().id;
   const trips = useOutletContext().trips;
   const tripIndex = trips.findIndex((arr) => arr.id == id);
   const trip = trips[tripIndex];
   const lists = useOutletContext().lists;

   const [newTripData, setNewTripData] = useState({});

   const handleInput = (name, value) => {
      setNewTripData({ ...newTripData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('...pretending to send to api...');
      const updatedData = { ...trip, ...newTripData };
      const jsonBody = JSON.stringify(updatedData);
      console.log(jsonBody);
      navigate('/dashboard');
   };

   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>Edit Trip</div>
            <form className='form-container' onSubmit={handleSubmit}>
              <EditItemText name='name' val={trip.name} display='Place' handleInput={handleInput} />
              <EditItemDate name='startDate' val={trip.startDate} display='Start Date' handleInput={handleInput} />
              <EditItemDate name='endDate' val={trip.endDate} display='End Date' handleInput={handleInput} />
              <EditItemSelect name='lists' val={lists} current={trip.lists} display='Linked Lists' 
                multiple={true} handleInput={handleInput} />
               <div className='input-container'>
                  <input className='button' type='submit' value='Submit' />
               </div>
            </form>
         </div>
      </div>
   );
};

export default TripEdit;