

export default function AdminPanel(){

    const options = [
        { name: 'Dzisiejsze rezerwacje'},
        { name: 'Wyszukaj rezerwacji'},
        { name: 'Prośby o anulowanie'}
    ]

    return(
        <>
            <div className="flex w-full min-h-screen">
                <div className="bg-gray-800 flex flex-col justify-center text-white text-left space-y-5 px-14 w-1/5">
                    {options.map((option, index) => (
                        <p className="text-2xl font-serif  hover:cursor-pointer hover:text-gray-500 hover:border-b-2" key={index}>{option.name}</p>
                    ))}
                </div>

                <div className="bg-gray-600 w-4/5">

                </div>
            </div>
        </>
    )

}