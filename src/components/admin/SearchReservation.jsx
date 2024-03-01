import {Button, TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {RoomTemplate} from "../RoomTemplate.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";



export default function SearchReservation() {

    const reservation =
        {
            "id": 39,
            "name": "Piotr",
            "surname": "Nowak",
            "email": "nowak@wp.pl",
            "phone": "432432423",
            "startDate": "2024-02-28",
            "endDate": "2024-02-29",
            "reservationNumber": "ecb733",
            "room": {
                "id": 53,
                "floorNumber": 3,
                "number": 302,
                "size": 4,
                "price": 200,
                "name": "Folklore Retreat",
                "description": "Witaj w Folklore Retreat - urokliwym pokoju\r\n                            nasyconym\r\n                            magią i tajemnicą. Stworzony, by zapewnić ucieczkę od codzienności",
                "picPath": "main.jpg"
            }
        };

    return(
        <div className="flex flex-col items-center justify-center max-w-7xl mt-96">
            <div className=" bg-gray-50 p-8 h-fit rounded-3xl">

                <h1 className="pb-4 font-semibold ">Wypełnij te pola na podstawie których chcesz wyszukać rezerwacji</h1>

                <div className="flex items-center justify-between space-x-5">
                    <TextField id="outlined-basic" label="Numer rezerwacji" variant="outlined"/>
                    <TextField id="outlined-basic" label="E-mail" variant="outlined"/>
                    <TextField id="outlined-basic" label="Nazwisko" variant="outlined"/>

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">

                        <DatePicker
                            label="Dzień przyjazdu"
                            format="DD/MM/YYYY"
                            disablePast
                        />

                        <DatePicker
                            label="Dzień wyjazdu"
                            format="DD/MM/YYYY"
                            disablePast
                        />


                    </LocalizationProvider>

                    <Button variant="outline" endIcon={<FontAwesomeIcon icon={faSearch}/>}>
                        Szukaj
                    </Button>
                </div>

            </div>

            <>
                {[...Array(10)].map((_, index) => (
                    <RoomTemplate key={index} reservation={reservation} days={2} reserveRoom={true} />
                ))}
            </>


        </div>

    )

}