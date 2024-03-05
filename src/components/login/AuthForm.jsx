import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "../Variable/axios-instance.jsx";
import Cookies from 'js-cookie';


export default function AuthForm(props) {

    const BASE_URL = "http://localhost:8080/api/auth";

    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const [nameError, setNameError] = useState("");
    const [surNameError, setSurNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordRepeatError, setPasswordRepeatError] = useState("");

    const redirectHome = () => {
        setTimeout(async () => {

            window.location.reload();

        },3000);
    }

    const valid = () => {
        let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let nameError = "";
        let surNameError = "";
        let emailError = "";
        let passwordError = "";
        let passwordRepeatError = "";


        if(name.length === 0)
            nameError = "Imię nie może pozostać puste";

        if(surName.length === 0)
            surNameError = "Nazwisko nie może pozostać puste";

        if(email.length === 0)
            emailError = "E-mail nie może pozostać pusty";
        else if(!reEmail.test(email))
            emailError = "Podano niepoprawny e-mail";


        if(password.length === 0 && passwordRepeat.length === 0){
            passwordError = passwordRepeatError = "Hasło nie może pozostać puste";
        }
        else if(password !== passwordRepeat && props.passwordRepeatLabel){
            passwordRepeatError = passwordError = "Hasła się nie zgadzają";
        }
        else if(password.length < 8 && props.passwordRepeatLabel){
            passwordError = passwordRepeatError = "Hasło musi zawierac conajmniej 8 znaków"
        }


        setNameError(nameError);
        setSurNameError(surNameError);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setPasswordRepeatError(passwordRepeatError);

        return !(emailError || passwordError || passwordRepeatError);
    }


    const handleRegister = async () =>{
        try{
            const response = await axios.post(`/register`, {
                    name: name,
                    surname: surName,
                    email: email,
                    password: password,
                    passwordRepeat: passwordRepeat
                }
            );

            props.notification.setType('success');
            props.notification.setNotificationMessage('Twoje konto zostało utworzone, za chwile nastąpi przekierowanie');
            props.notification.setNavBarOpen(true);


            const token = response.data.token;
            Cookies.set('token', token, { expires: 7, secure: true });

            redirectHome();


        }catch(error){

            props.notification.setType("error");
            props.notification.setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            props.notification.setNavBarOpen(true);

        }

    }

    const handleLogin = async () =>{
        try{
            const response = await axios.post(`/login`, {
                    email: email,
                    password: password
                }
            );

            props.notification.setType('success');
            props.notification.setNotificationMessage('Zostałeś zalogowany, za chwile nastąpi przekierowanie');
            props.notification.setNavBarOpen(true);

            const token = response.data.token;
            Cookies.set('token', token, { expires: 1, secure: true });

            redirectHome();

        }catch(error){

            props.notification.setType("error");
            props.notification. setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            props.notification.setNavBarOpen(true);

        }

    }


    const handleAction = () =>{
        if(valid())
            if(props.passwordRepeatLabel)
                handleRegister()
            else
                handleLogin();

    }

    return (
        <>

            <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">{props.title}</h1>
            <form className="flex flex-col justify-center items-center space-y-5 w-fit">

                {props.passwordRepeatLabel && (
                    <>
                        <TextField
                            id="fName"
                            label="Imię"
                            variant="outlined"
                            fullWidth
                            required
                            autoComplete="new-password"
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameError('')
                            }}
                            error={nameError.length > 0}
                            helperText={nameError}
                        />

                        <TextField
                            id="fSurName"
                            label="Nazwisko"
                            variant="outlined"
                            fullWidth
                            required
                            autoComplete="new-password"
                            onChange={(e) => {
                                setSurName(e.target.value);
                                setSurNameError('')
                            }}
                            error={surNameError.length > 0}
                            helperText={surNameError}
                        />
                    </>
                )}

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
                    {props.passwordRepeatLabel &&
                        <>
                            <TextField
                                id="fPasswordRepeat"
                                label={props.passwordRepeatLabel}
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


                        </>


                    }
                    <LoadingButton
                        endIcon={<SendIcon />}
                        loadingPosition="end"
                        variant="filled"
                        id="submit"
                        className="col-span-2"
                        onClick={handleAction}
                    >
                        <span>{props.buttonText}</span>

                    </LoadingButton>

                <div className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-medium">{props.linkText}</p>
                    <Link to={{ pathname: props.linkPath }} className="font-bold hover:cursor-pointer">
                        {props.linkText === 'Zaloguj się' ? 'Zaloguj się' : 'Zarejestruj się'}
                    </Link>
                </div>
            </form>
        </>
    );
}
