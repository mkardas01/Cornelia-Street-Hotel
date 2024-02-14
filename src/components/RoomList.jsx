import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";

export default function RoomList(rooms) {

    console.log(rooms);

    return (
        <>
            <div className="mx-auto flex flex-col justify-center w-3/4 h-fit md:flex-row mt-20 md:max-h-72">
                {/*img*/}
                <div className="md:w-1/2">
                    <img className="h-64 w-full object-cover rounded-t-3xl md:h-full md:rounded-tr-none md:rounded-l-3xl" src="../public/assets/main.jpg"  alt="image"/>
                </div>

                <div className="md:w-1/2 border-2 rounded-b-3xl border-t-0 py-4 px-3 space-y-2 md:border-l-0 md:border-t-2 md:rounded-l-none md:rounded-tr-3xl ">
                    {/*opis*/}
                    <div className="h-3/5 space-y-2 pb-2">
                        <h1 className="font-serif drop-shadow-2xl w-full text-3xl ">Folklore Retreat</h1>
                        <p className="overflow-hidden line-clamp-3">Witaj w Folklore Retreat - urokliwym pokoju
                            nasyconym
                            magią i tajemnicą. Stworzony, by zapewnić ucieczkę od codzienności</p>
                    </div>
                    <div className="flex flex-col h-2/5 justify-between">
                        {/* informacje techniczne */}
                        <div className="flex flex-col">
                            <span className="grid grid-cols-3 gap-2 text-l p-2 text-center">
                                <span><FontAwesomeIcon icon={faUser}/> 4</span>
                                <span><FontAwesomeIcon icon={faDoorOpen}/> 302</span>
                                <span><FontAwesomeIcon icon={faTag}/> 200 zł</span>
                            </span>
                        </div>
                        {/* przycisk */}
                        <div className="flex justify-center">
                            <Button variant="filled" endIcon={<FontAwesomeIcon icon={faArrowRight}/>}>
                                Wybierz
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
