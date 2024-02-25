import Cookies from 'js-cookie';
import {useEffect} from "react";

export default function Logout() {


    Cookies.remove('token');

    useEffect(() => {
        window.location.reload();

    }, []);

}
