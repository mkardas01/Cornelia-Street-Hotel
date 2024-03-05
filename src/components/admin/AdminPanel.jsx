import SearchReservation from "./SearchReservation.jsx";
import mainPic from "/assets/front.png";
import TodaysReservations from "./TodaysReservations.jsx";
import CancelRequest from "./CancelRequest.jsx";
import {NavLink} from "react-router-dom";
import { useLocation } from "react-router-dom";
import EditReservation from "./EditReservation.jsx";
import { motion} from "framer-motion";


export default function AdminPanel({setType, setNotificationMessage, setNavBarOpen}){

    const options = [
        { name: 'Dzisiejsze rezerwacje', link: '/admin/todays'},
        { name: 'Wyszukaj rezerwacji', link: '/admin/search'},
        { name: 'Prośby o anulowanie', link: '/admin/cancel'},

    ]

    const location = useLocation();
    const path = location.pathname;
    const option = path.substring(path.lastIndexOf("/") + 1);

    const notificationProps = {
        setType: setType,
        setNotificationMessage: setNotificationMessage,
        setNavBarOpen: setNavBarOpen
    };

    return(
        <>
            <motion.div className="flex flex-col w-full min-h-screen md:flex-row"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.7, ease: "easeIn"}} >

                <div
                    className=" flex flex-col justify-center items-center space-y-5 bg-gray-200 px-14 py-14 md:w-1/5 md:h-screen md:text-left md:top-0 md:sticky md:py-0 md:left-0">
                    {options.map((option, index) => (
                        <NavLink
                            to={{pathname: option.link}}
                            className={({ isActive}) =>
                                `text-2xl font-serif w-fit hover:cursor-pointer hover:text-gray-500 hover:border-b-2 hover:border-gray-500
                                } ${isActive ? 'text-gray-500 border-b-2 border-gray-500' : ''}`
                            }
                            key={index}
                        >
                            {option.name}
                        </NavLink>
                    ))}
                </div>

                <div className="flex justify-center items-center h-fit min-h-screen md:w-4/5 md:ml-1/5 "
                     style={{
                         backgroundImage: `url(${mainPic})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'left',
                         transformOrigin: "top",
                         backgroundAttachment: 'fixed'
                     }}>

                    {!(option === "search" || option === "todays" || option === "cancel" || option === "edit") && (
                        <h1 className="text-white text-center font-serif drop-shadow-2xl p-10 w-full text-6xl md:text-8xl" style={{ backdropFilter: "brightness(60%)" }}>
                            CORNELIA STREET HOTEL
                        </h1>
                    )}

                    {option === "search" && <SearchReservation {...notificationProps} />}

                    {option === "todays" && <TodaysReservations {...notificationProps}/>}

                    {option === "cancel" && <CancelRequest {...notificationProps}/>}

                    {option === "edit" && <EditReservation {...notificationProps}/>}

                </div>
            </motion.div>
        </>
    )

}