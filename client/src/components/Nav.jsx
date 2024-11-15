import { generatePath, Link } from 'react-router-dom';
import { useState } from 'react';
import home from '../assets/home-icon.svg';
import menu from '../assets/menu.svg';
import teamLogo from '../assets/logo.png';  // import the logo image
import backgroundImage from '../assets/bg.png';

const Nav = ({ id }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const toggleDropdown = () => setDisplayMenu(!displayMenu);
  const listPath = generatePath('user/:id/lists', { id });
  const tripPath = generatePath('user/:id/trips', { id });

  return (
    <div
      id="Nav"
      className="nav-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Ensures the image scales properly
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents repeating the image
        padding: '10px', // Optional: added padding as needed
      }}
    >
      <div className='nav-inner'>
        <div className='nav-upper'>
          <div className='home-container'>
            <div className='home-icon'>
              <Link to='/'>
                <img src={home} />
              </Link>
            </div>
          </div>
          <div className='title-container'>
            <Link to='/dashboard'>
              <img src={teamLogo} alt="Team 5 Logo" className="team-logo" />
            </Link>
            <h3>Travel App</h3>
          </div>
          <div className='nav-bars'>
            <div onClick={toggleDropdown} className='menu-icon'>
              <img src={menu} />
            </div>
          </div>
        </div>

        {/* Right-Side Dropdown */}
        {displayMenu && <NavMiddle id={id} />}

        <div className='nav-lower'>
          <div className='list-container'>
            <div className='main-nav'>
              <Link to='dashboard'>Dashboard</Link>
            </div>
            <div className='main-nav'>
              <Link className={'link-style'} to={listPath}>My Lists</Link>
            </div>
            <div className='main-nav'>
              <Link to={tripPath}>My Trips</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavMiddle = ({ id }) => {
  const newTripPath = generatePath('user/:id/trips/new', { id });
  const newListPath = generatePath('user/:id/lists/new', { id });
  const editProfilePath = generatePath('user/:id/edit', { id });

  return (
    <div className="nav-middle-dropdown">
      <div className="dropdown-container">
        <div className="dropdown-link">
          <Link to={editProfilePath}>Edit Profile</Link>
        </div>
        <div className="dropdown-link">
          <Link to={newTripPath}>New Trip</Link>
        </div>
        <div className="dropdown-link">
          <Link to={newListPath}>New List</Link>
        </div>
        <div className="dropdown-link">
          <Link to="/">Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
