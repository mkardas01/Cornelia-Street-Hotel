import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import {useState} from "react";

export default function AuthForm({ title, passwordRepeatLabel, buttonText, linkText, linkPath }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordRepeatError, setPasswordRepeatError] = useState("");

    const valid = () => {
        let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let emailError = "";
        let passwordError = "";
        let passwordRepeatError = "";

        console.log(email, password, passwordRepeat)

        if(email.length === 0)
            emailError = "E-mail nie może pozostać pusty";
        else if(!reEmail.test(email))
            emailError = "Podano niepoprawny e-mail";


        if(password.length === 0)
            passwordError = "Hasło nie może pozostać puste";

        if(password.length < 8){
            passwordError = "Hasło musi zawierac conajmniej 8 znaków"
            passwordRepeatError = "Hasło musi zawierac conajmniej 8 znaków";

        }


        if(passwordRepeat.length === 0 && passwordRepeatLabel)
            passwordRepeatError = "Hasło nie może pozostać puste";
        else if(password !== passwordRepeat && passwordRepeatLabel){
            passwordRepeatError = "Hasła się nie zgadzają";
            passwordError = "Hasła się nie zgadzają";
        }

        setEmailError(emailError);
        setPasswordError(passwordError);
        setPasswordRepeatError(passwordRepeatError);

        return !(emailError || passwordError || passwordRepeatError);
    }

    const login = () =>{
        if(valid())
            console.log('test');
    }

    return (
        <>
            <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">{title}</h1>
            <form className="flex flex-col justify-center items-center space-y-5 w-fit">
                    <TextField
                        id="fEmail"
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        required
                        autoComplete="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('')
                        }}
                        error={emailError.length > 0}
                        helperText={emailError}
                    />
                    <TextField
                        id="fPassword"
                        label="Hasło"
                        variant="outlined"
                        type="password"
                        fullWidth
                        required
                        autoComplete="new-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError('')
                        }}
                        error={passwordError.length > 0}
                        helperText={passwordError}
                    />
                    {passwordRepeatLabel && (
                        <TextField
                            id="fPasswordRepeat"
                            label={passwordRepeatLabel}
                            variant="outlined"
                            type="password"
                            fullWidth
                            required
                            autoComplete="new-password"
                            onChange={(e) => {
                                setPasswordRepeat(e.target.value);
                                setPasswordRepeatError('')
                            }}
                            error={passwordRepeatError.length > 0}
                            helperText={passwordRepeatError}
                        />
                    )}
                    <LoadingButton
                        endIcon={<SendIcon />}
                        loadingPosition="end"
                        variant="filled"
                        id="submit"
                        className="col-span-2"
                        onClick={login}
                    >
                        <span>{buttonText}</span>

                    </LoadingButton>

                <div className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-medium">{linkText}</p>
                    <Link to={{ pathname: linkPath }} className="font-bold hover:cursor-pointer">
                        {linkText === 'Zaloguj się' ? 'Zaloguj się' : 'Zarejestruj się'}
                    </Link>
                </div>
            </form>
        </>
    );
}
