import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div id='App' className='app-container'>
      <Navbar/>
      <div id='Page' className='page-container'>
          <ToastContainer autoClose={1000}/>
          <Outlet/>
      </div>
    </div>
  );
};



export default App;
