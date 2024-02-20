import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {Link} from "react-router-dom";
export default function Login() {


    return (
        <>
                    <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">Zaloguj się do swojego konta</h1>
                    <div className="flex flex-col justify-center items-center px-8  space-y-5 w-fit ">
                        <TextField
                            id="fEmail"
                            label="E-mail"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            id="fPassword"
                            label="Hasło"
                            variant="outlined"
                            type="password"
                            fullWidth
                            required
                        />

                        <LoadingButton
                            endIcon={<SendIcon/>}
                            loadingPosition="end"
                            variant="filled"
                            id="submit"
                            className="col-span-2"
                        >
                            <span>Zaloguj się</span>

                        </LoadingButton>

                        <p className="font-medium">Nie masz konta? &nbsp;
                            <Link to={{ pathname: '/register'}} className="font-bold hover:cursor-pointer">
                                Zarejestruj się
                            </Link>
                        </p>

                    </div>
        </>
    )
}