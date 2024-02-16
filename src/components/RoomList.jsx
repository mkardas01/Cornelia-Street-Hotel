import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight, faDoorOpen, faTag, faUser} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function RoomList({rooms, setShowRoom, setShowDatePicker, days}) {

    return (
        <>
            {
                rooms.map(room => (
                        <div  key={room.id}
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
                                    {/* informacje techniczne */}
                                    <div className="flex flex-col">
                                    <span className="grid grid-cols-3 gap-2 text-l p-2 text-center">
                                        <span><FontAwesomeIcon icon={faUser}/> {room.size}</span>
                                        <span><FontAwesomeIcon icon={faDoorOpen}/> {room.number}</span>
                                        <span><FontAwesomeIcon icon={faTag}/> {days * room.price} zł</span>
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
                    ))
            }

            <div style={{backgroundColor: '#2d2d33'}} className="flex flex-col justify-center items-center rounded-full w-12 h-12
                                                                 p-10 fixed bottom-2 right-2 z-10 hover:cursor-pointer"
                 onClick={() => {
                     setShowRoom(false)
                     setShowDatePicker(true)
                 }}
            >
                    <span className="space-y-2 text-5xl" >
                        <FontAwesomeIcon icon={faArrowLeft} style={{color: "#ffffff"}} />
                    </span>
            </div>

        </>

    );

}
