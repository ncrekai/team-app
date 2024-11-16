import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './pages/Error';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ListView from './pages/ListView';
import ListEdit from './pages/ListEdit';
import ListAll from './pages/ListAll';
import ListNew from './pages/ListNew';
import TripView from './pages/TripView';
import TripEdit from './pages/TripEdit';
import TripAll from './pages/TripAll';
import TripNew from './pages/TripNew';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';

// import { getUser } from './users'
import './index.css'
import {AuthProvider} from "./services/authContext.jsx";

// const userLoader = async () => {
//   const res = await fetch('/api/contacts')
//   return await res.json()
// }

const router = createBrowserRouter([
  {
    path: '/',
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
        path: 'user/:userId/lists/new',
        element: <ListNew/>
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
        path: 'user/:userId/trips/new',
        element: <TripNew/>
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


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)