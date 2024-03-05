import {RoomTemplate} from "../templates/RoomTemplate.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import DialogWindow from "./DialogWindow.jsx";
import MenageButtons from "./MenageButtons.jsx";


export default function CancelRequest({setType, setNotificationMessage, setNavBarOpen}) {

    const BASE_URL = "http://localhost:8080/api";
    const [open, setOpen] = useState({status: false, action: null});
    const [reservations, setReservations] = useState([]);
    const getReservations = async () => {

        const token = Cookies.get("token");

        try {
            const response = await axios.post(`${BASE_URL}/admin/cancelRequests`, {}, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            setReservations(response.data)

            setType("success");
            setNotificationMessage(`Znaleziona ilośc rezerwacji: ${response.data.length}`)
            setNavBarOpen(true);

        } catch (error) {
            setType("error");
            setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            setNavBarOpen(true);
        }

    }


    useEffect(() => {

        getReservations()

    }, []);


    return (
        <>
            <DialogWindow open={open} setOpen={setOpen} reservations={reservations} setReservations={setReservations}
                          setType={setType} setNotificationMessage={setNotificationMessage}
                          setNavBarOpen={setNavBarOpen} />

            <div className={`flex flex-col items-center justify-center max-w-6xl ${reservations ? 'mt-24' : ''}`}>
                {reservations.length > 0 ? (
                    reservations.map((reservation, index) => (
                        <RoomTemplate key={index} reservation={reservation} renderButtons={MenageButtons(reservation.startDate, setOpen, reservation.id, reservation.reservationNumber, reservation.status, reservation)}/>
                    ))
                ) : (
                    <div className="bg-gray-100 flex flex-col justify-center items-center rounded-3xl text-center py-20 ">
                        <div className="space-y-3 px-10 mx-4">
                            <h1 className="text-5xl font-serif">Aktualnie nie ma żadnych próśb o anulowanie rezerwacji.</h1>
                            <h2 style={{color: '#a29010'}} className="text-xl">
                                Prosimy o ponowne sprawdzeniu statusu w krótce.
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </>

    )

}