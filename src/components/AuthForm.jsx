import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

export default function AuthForm({ title, passwordRepeatLabel, buttonText, linkText, linkPath }) {
    return (
        <>
            <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">{title}</h1>
            <div className="flex flex-col justify-center items-center space-y-5 w-fit">
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
                {passwordRepeatLabel && (
                    <TextField
                        id="fPasswordRepeat"
                        label={passwordRepeatLabel}
                        variant="outlined"
                        type="password"
                        fullWidth
                        required
                    />
                )}
                <LoadingButton
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    variant="filled"
                    id="submit"
                    className="col-span-2"
                >
                    <span>{buttonText}</span>
                </LoadingButton>
                <div className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-medium">{linkText}</p>
                    <Link to={{ pathname: linkPath }} className="font-bold hover:cursor-pointer">
                        {linkText === 'Zaloguj się' ? 'Zaloguj się' : 'Zarejestruj się'}
                    </Link>
                </div>
            </div>
        </>
    );
}
