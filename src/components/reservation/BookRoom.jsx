import mainPic from "/assets/bookRoom.jpg";
import {TextField, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import {useState} from "react";
import SendIcon from "@mui/icons-material/Send.js";
import LoadingButton from "@mui/lab/LoadingButton";

import {motion} from "framer-motion";

import { jwtDecode } from 'jwt-decode'

import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

import axios from "../Variable/axios-instance.jsx";

import dayjs from "dayjs";
import "dayjs/locale/pl";
import Cookies from "js-cookie";
import {isAndroid} from "@mui/x-date-pickers/internals/hooks/useField/useField.utils.js";

export default function BookRoom(props) {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();
    const room = useLocation().state?.room;
    const startDate = useLocation().state?.startDate;
    const endDate = useLocation().state?.endDate;
    const days = useLocation().state?.days;

    dayjs.locale('pl');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [terms, setTerms] = useState(false);

    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');


    const [bookingResults, setBookingResults] = useState(false);
    const [bookingResultsData, setBookingResultsData] = useState();

    const token = Cookies.get('token');

    let user = token ? jwtDecode(Cookies.get("token")) : {};


    let headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        if (user && !name && !surname && !email && !props.isAdmin) {
            setName(user.name || '');
            setSurname(user.surname || '');
            setEmail(user.sub || '');
        }
    }, []);

    useEffect(() => {
        if (!room) {
            navigate(-1, { replace: true });
        }
    }, [navigate, room]);

    const handlePhoneNumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value === "" || (regex.test(e.target.value) && e.target.value.length <= 9))) {
            setPhone(e.target.value);
            setPhoneError('');
        }
    };

    const sendReservation = async () => {
        try {
            setLoading(true)

            const response = await axios.post(`/reservation/reserve/${id}`, {
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone,
                    roomID: parseInt(id),
                    startDate: startDate,
                    endDate: endDate
                },
                {
                    headers: headers
                });

            setBookingResultsData(response.data);
            setBookingResults(true);
            props.setType("success");
            props.setNotificationMessage("Pokój został zarezerwowany");
            props.setNavBarOpen(true);

        } catch (error) {
            props.setType("error");
            props.setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            props.setNavBarOpen(true);

        } finally {
            setLoading(false);

        }
    }

    const valid = () => {
        let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let nameErrorText = "";
        let surnameErrorText = "";
        let emailErrorText = "";
        let phoneErrorText = "";

        if(name.length === 0)
            nameErrorText = "Imię nie może pozostać puste";

        if(surname.length === 0)
            surnameErrorText = "Nazwisko nie może pozostać puste";

        if(email.length === 0)
            emailErrorText = "Email nie może pozostać pusty";
        else if(!reEmail.test(email))
            emailErrorText = "Podano niepoprawny adres email";

        if(phone.length === 0)
            phoneErrorText = "Numer telefonu nie może pozostać pusty";
        else if(phone.length !== 9 || phone[0] === '0')
            phoneErrorText = "Podano niepoprawny numer telefonu";

        setNameError(nameErrorText);
        setSurnameError(surnameErrorText);
        setEmailError(emailErrorText);
        setPhoneError(phoneErrorText);

        return !(nameErrorText || surnameErrorText || emailErrorText || phoneErrorText || !terms) ;
    }


    const reserveRoom = (e) => {
        e.preventDefault();
        if(valid())
            sendReservation();
    }

    console.log(Object.keys(user).length, props.isAdmin)

    return (
        <>

            <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration: 0.8, ease: "easeIn", delay: 0.2}}
            >

            <div style={{backgroundImage: `url(${mainPic})`}}
                 className="flex flex-col justify-center items-center bg-cover bg-center w-full h-fit md:h-screen">
                {!bookingResults &&
                    <div
                        className="flex flex-col justify-center items-center my-32 space-y-5 w-screen h-fit md:flex-row md:space-x-5 md:space-y-0">
                        <div
                            className="flex flex-col bg-white w-3/4 rounded-3xl p-10 md:w-1/2 md:space-y-8 md:min-h-full">
                            <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">Dane rezerwującego</h1>

                            <form noValidate autoComplete="off" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <TextField
                                    id="fName"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setNameError('')
                                    }}
                                    label="Imię"
                                    variant="outlined"
                                    value={user && user.name && !props.isAdmin ? user.name : name}
                                    required
                                    error={nameError.length > 0}
                                    helperText={nameError}
                                    disabled={Object.keys(user).length === 0 || props.isAdmin ? false : true}
                                />

                                <TextField
                                    id="fSurname"
                                    onChange={(e) => {
                                        setSurname(e.target.value);
                                        setSurnameError('')
                                    }}
                                    label="Nazwisko"
                                    variant="outlined"
                                    value={user && user.surname && !props.isAdmin ? user.surname : surname}
                                    required
                                    error={surnameError.length > 0}
                                    helperText={surnameError}
                                    disabled={Object.keys(user).length === 0 || props.isAdmin ? false : true}
                                />


                                <TextField
                                    id="fEmail"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('')
                                    }}
                                    label="Email"
                                    variant="outlined"
                                    value={user && user.sub && !props.isAdmin ? user.sub : email}
                                    required
                                    error={emailError.length > 0}
                                    helperText={emailError}
                                    disabled={Object.keys(user).length === 0 || props.isAdmin ? false : true}
                                />

                                <TextField
                                    id="fPhone"
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
                                    control={<Checkbox/>}
                                    onClick={()=>setTerms(!terms)}
                                    labelPlacement="start"
                                    className="justify-self-start"

                                />


                            </form>
                        </div>

                        <div className="flex flex-col bg-white w-3/4 rounded-3xl p-10 space-y-5 md:w-1/4 md:h-full">

                            <div>
                                <p className="font-semibold flex justify-between">
                                    <span>{dayjs(startDate).format("DD MMM YYYY")}</span>
                                    <span><FontAwesomeIcon icon={faArrowRight}/></span>
                                    <span>{dayjs(endDate).format("DD MMM YYYY")}</span>
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Liczba osób:</p>
                                <p className="font-medium">{room?.size}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Wybrany pokój:</p>
                                <p className="font-medium">{room?.name}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Cena:</p>
                                <p className="font-medium">{room?.price * days} zł </p>
                            </div>

                            <LoadingButton
                                endIcon={<SendIcon/>}
                                onClick={reserveRoom}
                                loading={loading}
                                loadingPosition="end"
                                variant="filled"
                                id="submit"
                                disabled={nameError.length > 0 || surnameError.length > 0 || emailError.length > 0 || phoneError.length > 0 || !terms}
                                className="col-span-2"
                            >
                                <span>Rezerwuj</span>

                            </LoadingButton>

                        </div>
                    </div>
                }
                {bookingResults &&
                    <motion.div
                        className="flex flex-col justify-center items-center my-32 space-y-5 w-screen h-fit md:flex-row md:space-x-5 md:space-y-0"
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{duration: 0.8, ease: "easeIn", delay: 0.2}}
                    >

                        <div
                            className="flex flex-col bg-white w-3/4 space-y-2 rounded-3xl p-10 md:w-1/2  min-h-full">

                            <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">Twoja rezerwacja została
                                potwierdzona</h1>

                            <div className="pb-5">
                                <p className="font-semibold flex justify-between mb-5">
                                    <span>{dayjs(startDate).format("DD MMM YYYY")}</span>
                                    <span><FontAwesomeIcon icon={faArrowRight}/></span>
                                    <span>{dayjs(endDate).format("DD MMM YYYY")}</span>
                                </p>

                                <p className="font-medium text-gray-500">Pokój: <span
                                    className="text-black font-medium">{room?.name}</span></p>
                                <p className="font-medium text-gray-500">Numer pokoju: <span
                                    className="text-black font-medium">{room?.number}</span></p>
                                <p className="font-medium text-gray-500">Piętro: <span
                                    className="text-black font-medium">{room?.floorNumber}</span></p>
                            </div>


                            <p className="font-medium text-gray-500">Imię: <span
                                className="text-black font-medium">{bookingResultsData?.name}</span></p>

                            <p className="font-medium text-gray-500">Naziwsko: <span
                                className="text-black font-medium">{bookingResultsData?.surname}</span></p>

                            <p className="font-medium text-gray-500">E-mail: <span
                                className="text-black font-medium">{bookingResultsData?.email}</span></p>

                            <p className="font-medium text-gray-500">Numer rezerwacji: <span
                                className="text-black font-medium">{bookingResultsData?.reservationNumber}</span></p>

                            <p className="font-medium text-gray-500">Telefon: <span
                                className="text-black font-medium">{bookingResultsData?.phone}</span></p>

                            <h2 className="pt-10 text-sm font-medium text-gray-500">W razie niezgodności podanych
                                powyżej danych prosimy o kontakt</h2>
                        </div>

                    </motion.div>

                }

            </div>


            </motion.div>
        </>

    );

}
