import { Routes, Route, Outlet, useLoaderData } from 'react-router-dom'
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

import Nav from './components/Nav.jsx';
// import { getUser, getUsers } from './users.js'

// export const loader = async () => {
//   const id = 1
//   const user = await getUser(id)
//   return { user }
  // let userObj = { id };
  // userObj.profile = data.profiles.find((profile) => profile.id === id)
  // userObj.trips = data.trips.filter(trip => trip.user === id)
  // userObj.lists = data.lists.filter(list => list.user === id)
  // return userObj
// }

const App = () => {
  const [user, setUser] = useState({});
  // const { user } = useLoaderData();
  console.log(user)
  // temporarily assigning user id until login function exists
  const id = 1;

  useEffect(() => {
    // console.log(getUsers())
    // console.log(getUser(1))
    let userObj = { id };
    userObj.profile = data.profiles.find((profile) => profile.id === id)
    userObj.trips = data.trips.filter(trip => trip.user === id)
    userObj.lists = data.lists.filter(list => list.user === id)
    setUser(() => ({...userObj}))
  }, [])
  // useEffect(() => console.log(user), [user])
  return (
    <div id='App' className='app-container'>
      {/* <Nav/>
      <div id='Page' className='page-container'>
        <Outlet />
      </div> */}
      <Routes>
        <Route path='/' element={ <Layout user={user} /> }>
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
