import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

import NavBar from './components/templates/NavBar.jsx'
import Home from './components/Home'
import BookRoom from "./components/reservation/BookRoom.jsx";
import Login_Register from "./components/login/Login_Register.jsx";
import {BackHome} from "./components/templates/BackHome.jsx";

import Cookies from 'js-cookie';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Logout from "./components/login/Logout.jsx";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";
import UserReservation from "./components/reservation/UserReservation.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import NotificationBar from "./components/templates/NotificationBar.jsx";
import {jwtDecode} from "jwt-decode";


let root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState();
    const [isAdmin, setIsAdmin ] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        let user;

        if (token) {
            console.log('Token exists:', token);
            setIsLoggedIn(true);
            user = jwtDecode(token);

        } else {
            console.log('Token does not exist');
            setIsLoggedIn(false);
        }

        if(user && user.role === "ADMIN")
            setIsAdmin(true);

    }, []);

    const options = [
        isLoggedIn ? { name: 'Twoje rezerwacje', link: '/reservation' } : null,
        isAdmin ? { name: 'Panel rezerwacji', link: '/admin'} : null,
        { name: isLoggedIn ? 'Wyloguj się' : 'Zaloguj się', link: isLoggedIn ? '/logout' : '/login' }
    ].filter(option => option != null);

    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState("error");
    const [openNotificationBar, setOpenNotificationBar] = useState(false);

    const notificationProps = {
        setType: setNotificationType,
        setNotificationMessage: setNotificationMessage,
        setNavBarOpen: setOpenNotificationBar
    };

    return (
        <>
            <Router>
                <NavBar isLoggedIn={isLoggedIn} options={options}/>
                <NotificationBar type={notificationType} notificationMessage={notificationMessage}
                                 open={openNotificationBar} setOpen={setOpenNotificationBar}/>
                <Routes>

                    <Route path="/" element={<Home {...notificationProps} />}/>
                    <Route path="/bookRoom/:id" element={<> <BookRoom {...notificationProps} isAdmin={isAdmin} /> <BackHome/> </>}/>

                    <Route element={<ProtectedRoute isLoggedIn={!isLoggedIn}/>}>
                        <Route path="/login" element={<> <Login_Register type="login" {...notificationProps} /> <BackHome/> </>}/>
                        <Route path="/register" element={<> <Login_Register type="register" {...notificationProps} /> <BackHome/> </>}/>
                    </Route>

                    <Route element={<ProtectedRoute isLoggedIn={isAdmin}/>}>
                        <Route path="/admin/*" element={<> <AdminPanel  {...notificationProps} /> <BackHome/> </>} />

                    </Route>


                    <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/reservation" element={<> <UserReservation {...notificationProps}/> <BackHome/> </>} />
                    </Route>


                    <Route path="/*" element={<Navigate to="/"/>}/>

                </Routes>
            </Router>
        </>
    )
}


root.render(<DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
>
    <App/>
</DevSupport>);
