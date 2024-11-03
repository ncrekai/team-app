import { Routes, Route } from 'react-router-dom'
import { generatePath } from 'react-router';
import { useState, useEffect } from 'react';

import './App.css'
import data from './temp-data.js'
import Layout from './components/Layout';
import Home from './pages/Home';
import Error from './pages/Error';

import Dashboard from './pages/Dashboard'
import TripView from './pages/TripView'
import ListView from './pages/ListView'
import Profile from './pages/Profile'

import Register from './pages/Register';
import Login from './pages/Login';


const App = () => {
  const [user, setUser] = useState({});

  // temporarily assigning user id until login function exists
  const id = 1;

  useEffect(() => {
    let userObj = { id };
    userObj.profile = data.profiles.find((profile) => profile.id === id)
    userObj.trips = data.trips.filter(trip => trip.user === id)
    userObj.lists = data.lists.filter(list => list.user === id)
    setUser(() => ({...userObj}))
  }, [])
  useEffect(() => console.log(user), [user])
  return (
    <div id='App' className='app-container'>
        <Routes>
          <Route path='/' element={ <Layout/> }>
            <Route index element={ <Home/> }/>
            <Route path='dashboard' element={ <Dashboard user={user}/> }/>
            <Route path='lists' element={ <ListView/> }/>
            <Route path='trips' element={ <TripView/> }/>
            <Route path='register' element={ <Register/> }/>
            <Route path='login' element={ <Login testName={'hello'}/> } />
            <Route path='/user/:id' element={ <Profile/> }/>
            <Route path='*' element={ <Error/> } />
          </Route>
        </Routes>
    </div>
  )
}

export default App
