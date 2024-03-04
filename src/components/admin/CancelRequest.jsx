import {RoomTemplate} from "../templates/RoomTemplate.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import DialogWindow from "./DialogWindow.jsx";
import MenageButtons from "./MenageButtons.jsx";

function renderButtons(){
    return(
        <>

            <Button
                variant="filled"
                endIcon={<FontAwesomeIcon icon={faArrowRight}/>}
            >
                Anuluj

            </Button>

            <Button
                variant="filled"
                endIcon={<FontAwesomeIcon icon={faArrowRight}/>}
            >
                Odrzuć prośbę

            </Button>
        </>
    )
}


export default function CancelRequest() {

    const BASE_URL = "http://localhost:8080/api";
    const [open, setOpen] = useState({status: false, action: null});
    const [reservations, setReservations] = useState([]);
    const getReservations = async () => {

        const token = Cookies.get("token");

        try {
            const response = await axios.post(`${BASE_URL}/admin/cancelRequests`, {}, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching today\'s reservations:', error);
            // Handle error gracefully, e.g., show a message to the user
        }

    }


    useEffect(() => {

        getReservations()

    }, []);


    return (
        <>
            <DialogWindow open={open} setOpen={setOpen} reservations={reservations} setReservations={setReservations}/>

            <div className={`flex flex-col items-center justify-center max-w-6xl ${reservations ? 'mt-24' : ''}`}>
                {reservations.length > 0 ? (
                    reservations.map((reservation, index) => (
                        <RoomTemplate key={index} reservation={reservation} renderButtons={MenageButtons(reservation.startDate, setOpen, reservation.id, reservation.reservationNumber, reservation.status)}/>
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