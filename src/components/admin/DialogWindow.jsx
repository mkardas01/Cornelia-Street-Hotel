import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme
} from "@mui/material";
import ButtonLabels from "../Variable/ButtonLabels.jsx";
import axios from "axios";
import Cookies from "js-cookie";

export default function DialogWindow({open, setOpen}) {

    const BASE_URL = "http://localhost:8080/api";

    const handleClose = () => {
        setOpen({status: false, action: null, id: null, reservationNumber:null});
    };

    const handleStatusChange = async () => {
        try{
            const token = Cookies.get("token");

            const response = await axios.post(`${BASE_URL}/admin/changeStatus`,
                {
                    action: open.action,
                    id: open.id,
                    reservationNumber: open.reservationNumber
                },
                {headers: {"Authorization" : `Bearer ${token}`} })

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
                    {ButtonLabels[open.action]?.title } <br />
                    <p className="font-normal text-sm">{"Rezerwacja: " + open.reservationNumber}</p>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {ButtonLabels[open.action]?.message}
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