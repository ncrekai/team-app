import { useParams} from "react-router-dom";
const ProfileEdit = () => {
    const routeParams = useParams()
    console.log(routeParams)
    return (
      <div id='dashboard' className='page-outer'>
        <div className='page-inner'>
            <div className='lists'>
                    <div className='page-title'>Edit Profile</div>
                    <div className='list-container'></div>
            </div>
        </div>
      </div>
    );
  };
  export default ProfileEdit;