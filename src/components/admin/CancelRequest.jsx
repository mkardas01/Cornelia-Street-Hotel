import {RoomTemplate} from "../RoomTemplate.jsx";
import {useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";



export default function CancelRequest() {

    const BASE_URL = "http://localhost:8080/api";

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
        <div className="flex flex-col items-center justify-center max-w-6xl mt-52">

            <>
                {[...Array(10)].map((_, index) => (
                    <RoomTemplate key={index} reservation={reservation} days={2} reserveRoom={true}/>
                ))}

                <div className="bg-gray-100 flex flex-col justify-center items-center rounded-3xl text-center py-20 ">

                    <div className="space-y-3 px-10 mx-4">
                        <h1 className="text-5xl font-serif">Aktualnie nie ma żadnych próśb o anulowanie rezerwacji.</h1>
                        <h2 style={{color: '#a29010'}} className="text-xl">
                            Prosimy o ponowne sprawdzeniu statusu w krótce.
                        </h2>
                    </div>

                </div>

            </>


        </div>

    )

}