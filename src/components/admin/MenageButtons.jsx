import {Button} from "@mui/material";
import ButtonLabels from "../Variable/ButtonLabels.jsx";

export default function MenageButtons(setOpen, id, reservationNumber) {

    const handleClick = (action) => {
        console.log(action)
        setOpen({status: true, actionID: action, action:ButtonLabels[action].status, reservationId: id, reservationNumber:reservationNumber});
    };


    return (
        <div className="grid grid-cols-2 gap-x-5">
            {ButtonLabels.map((label, index) => (
                <Button
                    key={label?.status}
                    variant="filled"
                    onClick={() => handleClick(index)}
                >
                    {label.name}
                </Button>
            ))}
        </div>
    )
}