import mainPic from "/assets/bookRoom.jpg";
import {TextField, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import {useState} from "react";
import SendIcon from "@mui/icons-material/Send.js";
import LoadingButton from "@mui/lab/LoadingButton";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function BookRoom() {

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
    }

    const handlePhoneNumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if ((e.target.value === "" || regex.test(e.target.value)) && (phone.length <9 || e.nativeEvent.inputType === "deleteContentBackward")) {
            setPhone(e.target.value);
            setPhoneError('');
        }
    };

    const reserveRoom = (e) => {
        e.preventDefault();
        valid();
    }


    return (
        <>
            <div style={{backgroundImage: `url(${mainPic})`}}
                 className="flex flex-col justify-center items-center
                 space-y-5
                 bg-cover bg-center w-full h-screen md:flex-row md:space-y-0 md:space-x-5">

                    <div className="flex flex-col  bg-white w-3/4 rounded-3xl p-10 md:w-1/2 md:h-96 md:space-y-8 ">
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

                <div className="flex flex-col bg-white w-3/4 h-96 p-10 rounded-3xl mb-32 space-y-5 md:w-1/4">

                    <div>
                        <p className="font-semibold flex justify-between">
                            <span>16 lut. 2024</span>
                            <span><FontAwesomeIcon icon={faArrowRight}/></span>
                            <span>19 lut. 2024</span>
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-500">Liczba osób:</p>
                            <p className="font-medium">2</p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-500">Wybrany pokój:</p>
                            <p className="font-medium">Flowers</p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-500">Wartośc pobytu:</p>
                            <p className="font-medium">2000 zł </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-500 hover:cursor-pointer">Zmień ofertę</p>
                        </div>


                        <LoadingButton
                            endIcon={<SendIcon />}
                            onClick={reserveRoom}
                            loadingPosition="end"
                            variant="filled"
                            type="submit"
                            disabled={nameError.length > 0 || surnameError.length > 0 || emailError.length > 0 || phoneError.length > 0}
                            className="col-span-2"
                        >
                            <span>Rezerwuj</span>

                        </LoadingButton>

                    </div>

                </div>


        </>

    );

}
