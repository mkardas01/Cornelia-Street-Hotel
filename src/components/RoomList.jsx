import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight, faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {RoomTemplate} from "./RoomTemplate.jsx";

RoomList.propTypes = {
    rooms: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            picPath: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            size: PropTypes.number.isRequired,
            number: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    setShowRoom: PropTypes.func.isRequired,
    setShowDatePicker: PropTypes.func.isRequired,
    days: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
};


export default function RoomList({rooms, setShowRoom, setShowDatePicker, days, startDate, endDate}) {


    return (
        <>
            {
                rooms.map(room => (
                        <RoomTemplate key={room.id} room={room} days={days}
                                      startDate={startDate} endDate={endDate} reserveRoom={true}/>
                    ))
            }

            <div style={{backgroundColor: '#2d2d33'}} className="flex flex-col justify-center items-center rounded-full w-12 h-12
                                                                 p-10 fixed bottom-2 right-2 z-10 hover:cursor-pointer"
                 onClick={() => {
                     setShowRoom(false)
                     setShowDatePicker(true)
                 }}>
                    <span className="space-y-2 text-5xl" >
                        <FontAwesomeIcon icon={faArrowLeft} style={{color: "#ffffff"}} />
                    </span>
            </div>

        </>

    );

}
