import { Outlet, useLoaderData } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <div id='App' className='app-container'>
      <Navbar/>
      <div id='Page' className='page-container'>
        <Outlet/>
      </div>
    </div>
  );
};



export default App;
