import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Nav = () => {
    return (
        <div id='Nav' className='nav-container'>
            <div className='nav-inner'>
                <div className='logo-container'>
                    <div className='logo'>
                        <img src={ logo }/>
                    </div>
                </div>
                <div className='title-container'>
                    <h3>Team 5 Project</h3>
                </div>
                <div className='list-container'>
                    <ul><li><Link to='/'>Home</Link></li></ul>
                </div>
            </div>
        </div>
    )
}

export default Nav