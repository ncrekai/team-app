import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div id='home' className='home-container page-outer'>
      <div className='page-inner'>
        <div className='page'>
          <div className='page-title'><Link to='/dashboard'>Dashboard</Link></div>
          <div className='page-title'><Link to='/register'>Register</Link></div>
          <div className='page-title'><Link to='/login'>Sign In</Link></div>
          <em><br/>* Temporary landing page until we have ability to use log-in</em>
        </div>
      </div>
    </div>
  );
};
export default Home;
