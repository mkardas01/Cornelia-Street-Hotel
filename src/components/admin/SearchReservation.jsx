import {Button, TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {RoomTemplate} from "../RoomTemplate.jsx";



export default function SearchReservation() {

    const room = {
            "id": 55,
            "floorNumber": 3,
            "number": 304,
            "size": 4,
            "price": 200,
            "name": "Folklore Retreat",
            "description": "Witaj w Folklore Retreat - urokliwym pokoju\r\n                            nasyconym\r\n                            magią i tajemnicą. Stworzony, by zapewnić ucieczkę od codzienności",
            "picPath": "main.jpg"
        };

    return(
        <div className="flex flex-col items-center justify-center max-w-6xl">
            <div className=" bg-gray-200 p-8 h-fit rounded-3xl">

                <h1 className="pb-4 font-semibold ">Wypełnij te pola na podstawie których chcesz wyszukać rezerwacji</h1>

                <div className="flex items-center justify-between space-x-5">
                    <TextField id="outlined-basic" label="Numer rezerwacji" variant="outlined"/>
                    <TextField id="outlined-basic" label="E-mail" variant="outlined"/>
                    <TextField id="outlined-basic" label="Nazwisko" variant="outlined"/>
                    <Button variant="outline" endIcon={<FontAwesomeIcon icon={faSearch}/>}>
                        Szukaj
                    </Button>
                </div>

            </div>

            <RoomTemplate room={room} reserveRoom={true}/>
            <RoomTemplate room={room} reserveRoom={true}/>
            <RoomTemplate room={room} reserveRoom={true}/>
        </div>

    )

}