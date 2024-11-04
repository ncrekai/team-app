import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

import App from './App';
import Error from './pages/Error';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ListView from './pages/ListView';
import ListEdit from './pages/ListEdit';
import ListAll from './pages/ListAll';
import TripView from './pages/TripView';
import TripEdit from './pages/TripEdit';
import TripAll from './pages/TripAll';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';

import './index.css'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path:'dashboard',
        element: <Dashboard />
      },
      {
        path:'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'user/:userId/lists/:id',
        element: <ListView/>
      },
      {
        path: 'user/:userId/lists/:id/edit',
        element: <ListEdit/>
      },
      {
        path: 'user/:userId/lists',
        element: <ListAll/>
      },
      {
        path: 'user/:userId/trips/:id',
        element: <TripView/>
      },
      {
        path: 'user/:userId/trips/:id/edit',
        element: <TripEdit/>
      },
      {
        path: 'user/:userId/trips',
        element: <TripAll/>
      },
      {
        path: 'user/:id',
        element: <ProfileView/>
      },
      {
        path: 'user/:id/edit',
        element: <ProfileEdit/>
      }
    ]
  }
]);


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route index element={ <Home/> }/>
//           <Route path='dashboard' element={ <Dashboard /> }/>
//           <Route path='user/:userId/lists/:id' element={ <ListView/> }/>
//           <Route path='user/:userId/trips/:id' element={ <TripView/> }/>
//           <Route path='user/:userId/lists/:id/edit' element={ <ListEdit/> }/>
//           <Route path='user/:userId/trips/:id/edit' element={ <TripEdit/> }/>
//           <Route path='user/:userId/lists' element={ <ListAll/> }/>
//           <Route path='user/:userId/trips' element={ <TripAll/> }/>
//           <Route path='register' element={ <Register/> }/>
//           <Route path='login' element={ <Login /> } />
//           <Route path='user/:id' element={ <ProfileView/> }/>
//           <Route path='user/:id/edit' element={ <ProfileEdit/> }/>
//           <Route path='*' element={ <Error/> } />
//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </StrictMode>,
)
