import { useParams, useOutletContext } from 'react-router-dom';
import { DisplayList } from '../components/DisplayBoxes';

const ListAll = () => {
   const id = useParams().id;
   const lists = useOutletContext().lists;

   return (
      <div className='page-inner'>
         <div className='page lists'>
            <div className='page-title'>All My Lists</div>
            <div className='body-container'>
               {lists.map((list, i) => (
                  <DisplayList key={`list-${i}`} list={list} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default ListAll;
