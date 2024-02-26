import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export const RoomTemplate = ({room, days, startDate, endDate, reservation}) => {
    return (
        <>
            <div key={room.id}
                 className="mx-auto flex flex-col justify-center w-3/4 h-fit mt-20 mb-20 md:flex-row  md:max-h-72">
                {/*img*/}
                <div className="md:w-1/2">
                    <img
                        className="h-64 w-full object-cover rounded-t-3xl md:h-full md:rounded-tr-none md:rounded-l-3xl"
                        src={'assets/' + room.picPath} alt="image"/>
                </div>

                <div
                    className="md:w-1/2 border-2 rounded-b-3xl border-t-0 py-4 px-3 space-y-2 md:border-l-0 md:border-t-2 md:rounded-l-none md:rounded-tr-3xl ">
                    {/*opis*/}
                    <div className="h-3/5 space-y-2 pb-2">
                        <h1 className="font-serif drop-shadow-2xl w-full text-3xl ">{room.name}</h1>
                        <p className="overflow-hidden line-clamp-3">{room.description}</p>
                    </div>
                    <div className="flex flex-col h-2/5 justify-between">
                        <div className="flex flex-col">
                                    <span className="grid grid-cols-3 gap-2 text-l p-2 text-center">
                                        <span><FontAwesomeIcon icon={faUser}/> {room.size}</span>
                                        <span><FontAwesomeIcon icon={faDoorOpen}/> {room.number}</span>
                                        <span><FontAwesomeIcon icon={faTag}/> {days * room.price} zł</span>
                                    </span>
                        </div>
                        {reservation &&

                            <div className="flex justify-center">
                                <Link to={{pathname: '/bookRoom/' + room.id}} state={{room, startDate, endDate, days}}>
                                    <Button variant="filled" endIcon={<FontAwesomeIcon icon={faArrowRight}/>}>
                                        Wybierz
                                    </Button>
                                </Link>

                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}