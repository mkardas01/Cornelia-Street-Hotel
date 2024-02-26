import mainPic from "/assets/reception.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import roomPic from "/assets/bookRoom.jpg";
import {motion} from "framer-motion";
import {useRef} from "react";
import {MainPicWithArrow} from "./MainPicWithArrow.jsx";

function Arrow({ scrollDown }) {
    return (
        <motion.div
            className="absolute bottom-0 flex justify-center cursor-pointer p-12"
            onClick={scrollDown}
            initial={{y: -10}}
            animate={{y: 0}}
            transition={{duration: 1, ease: "easeIn", delay: 1, repeat: Infinity, repeatType: "reverse"}}
        >
            <div className="w-1 h-8 absolute bottom-0 mr-5 border-solid border-2 border-gray-300 -rotate-45"></div>
            <div className="w-1 h-12 absolute bottom-1 border-solid border-2 border-gray-300"></div>
            <div className="w-1 h-8 absolute bottom-0 ml-5 border-solid border-2 border-gray-300 rotate-45"></div>
        </motion.div>


    );
}

function Reservation(){

    return (
        <div
            className="mx-auto flex flex-col justify-center w-3/4 h-fit mt-20 mb-20 md:flex-row  md:max-h-72">
            {/*img*/}
            <div className="md:w-1/2">
                <img
                    className="h-64 w-full object-cover rounded-t-3xl md:h-full md:rounded-tr-none md:rounded-l-3xl"
                    src={roomPic} alt="image"/>
            </div>

            <div
                className="border-2 rounded-b-3xl border-t-0 py-4 px-3 space-y-2 bg-white
                            md:border-l-0 md:border-t-2 md:rounded-l-none md:rounded-tr-3xl md:w-1/2 ">
                {/*opis*/}
                <div className="h-3/5 space-y-2 pb-2">
                    <h1 className="font-serif drop-shadow-2xl w-full text-3xl ">Nazwa</h1>
                    <p className="overflow-hidden line-clamp-3">19 lut. 2024 -> 24 lut. 2024</p>
                </div>
                <div className="flex flex-col h-2/5 justify-between">
                    <div className="flex flex-col">
                                    <span className="grid grid-cols-3 gap-2 text-l p-2 text-center">
                                        <span><FontAwesomeIcon icon={faUser}/> 4</span>
                                        <span><FontAwesomeIcon icon={faDoorOpen}/> 5</span>
                                        <span><FontAwesomeIcon icon={faTag}/> 200 zł</span>
                                    </span>
                    </div>
                    <div className="flex justify-center">

                        {/*<Link to={{pathname: '/bookRoom/' + room.id}} state={{room, startDate, endDate, days}}>*/}
                        {/*    <Button variant="filled" endIcon={<FontAwesomeIcon icon={faArrowRight}/>}>*/}
                        {/*        Wybierz*/}
                        {/*    </Button>*/}
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function UserReservation() {

    const scrollDownDiv = useRef(null);


    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-full">

                <MainPicWithArrow mainPic={mainPic} scrollDownDiv={scrollDownDiv} title="Twoje rezerwacje"/>

                <div
                ref={scrollDownDiv}
                    className="grid grid-cols-1 items-center justify-center backdrop-blur-3xl h-full w-full">

                    <Reservation/>
                    <Reservation/>
                    <Reservation/>
                    <Reservation/>

                </div>
            </div>
        </>

    )

}