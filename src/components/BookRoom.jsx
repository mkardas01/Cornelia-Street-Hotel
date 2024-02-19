import mainPic from "/assets/bookRoom.jpg";
import {TextField, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import {useState} from "react";

import SendIcon from "@mui/icons-material/Send.js";
import LoadingButton from "@mui/lab/LoadingButton";

import {useLocation, useParams} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';

import dayjs from "dayjs";
import "dayjs/locale/pl";

export default function BookRoom( props ) {

    const BASE_URL = "http://localhost:8080/api/";

    const [loading, setLoading] = useState(false);

    const {id} = useParams();
    const room = useLocation().state.room;
    const startDate = useLocation().state.startDate;
    const endDate = useLocation().state.endDate;
    const days = useLocation().state.days;

    dayjs.locale('pl');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [terms, setTerms] = useState('');

    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [termsError, setTermsError] = useState('');



    const valid = () => {
        let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(name.length === 0 )
            setNameError("Imię nie może pozostać puste");

        if(surname.length === 0)
            setSurnameError("Nazwisko nie może pozostać puste")

        if(email.length === 0)
            setEmailError("Email nie może pozostać pusty")
        else if(!reEmail.test(email))
            setEmailError("Podano nie poprawny adres email")

        if(phone.length === 0)
            setPhoneError("Numer telefonu nie może pozostać pusty")
        else if(phone.length !== 9)
            setPhoneError("Podano nie poprawny numer telefonu")

        return !(nameError.length>0 || surnameError.length>0 || emailError.length>0 || phoneError.length>0);

    }

    const handlePhoneNumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value === "" || regex.test(e.target.value)) && (phone.length <9 || e.nativeEvent.inputid === "deleteContentBackward")) {
            setPhone(e.target.value);
            setPhoneError('');
        }
    };

    const sendReservation = async () => {
        try {
            setLoading(true)
            console.log(name, surname, email, phone, id, startDate, endDate)
            const response = await axios.post(`${BASE_URL}reservation/reserve/${id}`, {
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone,
                    roomID: parseInt(id),
                    startDate: startDate.format("YYYY-MM-DD"),
                    endDate: endDate.format("YYYY-MM-DD")
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }


    const reserveRoom = (e) => {
        e.preventDefault();
        if(valid())
            sendReservation();
    }


    return (
        <>
            <div style={{backgroundImage: `url(${mainPic})`}}
                 className="flex flex-col justify-center items-center bg-cover bg-center w-full h-screen">

                <div className="flex flex-col justify-center items-center my-32 space-y-5 w-screen h-fit md:flex-row md:space-x-5 md:space-y-0">

                    <div className="flex flex-col bg-white w-3/4 rounded-3xl p-10 md:w-1/2 md:space-y-8 md:min-h-full">
                        <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">Dane rezerwującego</h1>

                        <form noValidate autoComplete="off" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <TextField
                                id="fName"
                                onChange={(e) => {setName(e.target.value); setNameError('')}}
                                label="Imię"
                                variant="outlined"
                                required
                                error={nameError.length > 0}
                                helperText={nameError}
                            />

                            <TextField
                                id="outlined-basic"
                                onChange={(e) => { setSurname(e.target.value); setSurnameError('')}}
                                label="Nazwisko"
                                variant="outlined"
                                required
                                error={surnameError.length > 0}
                                helperText={surnameError}
                            />


                            <TextField
                                id="outlined-basic"
                                onChange={(e) => {setEmail(e.target.value); setEmailError('')}}
                                label="Email"
                                variant="outlined"
                                required
                                error={emailError.length > 0}
                                helperText={emailError}
                            />

                            <TextField
                                id="outlined-basic"
                                onChange={(e) => handlePhoneNumber(e)}
                                value={phone}
                                label="Telefon"
                                variant="outlined"
                                required
                                maxLength="9"
                                error={phoneError.length > 0}
                                helperText={phoneError}
                            />

                            <FormControlLabel
                                required
                                label="Akceptuje regulamin pobytu"
                                control={<Checkbox />}
                                labelPlacement="start"
                                className="justify-self-start"

                            />



                        </form>
                    </div>

                    <div className="flex flex-col bg-white w-3/4 rounded-3xl p-10 space-y-5 md:w-1/4 md:h-full">

                        <div>
                            <p className="font-semibold flex justify-between">
                                <span>{startDate.format("DD MMM YYYY")}</span>
                                <span><FontAwesomeIcon icon={faArrowRight}/></span>
                                <span>{endDate.format("DD MMM YYYY")}</span>
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Liczba osób:</p>
                                <p className="font-medium">{room.size}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Wybrany pokój:</p>
                                <p className="font-medium">{room.name}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Cena:</p>
                                <p className="font-medium">{room.price * days} zł </p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500 hover:cursor-pointer">Zmień ofertę</p>
                            </div>


                            <LoadingButton
                                endIcon={<SendIcon />}
                                onClick={reserveRoom}
                                loading={loading}
                                loadingPosition="end"
                                variant="filled"
                                id="submit"
                                disabled={nameError.length > 0 || surnameError.length > 0 || emailError.length > 0 || phoneError.length > 0}
                                className="col-span-2"
                            >
                                <span>Rezerwuj</span>

                            </LoadingButton>

                    </div>

                </div>
            </div>


        </>

    );

}
