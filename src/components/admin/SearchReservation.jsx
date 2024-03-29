import {Button, TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {RoomTemplate} from "../templates/RoomTemplate.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useRef, useState} from "react";
import axios from "../Variable/axios-instance.jsx";
import Cookies from "js-cookie";
import MenageButtons from "./MenageButtons.jsx";
import DialogWindow from "./DialogWindow.jsx";
import {motion} from "framer-motion";

export default function SearchReservation(props) {


    const [email, setEmail] = useState();
    const [surname, setSurname] = useState();
    const [reservationNumber, setReservationNumber] = useState();
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);

    const [reservations, setReservations] = useState([]);
    const [searched, setSearched] = useState(false);

    const [open, setOpen] = useState({status: false, actionID: null, action:null, reservationId: null, reservationNumber:null});

    const scrollDownDiv = useRef();

    const scrollDown = () =>{
        scrollDownDiv?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const searchReservation = async () =>{

        const token = Cookies.get("token");

        try{
            const response = await axios.post(`/admin/searchReservation`,
                {
                    reservationNumber: reservationNumber,
                    email: email,
                    surname: surname,
                    startDate: arrivalDate ? dayjs(arrivalDate).format("YYYY-MM-DD") : null,
                    endDate: departureDate ? dayjs(departureDate).format("YYYY-MM-DD") : null,
                },
                {
                    headers: {"Authorization" : `Bearer ${token}`}
                })


            setReservations(response.data);
            setSearched(true);

            props.setType("success");
            props.setNotificationMessage(`Znaleziona ilośc rezerwacji: ${response.data.length}`)
            props.setNavBarOpen(true);

            setTimeout(() => {
                scrollDown();
            }, 100);

        }catch(error){
            props.setType("error");
            props.setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            props.setNavBarOpen(true);
        }
    }


    return(
        <>
            <DialogWindow open={open} setOpen={setOpen} reservations={reservations} setReservations={setReservations}
                          {...props} />

            <motion.div className="flex flex-col items-center justify-center max-w-7xl "
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.7, ease: "easeIn"}}
            >
                <div className="flex justify-center items-center h-screen px-10">
                    <div className="sticky top-5 bg-gray-50 p-8 h-fit rounded-3xl">

                        <h1 className="pb-4 font-semibold ">Wypełnij te pola na podstawie których chcesz wyszukać rezerwacji</h1>

                        <div className="grid grid-cols-2 gap-4 md:space-x-1 md:flex md:items-center md:justify-between">
                            <TextField
                                id="fReservation"
                                label="Numer rezerwacji"
                                onChange={(newValue) => setReservationNumber(newValue.target.value)}
                                variant="outlined"/>

                            <TextField
                                id="fEmail"
                                label="E-mail"
                                onChange={(newValue) => setEmail(newValue.target.value)}
                                variant="outlined"/>

                            <TextField
                                id="fSurname"
                                label="Nazwisko"
                                onChange={(newValue) => setSurname(newValue.target.value)}
                                variant="outlined"/>

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">

                                <DatePicker
                                    label="Dzień przyjazdu"
                                    format="DD/MM/YYYY"
                                    value={arrivalDate}
                                    onChange={(newValue) => setArrivalDate(newValue)}

                                />

                                <DatePicker
                                    label="Dzień wyjazdu"
                                    format="DD/MM/YYYY"
                                    value={departureDate}
                                    onChange={(newValue) => setDepartureDate(newValue)}

                                />


                            </LocalizationProvider>

                            <Button
                                variant="outline"
                                endIcon={<FontAwesomeIcon icon={faSearch}/>}
                                onClick={searchReservation}
                            >
                                Szukaj
                            </Button>

                        </div>

                    </div>
                </div>

                <motion.div className="flex flex-col justify-center items-center" ref={scrollDownDiv}
                            initial={{scaleX: 0}}
                            animate={{scaleX: 1, originY: 0}}
                            transition={{delay:0.9, duration: 1, ease: "easeIn"}}
                >
                    {searched && reservations.length === 0 ? (
                        <div className="h-96 px-20 py-20 h-fit">
                            <div
                                className="bg-gray-100 flex flex-col justify-center items-center rounded-3xl text-center  py-20 ">
                                <div className="space-y-3 px-10 mx-4">
                                    <h1 className="text-5xl font-serif">Nie znaleziono żadnej rezerwacji.</h1>
                                    <h2 style={{color: '#a29010'}} className="text-xl">
                                        Prosimy o zmiane kryteriów wyszukiwania.
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ) : (
                        reservations.map((reservation, index) => (
                            <RoomTemplate key={index} reservation={reservation} renderButtons={MenageButtons(reservation.startDate, setOpen, reservation.id, reservation.reservationNumber, reservation.status, reservation)}/>
                        ))
                    )}
                </motion.div>


            </motion.div>
        </>
    )

}