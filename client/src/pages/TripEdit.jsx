import { useParams } from 'react-router-dom';

const TripEdit = () => {
  const routeParams = useParams()
    console.log(routeParams)
    return (
      <div id='dashboard' className='page-outer'>
        <div className='page-inner'>
            <div className='lists'>
                    <div className='page-title'>Edit Trip</div>
                    <div className='list-container'></div>
            </div>
        </div>
      </div>
    );
  };
  export default TripEdit;
  