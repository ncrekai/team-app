import { Routes, Route, Outlet } from 'react-router-dom'

import './App.css'
import Nav from './components/Nav';
// import Layout from './components/Layout';
// import Home from './pages/Home';
// import Error from './pages/Error';

// import Dashboard from './pages/Dashboard'
// import TripView from './pages/TripView'
// import ListView from './pages/ListView'
// import Profile from './pages/ProfileView'

// import Register from './pages/Register';
// import Login from './pages/Login';

const App = () => {

  return (
    <div id='App' className='app-container'>
      <Nav />
      <div id='Page' className='page-container'>
        <Outlet />
      </div>
      {/* <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Home/> }/>
          <Route path='dashboard' element={ <Dashboard /> }/>
          <Route path='lists' element={ <ListView/> }/>
          <Route path='trips' element={ <TripView/> }/>
          <Route path='register' element={ <Register/> }/>
          <Route path='login' element={ <Login /> } />
          <Route path='/user/:id' element={ <Profile/> }/>
          <Route path='*' element={ <Error/> } />
        </Route>
      </Routes> */}
    </div>
  )
}

export default App
