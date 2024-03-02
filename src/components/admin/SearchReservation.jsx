import {Button, TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faSearch} from "@fortawesome/free-solid-svg-icons";
import {RoomTemplate} from "../RoomTemplate.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MenageButtons from "./MenageButtons.jsx";


export default function SearchReservation() {

    const BASE_URL = "http://localhost:8080/api";

    const [email, setEmail] = useState();
    const [surname, setSurname] = useState();
    const [reservationNumber, setReservationNumber] = useState();
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);

    const [reservations, setReservations] = useState([]);
    const [searched, setSearched] = useState(false);

    const scrollDownDiv = useRef();

    const scrollDown = () =>{
        scrollDownDiv?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    useEffect(() => {
            scrollDown();

    }, [reservations]);

    const searchReservation = async () =>{

        const token = Cookies.get("token");

        try{
            const response = await axios.post(`${BASE_URL}/admin/searchReservation`,
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

        }catch(error){
            console.log(error);
        }
    }


    return(
        <div className="flex flex-col items-center justify-center max-w-7xl ">
            <div className="flex justify-center items-center  h-screen">
                <div className="sticky top-5 bg-gray-50 p-8 h-fit rounded-3xl">

                    <h1 className="pb-4 font-semibold ">Wypełnij te pola na podstawie których chcesz wyszukać rezerwacji</h1>

                    <div className="flex items-center justify-between space-x-5 ">
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
                                onChange={(newValue) => setArrivalDate(newValue)}

                            />

                            <DatePicker
                                label="Dzień wyjazdu"
                                format="DD/MM/YYYY"
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

            <div className="flex flex-col justify-center items-center" ref={scrollDownDiv}>
                {searched && reservations.length === 0 ? (
                    <div className="h-96">
                        <div
                            className="bg-gray-100 flex flex-col justify-center items-center rounded-3xl text-center py-20 ">
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
                        <RoomTemplate key={index} reservation={reservation} renderButtons={MenageButtons()}/>
                    ))
                )}
            </div>


        </div>

    )

}