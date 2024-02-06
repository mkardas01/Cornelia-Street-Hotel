import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'


import './index.css'

import NavBar from './components/NavBar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1> test</h1>
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
