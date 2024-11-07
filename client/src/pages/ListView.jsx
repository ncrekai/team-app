import { useParams, useOutletContext } from 'react-router-dom';
import ReturnEdit from '../components/ReturnEdit';

const ListView = () => {
  const id = useParams().id;
  const lists = useOutletContext().lists
  const listIndex = lists.findIndex((arr) => arr.id == id);
  const list = lists[listIndex]
  
  const locationList = []
  list.locations.forEach((el,i) => locationList.push(<div key={`place-${i}`}>{el}</div>))

  return (
        <div className='page-inner'>
            <div className='page lists'>
              <div className='page-title'>{list.name}</div>
              <div className='body-container'>
                <div className='location-list'>{locationList}</div>
                <ReturnEdit />
            </div>
            </div>
        </div>
  );
}

export default ListView;