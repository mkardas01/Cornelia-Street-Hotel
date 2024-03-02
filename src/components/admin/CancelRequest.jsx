import {RoomTemplate} from "../RoomTemplate.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";



export default function CancelRequest() {

    const BASE_URL = "http://localhost:8080/api";

    const [reservations, setReservations] = useState([]);
    const getReservations = async () => {

        const token = Cookies.get("token");

        try {
            const response = await axios.post(`${BASE_URL}/admin/cancelRequests`, {}, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(response.data)
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
        <div className={`flex flex-col items-center justify-center max-w-6xl ${reservations ? 'mt-24' : ''}`}>
            {reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                    <RoomTemplate key={index} reservation={reservation}/>
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



)

}