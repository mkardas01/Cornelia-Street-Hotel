import SearchReservation from "./SearchReservation.jsx";
import mainPic from "/assets/front.png";
import TodaysReservations from "./TodaysReservations.jsx";
import CancelRequest from "./CancelRequest.jsx";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function AdminPanel(){

    const options = [
        { name: 'Dzisiejsze rezerwacje', link: '/admin/todays'},
        { name: 'Wyszukaj rezerwacji', link: '/admin/search'},
        { name: 'Prośby o anulowanie', link: '/admin/cancel'},
        
    ]

    const location = useLocation();
    const path = location.pathname;
    const option = path.substring(path.lastIndexOf("/") + 1);


    return(
        <>
            <div className="flex w-full min-h-screen">
                <div className="sticky top-0 left-0 h-screen flex flex-col justify-center text-left space-y-5 bg-gray-200 px-14 w-1/5">
                    {options.map((option, index) => (
                        <Link to={{ pathname: option.link }} className="text-2xl font-serif w-fit
                                hover:cursor-pointer hover:text-gray-500 hover:border-b-2 hover:border-gray-500" key={index}>
                            {option.name}
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center items-center w-4/5 ml-1/5 "
                     style={{
                         backgroundImage: `url(${mainPic})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'left',
                         transformOrigin: "top",
                         backgroundAttachment: 'fixed'
                     }}>

                    {!(option === "search" || option === "todays" || option === "cancel") && (
                        <h1 className="text-white text-center font-serif drop-shadow-2xl p-10 w-full text-6xl md:text-8xl" style={{ backdropFilter: "brightness(60%)" }}>
                            CORNELIA STREET HOTEL
                        </h1>
                    )}

                    {option === "search" && <SearchReservation/>}
                    {option === "todays" && <TodaysReservations/>}
                    {option === "cancel" && <CancelRequest/>}

                </div>
            </div>
        </>
    )

}