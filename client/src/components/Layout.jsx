import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = (props) => {
    console.log(props)
    return (
        <>
            <Nav />
            <div id='Page' className='page-container'>
                <Outlet user={props} />
            </div>
        </>
    )
}
export default Layout