import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import {statusMessages} from "../Variable/ReservationStatus.jsx";




export const RoomTemplate = ({room, reservation, days, startDate, endDate, renderButtons}) => {

    const mapReservationToData = (res) => {
        return [
            {label: "Data: ", value: res.startDate + ' -> ' + res.endDate},
            { label: "Telefon: ", value: res.phone },
            { label: "Numer rezerwacji: ", value: res.reservationNumber },
            { label: "Email: ", value: res.email },
            { label: "Rezerwujący: ", value: res.name + ' ' + res.surname }
        ];
    };

    const reservationData = reservation ? mapReservationToData(reservation) : null;

    room = reservation ? reservation.room : room;

    days = reservation ? dayjs(reservation.endDate).diff(dayjs(reservation.startDate), 'day') : days;

    return (
        <>
            <div
                className={`flex flex-col justify-center w-3/4  mt-20 mb-20 max-w-4xl md:flex-row h-fit`}>
                {/*img*/}
                <div className="md:w-1/2">
                    <img
                        className="h-64 w-full object-cover rounded-t-3xl md:h-full   md:rounded-tr-none md:rounded-l-3xl"
                        src={'../assets/' + room.picPath} alt="image"/>
                </div>

                <div
                    className="md:w-1/2 bg-gray-50 border-2 rounded-b-3xl border-t-0 py-4 px-3 space-y-2 md:border-l-0 md:border-t-2 md:rounded-l-none md:rounded-tr-3xl ">
                    {/*opis*/}
                    <div className={` space-y-2 pb-2 ${!reservation ? 'h-3/5' : 'h-fit'}`}>

                        {reservation && <p className={`text-right font-semibold  ${statusMessages[reservation.status]?.className}`}>{statusMessages[reservation.status].message}</p>}

                        <h1 className={`font-serif drop-shadow-2xl w-full text-3xl ${reservation ? 'pb-2' : ''}`}>{room.name}</h1>

                        {!reservation && <p className="overflow-hidden line-clamp-3">{room.description}</p>}

                        {reservation &&

                            reservationData.map((item, index) => (
                                    <p key={index} className='font-medium text-gray-500'>
                                        {item.label} <span className="text-black font-medium">{item.value}</span>
                                    </p>
                            ))

                        }

                    </div>

                    <div className={`flex flex-col justify-between ${!reservation ? 'h-2/5' : ''} `}>
                            <div className={`flex flex-col ${reservation ? 'justify-end h-full' : ''}`}>
                                        <span className="grid grid-cols-3 gap-2 text-l p-2 text-center">
                                            <span><FontAwesomeIcon icon={faUser}/> {room.size}</span>
                                            <span><FontAwesomeIcon icon={faDoorOpen}/> {room.number}</span>
                                            <span><FontAwesomeIcon icon={faTag}/> {days * room.price} zł</span>
                                        </span>
                            </div>


                            <div className={`flex justify-center ${reservation ? 'md:pt-7 md:justify-around' : ''}`}>

                                {renderButtons}

                            </div>

                    </div>

                </div>
            </div>
        </>
    )
}