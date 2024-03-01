import {RoomTemplate} from "../RoomTemplate.jsx";



export default function CancelRequest() {

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
        <div className="flex flex-col items-center justify-center max-w-6xl mt-64">

            <>
                {[...Array(10)].map((_, index) => (
                    <RoomTemplate key={index} reservation={reservation} days={2} reserveRoom={true} />
                ))}
            </>


        </div>

    )

}