import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

import NavBar from './components/NavBar'
import Home from './components/Home'
import BookRoom from "./components/BookRoom.jsx";
import Login_Register from "./components/Login_Register.jsx";
import {BackHome} from "./components/BackHome.jsx";

import Cookies from 'js-cookie';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Logout from "./components/Logout.jsx";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";
import UserReservation from "./components/UserReservation.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";


let root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            console.log('Token exists:', token);
            setIsLoggedIn(true);

        } else {
            console.log('Token does not exist');
            setIsLoggedIn(false);
        }


    }, []);

    const options = [
        { name: 'O nas', link: '/login' },
        isLoggedIn ? { name: 'Twoje rezerwacje', link: '/reservation' } : null,
        { name: 'Admin', link: '/admin'},
        { name: isLoggedIn ? 'Wyloguj się' : 'Zaloguj się', link: isLoggedIn ? '/logout' : '/login' }
    ].filter(option => option != null);

    return (
        <React.StrictMode>
            <Router>
                <NavBar isLoggedIn={isLoggedIn} options={options}/>
                <Routes>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/bookRoom/:id" element={<> <BookRoom/> <BackHome/> </>}/>

                    <Route element={<ProtectedRoute isLoggedIn={!isLoggedIn}/>}>
                        <Route path="/login" element={<> <Login_Register type="login"/> <BackHome/> </>}/>
                        <Route path="/register" element={<> <Login_Register type="register"/> <BackHome/> </>}/>
                    </Route>

                    <Route path="/admin/*" element={<AdminPanel/>}/>

                    <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/reservation" element={<> <UserReservation /> <BackHome/> </>} />
                    </Route>


                    <Route path="/*" element={<Navigate to="/"/>}/>

                </Routes>
            </Router>
        </React.StrictMode>
    )
}


root.render(<DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
>
    <App/>
</DevSupport>);
