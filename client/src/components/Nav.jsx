import { Link } from 'react-router-dom';
import { useState } from 'react';
import home from '../assets/home-icon.svg';
import menu from '../assets/menu.svg'

const Nav = () => {
    const [displayMenu, setDisplayMenu] = useState(false)
    const toggleDropdown = () => setDisplayMenu(!displayMenu)
  return (
    <div id='Nav' className='nav-container'>
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
            <h3>Team 5 Travel App</h3>
          </div>
          <div className='nav-bars'>
            <div onClick={toggleDropdown} className='menu-icon'><img src={menu} /></div>
          </div>
        </div>
        { displayMenu ? <NavMiddle/> : null }
        <div className='nav-lower'>
          <div className='list-container'>
                <div className='main-nav'><Link to='/'>Dashboard</Link></div>
                <div className='main-nav'><Link to='/lists'>My Lists</Link></div>
                <div className='main-nav'><Link to='/trips'>My Trips</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavMiddle = () => {
    return (
        <div className='nav-middle'>
                <div className='dropdown-container'>
                    <div className='dropdown-link'>Edit Profile</div>
                    <div className='dropdown-link'>New Trip</div>
                    <div className='dropdown-link'>New List</div>
                    <div className='dropdown-link'>Logout</div>
                </div>
            </div>
    )
    
}

export default Nav;
