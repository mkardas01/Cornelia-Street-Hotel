import {Snackbar, Alert} from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function ErrorBar({errorMessage, open, setOpen}) {


    const handleClose = () => {

        setOpen(false);
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>

    );

}
