import {Button} from "@mui/material";
import ButtonLabels from "../Variable/ButtonLabels.jsx";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

export default function MenageButtons(startDate, setOpen, id, reservationNumber, currentStatus, reservation) {

    const handleClick = (action) => {
        setOpen({status: true, actionID: action, action:ButtonLabels[action].status, reservationId: id, reservationNumber:reservationNumber});
    };

    const today = dayjs();
    const disabled = dayjs(startDate).isBefore(today, 'day')

    const ReservationButton = (status, name, index) => {

        return(
            <Button
                key={status}
                variant="filled"
                onClick={() => handleClick(index)}
                disabled={disabled}
            >
                {name}
            </Button>
        )
    }

    console.log(currentStatus)

    return (
        <div className="grid grid-cols-2 gap-x-5">
            {ButtonLabels.map((label, index) => (
                (label.status !== "EDIT" && (label.status !== "CANCEL_ACCEPTED" && label.status !== "CANCEL_REJECTED")) ? (
                    ReservationButton(label.status, label.name, index)
                ) : (
                    label.status === "EDIT" ? (
                        <Link
                            key={label.status}
                            to={disabled ? undefined : { pathname: 'reservation/' + reservationNumber + '/edit' }}
                            state={{reservation: reservation}}
                            className={`flex justify-center items-center ${disabled && 'hover:cursor-default'}`}
                        >
                            <Button
                                variant="filled"
                                disabled={disabled}
                            >
                                {label.name}
                            </Button>
                        </Link>
                    ) : (
                        currentStatus.includes("CANCEL_") &&
                            ReservationButton(label.status, label.name, index)
                        )
                    )
                )
            )}
        </div>
    )
}