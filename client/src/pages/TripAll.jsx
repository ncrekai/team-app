import { useParams} from "react-router-dom";
    
const TripAll = () => {
  const routeParams = useParams()
    console.log(routeParams)
    return (
      <div id='dashboard' className='page-outer'>
        <div className='page-inner'>
            <div className='lists'>
                    <div className='page-title'>My Lists</div>
                    <div className='list-container'></div>
            </div>
        </div>
      </div>
    );
  };

export default TripAll;
  