import mainPic from "/assets/reception.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {MainPicWithArrow} from "../templates/MainPicWithArrow.jsx";
import {RoomTemplate} from "../templates/RoomTemplate.jsx";
import axios from "../Variable/axios-instance.jsx";
import Cookies from 'js-cookie';
import {Button} from "@mui/material";


function renderButtons(reservationID, status, reservationList, setReservationList, reservationNumber, props){


    const sendCancelRequest = async () => {

        try{
            const token = Cookies.get("token");

            const response = await axios.post(`/reservation/cancelRequest`,
                {
                    id: parseInt(reservationID)
                },
                {
                    headers: {"Authorization" : `Bearer ${token}`}
                }
            )


            const updatedReservationList = reservationList.map(reservation => {
                if (reservation.id === reservationID) {
                    return response.data;
                }
                return reservation;
            });

            setReservationList(updatedReservationList);
            props.setType("success");
            props.setNotificationMessage(`Wysłano prośbę o anulowanie rezerwacji o numerze: ${reservationNumber}`);
            props.setNavBarOpen(true);

        }catch(error){
            props.setType("error");
            props.setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            props.setNavBarOpen(true);
        }

    }

    return(
            <Button
                variant="filled"
                endIcon={<FontAwesomeIcon icon={faArrowRight}/>}
                onClick = {sendCancelRequest}
                disabled = {status !== "ACCEPTED"}
            >
                Prośba o anulowanie
            </Button>
    )
}

export default function UserReservation(props) {

    const BASE_URL = "http://localhost:8080/api";

    const [reservationList, setReservationList] = useState([]);

    const scrollDownDiv = useRef(null);

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
                props.setType('success');
                props.setNotificationMessage(`Znalezione rezerwacje: ${response.data.length}`);
                props.setNavBarOpen(true);

            } catch (error) {

                props.setType('error');
                props.setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
                props.setNavBarOpen(true);

            }
        }


        getReservations();

    }, []);


    return (
        <>

            <div className="flex flex-col items-center justify-center w-full h-full">

                <MainPicWithArrow mainPic={mainPic} scrollDownDiv={scrollDownDiv} title="Twoje rezerwacje"/>

                <div
                ref={scrollDownDiv}
                    className="flex flex-col justify-center items-center h-full w-full">

                    {reservationList.length > 0 && reservationList.map((reservation) => (
                        <RoomTemplate key={reservation.id}  reservation={reservation} renderButtons={renderButtons(reservation.id, reservation.status, reservationList, setReservationList,reservation.reservationNumber, props)}/>
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