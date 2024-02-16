import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

import NavBar from './components/NavBar'
import Home from './components/Home'
import RoomList from "./components/RoomList.jsx";
import BookRoom from "./components/BookRoom.jsx";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/bookRoom',
    element: <BookRoom />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
