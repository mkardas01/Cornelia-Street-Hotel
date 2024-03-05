import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {useLocation, useNavigate,} from "react-router-dom";
import {TextField} from "@mui/material";
import dayjs from "dayjs";
import axios from "../Variable/axios-instance.jsx";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {statusMessages} from "../Variable/ReservationStatus.jsx";
import {motion} from "framer-motion";
export default function EditReservation(props){

    const navigate = useNavigate();
    const data = useLocation().state?.reservation;

    const [reservation, setReservation] = useState(data)

    const [name, setName] = useState(reservation?.name);
    const [surname, setSurname] = useState(reservation?.surname);
    const [email, setEmail] = useState(reservation?.email);
    const [phone, setPhone] = useState(reservation?.phone);

    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (!reservation) {
            navigate(-1, { replace: true });
        }
    }, [navigate, reservation]);

    const editReservation = async () => {
        try{
            const token = Cookies.get("token");

            const response = await axios.post(`/admin/edit`,
                {
                    id: parseInt(reservation.id),
                    name:name,
                    surname:surname,
                    email:email,
                    phone:phone,
                    reservationNumber:reservation.reservationNumber
                },
                {
                    headers: {"Authorization" : `Bearer ${token}`}
                }
            )

            props.setType("success");
            props.setNotificationMessage(`Poprawnie zaaktualizowano rezerwacje o numerze: ${response.data.reservationNumber}`)
            props.setNavBarOpen(true);

            setReservation(response.data)
            setDisabled(true);

            setTimeout(() => {
                navigate("/admin", {replace: true});
            },3000)



        }catch (error){
            props.setType("error");
            props.setNotificationMessage(error?.response?.data?.message ? error.response.data.message : "Przepraszamy wystąpił błąd w trakcie komunikacji z serwerem");
            props.setNavBarOpen(true);
        }
    }

    const handlePhoneNumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value === "" || (regex.test(e.target.value) && e.target.value.length <= 9))) {
            setPhone(e.target.value);
            setPhoneError('');
        }
    };

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

        return !(nameErrorText || surnameErrorText || emailErrorText || phoneErrorText) ;
    }

    const sendReservation = () => {
        if(valid())
            editReservation()
    }

        return(
            <>
                <motion.div
                     className="flex flex-col justify-center items-center bg-cover bg-center w-4/5 h-fit md:h-screen"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}
                     transition={{duration: 0.7, ease: "easeIn"}}
                >
                    <div
                        className="flex flex-col justify-center items-center my-32 space-y-5 w-full h-fit md:flex-row md:space-x-5 md:space-y-0">
                        <div
                            className="flex flex-col bg-white w-3/4 rounded-3xl p-10 md:w-3/4 md:space-y-8 md:min-h-full">
                            <h1 className="font-serif drop-shadow-2xl text-xl mb-5 md:text-2xl">Dane rezerwacji</h1>

                            <form noValidate autoComplete="off" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <TextField
                                    id="fName"
                                    label="Imię"
                                    variant="outlined"
                                    value = {name}
                                    required
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setNameError('')
                                    }}
                                    error={nameError.length > 0}
                                    helperText={nameError}
                                    disabled={disabled}
                                />

                                <TextField
                                    id="fSurname"
                                    label="Nazwisko"
                                    variant="outlined"
                                    value = {surname}
                                    required
                                    onChange={(e) => {
                                        setSurname(e.target.value);
                                        setSurnameError('')
                                    }}
                                    error={surnameError.length > 0}
                                    helperText={surnameError}
                                    disabled={disabled}
                                />


                                <TextField
                                    id="fEmail"
                                    label="Email"
                                    variant="outlined"
                                    value = {email}
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('')
                                    }}
                                    error={emailError.length > 0}
                                    helperText={emailError}
                                    disabled={disabled}
                                />

                                <TextField
                                    id="fPhone"
                                    label="Telefon"
                                    variant="outlined"
                                    value = {phone}
                                    required
                                    onChange={(e) => {
                                        handlePhoneNumber(e);
                                        setPhoneError('')
                                    }}
                                    maxLength="9"
                                    error={phoneError.length > 0}
                                    helperText={phoneError}
                                    disabled={disabled}
                                />

                            </form>

                            <p className="font-medium text-gray-500">
                                Zmiana daty rezerwacji jest niemożliwa, należy najpierw anulować rezerwację i dokonać
                                ponownej rezerwacji w innym terminie.
                            </p>
                            <p className={`text-right font-semibold m-0  ${statusMessages[reservation?.status]?.className}`}>{statusMessages[reservation?.status]?.message}</p>


                        </div>

                        <div className="flex flex-col bg-white w-3/4 rounded-3xl p-10 space-y-5 md:w-2/5 md:h-full">

                            <div>
                            <p className="font-semibold flex justify-between">
                                    <span>{dayjs(reservation?.startDate).format("DD MMM YYYY")}</span>
                                    <span><FontAwesomeIcon icon={faArrowRight}/></span>
                                    <span>{dayjs(reservation?.endDate).format("DD MMM YYYY")}</span>
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Numer rezerwacji:</p>
                                <p className="font-medium">{reservation?.reservationNumber}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Nr pokoju:</p>
                                <p className="font-medium">{reservation?.room?.number}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Cena:</p>
                                <p className="font-medium">{dayjs(reservation?.endDate).diff(dayjs(reservation?.startDate), 'day') * reservation?.room?.price} zł </p>
                            </div>

                            <div className="flex justify-center items-end h-full">
                                <LoadingButton
                                    endIcon={<SendIcon/>}
                                    loadingPosition="end"
                                    variant="filled"
                                    id="submit"
                                    onClick = {sendReservation}
                                    className="col-span-2"
                                    disabled={disabled}
                                >
                                    <span>Edytuj</span>

                                </LoadingButton>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </>
        )
}