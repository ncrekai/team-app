import { useParams } from 'react-router-dom';

const TripView = () => {
  const routeParams = useParams()
  console.log(routeParams)
    return (
      <div id='dashboard' className='page-outer'>
        <div className='page-inner'>
            <div className='trips'>
                <div className='page-title'>My Trips</div>
                <div className='trip-container'></div>
            </div>
        </div>
      </div>
    );
  };
  export default TripView;
  