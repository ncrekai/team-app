import { Outlet, useLoaderData } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import { getUser } from './users';

const App = () => {

  // const allUsers = useLoaderData() // confirmed able to retrieve from api
  const user = getUser(1) // temporary function for userById data until db connected

  return (
    <div id='App' className='app-container'>
      <Nav id={user.id} />
      <div id='Page' className='page-container'>
        <Outlet context={ user }/>
      </div>
    </div>
  );
};



export default App;
