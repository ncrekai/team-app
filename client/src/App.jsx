import { Outlet, useLoaderData } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar.jsx';
import { getUser } from './users';
import HeroSection from "./components/HeroSection.jsx";

const App = () => {

  // const allUsers = useLoaderData() // confirmed able to retrieve from api
  const user = getUser(1) // temporary function for userById data until db connected

  return (
    <div id='App' className='app-container'>
      <Navbar id={user.id} />
      <HeroSection />
      {/*<div id='Page' className='page-container'>*/}
      {/*  <Outlet context={ user }/>*/}
      {/*</div>*/}
    </div>
  );
};



export default App;
