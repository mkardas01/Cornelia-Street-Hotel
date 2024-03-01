import SearchReservation from "./SearchReservation.jsx";
import mainPic from "/assets/front.png";


export default function AdminPanel(){

    const options = [
        { name: 'Dzisiejsze rezerwacje'},
        { name: 'Wyszukaj rezerwacji'},
        { name: 'Prośby o anulowanie'}
    ]

    return(
        <>
            <div className="flex w-full min-h-screen">
                <div className="sticky top-0 left-0 h-screen flex flex-col justify-center text-left space-y-5 bg-gray-200 px-14 w-1/5">
                    {options.map((option, index) => (
                        <p className="text-2xl font-serif w-fit  hover:cursor-pointer hover:text-gray-500 hover:border-b-2 hover:border-gray-500" key={index}>{option.name}</p>
                    ))}
                </div>

                <div className="flex justify-center items-center w-4/5 ml-1/5"
                     style={{backgroundImage: `url(${mainPic})`, backgroundSize: 'cover', backgroundPosition: 'left', transformOrigin:"top"}}>
                    <SearchReservation />
                </div>
            </div>
        </>
    )

}