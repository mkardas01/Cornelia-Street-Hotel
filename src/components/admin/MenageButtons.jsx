import {Button} from "@mui/material";
import ButtonLabels from "../Variable/ButtonLabels.jsx";
import {Link} from "react-router-dom";

export default function MenageButtons(setOpen, id, reservationNumber, currentStatus) {

    const handleClick = (action) => {
        console.log(action)
        setOpen({status: true, actionID: action, action:ButtonLabels[action].status, reservationId: id, reservationNumber:reservationNumber});
    };

    console.log(currentStatus)

    return (
        <div className="grid grid-cols-2 gap-x-5">
            {ButtonLabels.map((label, index) => (
                (label.status !== "EDIT" && (label.status !== "CANCEL_ACCEPTED" && label.status !== "CANCEL_REJECTED")) ? (
                    <Button
                        key={label.status}
                        variant="filled"
                        onClick={() => handleClick(index)}
                    >
                        {label.name}
                    </Button>
                ) : (
                    label.status === "EDIT" ? (
                        <Link
                            key={label.status}
                            to={{pathname: 'editReservation/' + reservationNumber}}
                            state={{}}
                            className="flex justify-center items-center"
                        >
                            <Button variant="filled">
                                {label.name}
                            </Button>
                        </Link>
                    ) : (
                        currentStatus.includes("CANCEL_") &&
                            <Button
                                key={label.status}
                                variant="filled"
                                onClick={() => handleClick(index)}
                            >
                                {label.name}
                            </Button>
                        )
                    )
                )
            )}
        </div>
    )
}