import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import ButtonLabels from "../Variable/ButtonLabels.jsx";
import axios from "../Variable/axios-instance.jsx";
import Cookies from "js-cookie";

export default function DialogWindow({open, setOpen, reservations, setReservations,setType, setNotificationMessage, setNavBarOpen }) {
    const handleClose = () => {
        setOpen({status: false, actionID: null, action:null, reservationId: null, reservationNumber:null});
    };

    const handleStatusChange = async () => {
        try{
            const token = Cookies.get("token");

            const response = await axios.post(`/admin/changeStatus`,
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

            setType("success");
            setNotificationMessage(`Wykonano akcję ${ButtonLabels[open.actionID]?.name} na rezerwacji ${open.reservationNumber}`)
            setNavBarOpen(true);


        }catch(error){
            setType("error");
            setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            setNavBarOpen(true);
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