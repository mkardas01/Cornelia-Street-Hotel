import {Button} from "@mui/material";
import buttonLabels from "../Variable/ButtonLabels.jsx";

export default function MenageButtons(setOpen, id, reservationNumber) {

    const handleClick = (action, id) => {
        console.log(action)
        setOpen({status: true, action: action, id: id, reservationNumber:reservationNumber});
    };


    return (
        <div className="grid grid-cols-2 gap-x-5">
            {buttonLabels.map((label, index) => (
                <Button
                    key={index}
                    variant="filled"
                    onClick={() => handleClick(index, id, reservationNumber)}
                >
                    {label.name}
                </Button>
            ))}
        </div>
    )
}