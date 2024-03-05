import {RoomTemplate} from "../templates/RoomTemplate.jsx";
import {useEffect, useState} from "react";
import axios from "../Variable/axios-instance.jsx";
import Cookies from "js-cookie";
import DialogWindow from "./DialogWindow.jsx";
import MenageButtons from "./MenageButtons.jsx";
import {motion} from "framer-motion";

export default function CancelRequest(props) {

    const [open, setOpen] = useState({status: false, action: null});
    const [reservations, setReservations] = useState([]);
    const getReservations = async () => {

        const token = Cookies.get("token");

        try {
            const response = await axios.post(`/admin/cancelRequests`, {}, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            setReservations(response.data)

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

        getReservations()

    }, []);


    return (
        <>
            <DialogWindow open={open} setOpen={setOpen} reservations={reservations} setReservations={setReservations}
                          {...props} />

            <motion.div className={`flex flex-col items-center justify-center max-w-6xl ${reservations ? 'mt-24' : ''}`}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.7, ease: "easeIn"}}
            >
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
            </motion.div>
        </>

    )

}