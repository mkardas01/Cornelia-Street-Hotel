import { RoomTemplate } from "../templates/RoomTemplate.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import MenageButtons from "./MenageButtons.jsx";
import DialogWindow from "./DialogWindow.jsx";




export default function TodaysReservations(props) {
    const BASE_URL = "http://localhost:8080/api";

    const [reservations, setReservations] = useState([]);

    const [open, setOpen] = useState({status: false, action: null});


    const token = Cookies.get('token');

    const getTodaysReservations = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/todaysReservations`, {}, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setReservations(response.data);

            props.setType("success");
            props.setNotificationMessage(`Znaleziona ilośc rezerwacji: ${response.data.length}`)
            props.setNavBarOpen(true);

        } catch (error) {
            props.setType("error");
            props.setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            props.setNavBarOpen(true);
        }
    }

    useEffect(() => {
        getTodaysReservations();
    }, []);

    return (
        <>
            <DialogWindow open={open} setOpen={setOpen} reservations={reservations} setReservations={setReservations}
                          {...props} />

            <div className={`flex flex-col items-center justify-center max-w-6xl ${reservations ? 'mt-24' : ''}`}>
                {reservations.length > 0 ? (
                    reservations.map((reservation, index) => (
                        <RoomTemplate key={index} reservation={reservation} renderButtons={MenageButtons(reservation.startDate, setOpen, reservation.id, reservation.reservationNumber, reservation.status, reservation)}/>
                    ))
                ) : (
                    <div className="bg-gray-100 flex flex-col justify-center items-center rounded-3xl text-center py-20 ">
                        <div className="space-y-3 px-10 mx-4">
                            <h1 className="text-5xl font-serif">Niestety, obecnie nie ma żadnych rezerwacji.</h1>
                            <h2 style={{ color: '#a29010' }} className="text-xl">
                                Prosimy o ponowne sprawdzeniu statusu w krótce.
                            </h2>
                        </div>
                        <br />
                        <br />
                        <div className="mx-20 text-center text-xl md:mx-36">
                            Życzmy miłego dnia.
                        </div>
                    </div>
                )}
            </div>
        </>
    );

}
