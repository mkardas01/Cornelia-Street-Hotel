import {Button, TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {RoomTemplate} from "../RoomTemplate.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";



export default function SearchReservation() {

    const BASE_URL = "http://localhost:8080/api";

    const [email, setEmail] = useState();
    const [surname, setSurname] = useState();
    const [reservationNumber, setReservationNumber] = useState();
    const [arrivalDate, setArrivalDate] = useState();
    const [departureDate, setDepartureDate] = useState();

    const [reservations, setReservations] = useState([]);

    const searchReservation = async () =>{

        const token = Cookies.get("token");

        try{
            const response = await axios.post(`${BASE_URL}/admin/searchReservation`,
                {
                    reservationNumber: reservationNumber,
                    email: email,
                    surname: surname,
                    arrivalDate: dayjs(arrivalDate).format("YYYY-MM-DD"),
                    departureDate: dayjs(departureDate).format("YYYY-MM-DD")
                },
                {
                    headers: {"Authorization" : `Bearer ${token}`}
                })

            console.log(response.data)
            setReservations(response.data);

        }catch(error){
            console.log(error);
        }
    }


    return(
        <div className="flex flex-col items-center justify-center max-w-7xl ">
            <div className=" bg-gray-50 p-8 h-fit rounded-3xl">

                <h1 className="pb-4 font-semibold ">Wypełnij te pola na podstawie których chcesz wyszukać rezerwacji</h1>

                <div className="flex items-center justify-between space-x-5">
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
                            disablePast
                        />

                        <DatePicker
                            label="Dzień wyjazdu"
                            format="DD/MM/YYYY"
                            onChange={(newValue) => setDepartureDate(newValue)}
                            disablePast
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

            <>
                {reservations.length > 0 && (
                    reservations.map((reservation, index) => (
                        <RoomTemplate key={index} reservation={reservation} />
                    ))
                )

                }
            </>


        </div>

    )

}