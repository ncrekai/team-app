import { useState, useEffect } from 'react';
import { getDayIn, getDayOut } from '../helpfulFunctions';

export const EditItemDate = (props) => {
   const { name, val, display, handleInput } = props;

   const handleDate = (e) => {
      const formattedDate = getDayOut(e.target.value);
      handleInput(e.target.name, formattedDate);
   };

   const date = getDayIn(val);

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

export const EditItemSelect = (props) => {
   const { name, val, current, display, multiple, handleInput } = props;

   const [selectedArr, setSelectedArr] = useState(Array.isArray(current) ? current : null);

   useEffect(() => {
      if (!isSame) handleInput(name, selectedArr);
   }, [selectedArr]);

   const isSame = Array.isArray(current)
      ? current.length === selectedArr.length && current.every((el, i) => el == selectedArr[i]) : true;

   const handleRadioSelect = (e) => {
      const { name, value } = e.target;
      value == '' ? handleInput(name, null) : handleInput(name, parseInt(value));
   };

   const handleCheckSelect = (e) => {
      const id = parseInt(e.target.value);
      if (selectedArr.includes(id)) setSelectedArr(curr => curr.filter((el) => el !== id));
      else setSelectedArr(curr => [...curr, id]);
   };

   const displayCheckBox = (arr) => {
      const names = arr.map((el, i) => {
         return (
            <div key={`check-${i}`}>
               <input type='checkbox' id={`check-${i}`} value={el.id} defaultChecked={false} />
               <label htmlFor={`check-${i}`}>{el.name}</label>
            </div>
         );
      });
      return <div className='checkbox-display'>{names}</div>;
   };

   const displayRadio = (arr) => {
      let names = arr.map((el, i) => {
         return (
            <div key={`radio-${i}`}>
               <input type='radio' name={name} value={el.id} id={`radio-${i}`} defaultChecked />
               <label htmlFor={`radio-${i}`}>{el.name}</label>
            </div>
         );
      });
      return (
         <div className='radio-display'>
            <div>
               <input type='radio' name={name} value={undefined} id='radio-none' defaultChecked />
               <label htmlFor='radio-none'>No related trip</label>
            </div>
            {names}
         </div>
      );
   };

   useEffect(() => {
      if (multiple) {
         let inputs = document.querySelectorAll('input[type=checkbox]');
         inputs.forEach((el) => {
            el.addEventListener('click', handleCheckSelect);
            if (current.some((e) => e == el.value)) el.checked = true;
         });
      } else {
         let inputs = document.querySelectorAll('input[type=radio]');
         inputs.forEach((el, i) => {
            el.addEventListener('click', handleRadioSelect);
            if (i === 0) {
               if (current == null) el.checked = true;
            } else {
               if (current == el.value) el.checked = true;
            }
         });
      }
   }, []);

   return (
      <div className='input-container'>
         <div className='input-label'>{display}:</div>
         {multiple ? displayCheckBox(val) : displayRadio(val)}
         {multiple && <span className='required'>Optional. Can select multiple</span>}
      </div>
   );
};
