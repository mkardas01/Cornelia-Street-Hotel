import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export function BackHome() {
    return (
        <>
            <Link to={{pathname: '/'}} >
                <div style={{backgroundColor: '#2d2d33'}} className="flex flex-col justify-center items-center rounded-full w-12 h-12
                                                                     p-10 fixed bottom-2 right-2 z-10 hover:cursor-pointer">
                    <span className="space-y-2 text-5xl" >
                        <FontAwesomeIcon icon={faArrowLeft} style={{color: "#ffffff"}}/>
                    </span>
                </div>
            </Link>
        </>
    )
}