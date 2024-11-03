import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import Profile from './pages/Profile.jsx';
import Error from './pages/Error.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'profile/:profileId',
        element: <Profile />
      }
    ]
  },
  // {
  //   path: 'profile/:profileId',
  //   element: <Profile />
  // }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </StrictMode>,
)
