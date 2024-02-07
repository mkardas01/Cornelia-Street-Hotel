import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'


import './index.css'

import NavBar from './components/NavBar'
import Home from './components/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
