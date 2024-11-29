import { useState, useEffect } from 'react';
import { getDayIn, getDayOut } from '../helpfulFunctions';

export const EditItemDate = (props) => {
   const { name, date, display, handleInput } = props;

   const handleDate = (e) => {
      const formattedDate = e.target.value;
      handleInput(e.target.name, formattedDate);
   };

   return (
      <div className='input-container'>
         <div className='input-label'>{display}:</div>
         <input required className='input-text' id={name} name={name} type='date' 
            onChange={handleDate} defaultValue={date} />
         <span className='required'>*</span>
      </div>
   );
};

export const EditItemText = (props) => {
   const { name, val, display, handleInput } = props;

   const handleText = (e) => {
      handleInput(e.target.name, e.target.value)
   }

   return (
      <div className='input-container'>
         <div className='input-label'>{display}:</div>
         <input onFocus={(e) => (e.target.value = '')} className='input-text' id={name} name={name} type='text' 
            onChange={handleText} defaultValue={val} required
         />
         <span className='required'>*</span>
      </div>
   );
};

export const EditChecklistSelect = (props) => {
   const { lists, current, display, handleInput } = props;
   const [selectedArr, setSelectedArr] = useState(current);

   // Add handleSelect to checkboxes / default checked for Lists already connected to Trip
   useEffect(() => {
      let inputs = document.querySelectorAll('input[type=checkbox]');
      inputs.forEach((el) => {
         el.addEventListener('click', handleSelect);
         if (current.some((e) => e == el.value)) el.checked = true;
      });
   }, []);

   // Call handleInput when selectedArr updates - calls setUpdatedTrip in TripEdit
   useEffect(() => {
      handleInput('tripWishlist', selectedArr);
   }, [selectedArr]);
   
   // Whenever a checkbox is selected, iterate through input and updates selectedArr
   const handleSelect = (e) => {
      let inputs = document.querySelectorAll('input[type=checkbox]');
      const currentSelected = []
      inputs.forEach((el) => {
         if (el.checked) currentSelected.push(el.value)
      });
      setSelectedArr(currentSelected)
   };

   return (
      <div className='input-container'>
         <div className='input-label'>{display}:</div>
         <div className='checkbox-display'>
            { lists.map((el, i) => {
               return (
                  <div key={`check-${i}`}>
                     <input type='checkbox' id={`check-${i}`} value={el._id} defaultChecked={false} />
                     <label htmlFor={`check-${i}`}>{el.name}</label>
                  </div>
               )}) }
         </div>
         <span className='required'>Optional. Can select multiple</span>
      </div>
   );
};


export const EditRadioSelect = (props) => {
   const { name, id, type, trips, display, handleInput } = props;

   const [currentSelect, setCurrentSelect] = useState(null)

   useEffect(() => {
      if (type === 'trip') {
         let curr
         trips.forEach(trip => { 
            if (trip.tripWishlist.includes(id)) curr = trip._id
         })
         setCurrentSelect(curr)
      }
   },[])

   useEffect(() => {
      let inputs = document.querySelectorAll('input[type=radio]');
         inputs.forEach((el, i) => {
            el.addEventListener('click', handleRadioSelect);
         });
   }, []);

      useEffect(() => {
      let inputs = document.querySelectorAll('input[type=radio]');
         inputs.forEach((el, i) => {
            if (i === 0) {
               if (currentSelect == null) el.checked = true;
            } else {
               if (currentSelect == el.value) el.checked = true;
            }
         });
   }, [currentSelect]);

   const handleRadioSelect = (e) => {
      e.target.value == '' ? handleInput('tripId', null) : handleInput('tripId', e.target.value);
   };

   { trips.map((el, i) => {
      return (
         <div key={`radio-${i}`}>
            <input type='radio' name={name} value={el._id} id={`radio-${i}`} defaultChecked />
            <label htmlFor={`radio-${i}`}>{el.name}</label>
         </div>
      );
   })}

   return (
      <div className='input-container'>
         <div className='input-label'>{display}:</div>
         <div className='radio-display'>
            <div>
               <input type='radio' name={name} value={undefined} id='radio-none' defaultChecked />
               <label htmlFor='radio-none'>No related trip</label>
            </div>
            { trips.map((el, i) => {
               return (
                  <div key={`radio-${i}`}>
                     <input type='radio' name={name} value={el._id} id={`radio-${i}`} defaultChecked />
                     <label htmlFor={`radio-${i}`}>{el.name}</label>
                  </div>
               );
            })}
         </div>
      </div>
   );
};