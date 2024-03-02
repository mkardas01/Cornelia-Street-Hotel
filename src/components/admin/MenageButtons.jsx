import {Button} from "@mui/material";
import buttonLabels from "../Variable/ButtonLabels.jsx";

export default function MenageButtons(setOpen) {

    const handleClick = (action) => {
        console.log(action)
        setOpen({status: true, action: action});
    };


    return (
        <div className="grid grid-cols-2 gap-x-5">
            {buttonLabels.map((label, index) => (
                <Button
                    key={index}
                    variant="filled"
                    onClick={() => handleClick(index)}
                >
                    {label.name}
                </Button>
            ))}
        </div>
    )
}