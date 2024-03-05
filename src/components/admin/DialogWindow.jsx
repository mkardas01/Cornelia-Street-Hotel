import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import ButtonLabels from "../Variable/ButtonLabels.jsx";
import axios from "axios";
import Cookies from "js-cookie";

export default function DialogWindow({open, setOpen, reservations, setReservations}) {

    const BASE_URL = "http://localhost:8080/api";

    const handleClose = () => {
        setOpen({status: false, actionID: null, action:null, reservationId: null, reservationNumber:null});
    };

    const handleStatusChange = async () => {
        try{
            const token = Cookies.get("token");

            const response = await axios.post(`${BASE_URL}/admin/changeStatus`,
                {
                    action: open.action,
                    id: parseInt(open.reservationId),
                    reservationNumber: open.reservationNumber
                },
                {headers: {"Authorization" : `Bearer ${token}`} })

            const updatedIndex = reservations.findIndex(reservation => reservation.id === response.data.id);

            if (updatedIndex !== -1) {
                const updatedReservations = [...reservations];
                updatedReservations[updatedIndex] = response.data;
                setReservations(updatedReservations);
            }


        }catch(error){
            console.log(error)
        }
        finally {
            handleClose();
        }
    }

    return (
        <>

            <Dialog
                open={open.status}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" >
                    {ButtonLabels[open.actionID]?.title } <br />
                    <p className="font-normal text-sm">{"Rezerwacja: " + open.reservationNumber}</p>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {ButtonLabels[open.actionID]?.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Odrzuć
                    </Button>
                    <Button onClick={handleStatusChange} autoFocus>
                        Potwierdź
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}