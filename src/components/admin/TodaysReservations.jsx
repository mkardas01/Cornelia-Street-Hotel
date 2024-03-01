import { Button, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { RoomTemplate } from "../RoomTemplate.jsx";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function TodaysReservations() {
    const BASE_URL = "http://localhost:8080/api";
    const [reservations, setReservations] = useState([]);
    const token = Cookies.get('token');

    const getTodaysReservations = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/todaysReservations`, {}, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching today\'s reservations:', error);
            // Handle error gracefully, e.g., show a message to the user
        }
    }

    useEffect(() => {
        getTodaysReservations();
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center max-w-6xl ${reservations ? 'mt-24' : ''}`}>
            {reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                    <RoomTemplate key={index} reservation={reservation} />
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
    );
}
