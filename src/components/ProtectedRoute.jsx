import {Navigate, Outlet} from "react-router-dom";


export default function ProtectedRoute({isLoggedIn}){

    return(
        <div>
            {isLoggedIn ? <Outlet /> : <Navigate to="/" />}
        </div>
    )

}