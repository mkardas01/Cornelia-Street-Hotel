import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

import NavBar from './components/NavBar'
import Home from './components/Home'
import BookRoom from "./components/BookRoom.jsx";
import Login_Register from "./components/Login_Register.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Router>
          <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookRoom/:id" element={<BookRoom />} />
          <Route path="/login" element={<Login_Register type="login" />} />
          <Route path="/register" element={<Login_Register type="register" />} />
        </Routes>
      </Router>
    </React.StrictMode>,
)
