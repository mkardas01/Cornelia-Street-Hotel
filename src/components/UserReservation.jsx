import mainPic from "/assets/reception.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import roomPic from "/assets/bookRoom.jpg";
import {motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {MainPicWithArrow} from "./MainPicWithArrow.jsx";
import {RoomTemplate} from "./RoomTemplate.jsx";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from 'js-cookie';
import NotificationBar from "./NotificationBar.jsx";

export default function UserReservation() {

    const BASE_URL = "http://localhost:8080/api";

    const [reservationList, setReservationList] = useState([]);

    const scrollDownDiv = useRef(null);

    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState("error");
    const [openNotificationBar, setOpenNotificationBar] = useState(false);


    useEffect( () => {

        const token = Cookies.get('token');
        const getReservations = async () => {
            try {
                const response = await axios.post(`${BASE_URL}/reservation/getReservations`,
                    {},
                    {
                        headers: {"Authorization" : `Bearer ${token}`}
                    }
                );

                setReservationList(response.data);

            } catch (error) {

                setNotificationType('error');
                setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
                setOpenNotificationBar(true);

            }
        }


        getReservations();

    }, []);


    return (
        <>
            <NotificationBar type={notificationType} notificationMessage={notificationMessage} open={openNotificationBar} setOpen={setOpenNotificationBar}/>


            <div className="flex flex-col items-center justify-center w-full h-full">

                <MainPicWithArrow mainPic={mainPic} scrollDownDiv={scrollDownDiv} title="Twoje rezerwacje"/>

                <div
                ref={scrollDownDiv}
                    className="grid grid-cols-1 items-center justify-center backdrop-blur-3xl h-full w-full">

                    {reservationList.length > 0 && reservationList.map((reservation) => (
                        <RoomTemplate key={reservation.id}  reservation={reservation}  reserveRoom={false}/>
                    ))}


                    {reservationList.length === 0 &&

                        <div className="flex flex-col justify-center items-center text-center py-20 ">

                            <div className="space-y-3 px-10 mx-4">
                                <h1 className="text-5xl font-serif">Niestety, obecnie nie masz żadnej rezerwacji.</h1>
                                <h2 style={{color: '#a29010'}} className="text-xl">Jednak nie trać nadziei! Zapraszamy Cię
                                    do naszego hotelu.</h2>
                            </div>

                            <br></br> <br></br>

                            <div className="mx-20 text-center text-xl md:mx-36">
                                Mimo braku rezerwacji, nasz hotel zapewni Ci niezapomniane doświadczenia, łącząc
                                nowoczesność z relaksem w każdym detalu. Zachęcamy do odwiedzenia naszego obiektu i
                                doświadczenia harmonii, jaką oferujemy.
                            </div>


                        </div>
                    }
                </div>
            </div>
        </>

    )

}