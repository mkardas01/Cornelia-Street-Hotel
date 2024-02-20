import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

import NavBar from './components/NavBar'
import Home from './components/Home'
import BookRoom from "./components/BookRoom.jsx";
import Login from "./components/Login.jsx";
import Login_Register from "./components/Login_Register.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/bookRoom/:id',
    element: <BookRoom />
  },
  {
    path: '/login',
    element: <Login_Register type="login" />
  },
  {
    path: '/register',
    element: <Login_Register type="register" />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,

)
