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

export default function DialogWindow({open, setOpen}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClose = () => {
        setOpen({status: false, action: null});
    };

    return (
        <>

            <Dialog
                open={open.status}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className=""
            >
                <DialogTitle id="responsive-dialog-title" >
                    {ButtonLabels[open.action]?.title}
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
                    <Button onClick={handleClose} autoFocus>
                        Potwierdź
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}