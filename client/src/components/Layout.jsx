import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = () => {
    return (
        <>
            <Nav />
            <div id='Page' className='page-container'>
                <Outlet />
            </div>
        </>
    )
}
export default Layout