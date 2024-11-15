import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bg2.png';

const Home = () => {
   return (
      <div className="page-inner">
         <div className="page"
         
         style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', // Ensures the image scales properly
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat', // Prevents repeating the image
            padding: '10px', // Optional: added padding as needed
          }}
         >
            {/* App Name */}
            <div className="home-header">
               <h1 className="app-name">Travel Planning App</h1>
            </div>
            <p className="app-tagline">"Plan your dream journey with ease!" </p>
            
            {/* Navigation Links */}
            <div className="home-links">
               <Link to="/dashboard" className="home-link">Dashboard</Link>
               <Link to="/register" className="home-link">Register</Link>
               <Link to="/login" className="home-link">Sign In</Link>
            </div>
         </div>
      </div>
   );
};

export default Home;
