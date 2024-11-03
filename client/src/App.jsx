import { Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout';
// import Home from './pages/Home';
import Error from './pages/Error';

import Dashboard from './pages/Dashboard'
import TripView from './pages/TripView'
import ListView from './pages/ListView'


const App = () => {

  // Define Router index and paths for navbar
  
  return (
    <div id='App' className='app-container'>
        <Routes>
          <Route path='/' element={ <Layout/> }>
            <Route index element={ <Dashboard/> }/>
            <Route path='lists' element={ <ListView/> }/>
            <Route path='trips' element={ <TripView/> }/>
            <Route path='*' element={ <Error/> } />
          </Route>
        </Routes>
    </div>
  )
}

export default App
