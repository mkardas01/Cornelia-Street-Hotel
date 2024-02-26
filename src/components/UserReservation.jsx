import mainPic from "/assets/reception.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import roomPic from "/assets/bookRoom.jpg";
import {motion} from "framer-motion";
import {useRef} from "react";
import {MainPicWithArrow} from "./MainPicWithArrow.jsx";
import {RoomTemplate} from "./RoomTemplate.jsx";


export default function UserReservation() {

    const scrollDownDiv = useRef(null);

    const room ={
        'id': 34,
        'picPath': 'bookRoom.jpg',
        'name': 'Floklore',
        'description': '19 lut. 2024 -> 20 lut.2024',
        'size': 4,
        'number': 304,
        'price': 200,
        'reservation':false
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-full">

                <MainPicWithArrow mainPic={mainPic} scrollDownDiv={scrollDownDiv} title="Twoje rezerwacje"/>

                <div
                ref={scrollDownDiv}
                    className="grid grid-cols-1 items-center justify-center backdrop-blur-3xl h-full w-full">

                    <RoomTemplate room={room} days={4} reservation={false}/>

                </div>
            </div>
        </>

    )

}