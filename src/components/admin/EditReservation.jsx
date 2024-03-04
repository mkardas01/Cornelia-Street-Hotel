import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {useLocation, useParams} from "react-router-dom";
import {TextField} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditReservation(){

    const reservation = useLocation().state.reservation;

    const BASE_URL = "http://localhost:8080/api";

    const editReservation = async () => {
        try{
            const token = Cookies.get("token");

            const resposne = await axios.post(`${BASE_URL}/edit`,
                {},
                {
                    headers: {"Authorization" : `Bearer ${token}`}
                }
            )

            console.log(resposne);

        }catch (error){
            console.log(error)
        }
    }

        return(
            <>
                <div
                     className="flex flex-col justify-center items-center bg-cover bg-center w-4/5 h-fit md:h-screen">
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
                                    defaultValue={reservation.name}
                                    required
                                />

                                <TextField
                                    id="fSurname"
                                    label="Nazwisko"
                                    variant="outlined"
                                    defaultValue={reservation.surname}
                                    required
                                />


                                <TextField
                                    id="fEmail"
                                    label="Email"
                                    variant="outlined"
                                    defaultValue={reservation.email}
                                    required
                                />

                                <TextField
                                    id="fPhone"
                                    label="Telefon"
                                    variant="outlined"
                                    required
                                    defaultValue={reservation.phone}
                                    maxLength="9"
                                />

                            </form>

                            <p className="font-medium text-gray-500">
                                Zmiana daty rezerwacji jest niemożliwa, należy najpierw anulować rezerwację i dokonać ponownej rezerwacji w innym terminie.
                            </p>

                        </div>

                        <div className="flex flex-col bg-white w-3/4 rounded-3xl p-10 space-y-5 md:w-2/5 md:h-full">

                            <div>
                                <p className="font-semibold flex justify-between">
                                    <span>{dayjs(reservation.startDate).format("DD MMM YYYY")}</span>
                                    <span><FontAwesomeIcon icon={faArrowRight}/></span>
                                    <span>{dayjs(reservation.endDate).format("DD MMM YYYY")}</span>
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Numer rezerwacji:</p>
                                <p className="font-medium">{reservation.reservationNumber}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Nr pokoju:</p>
                                <p className="font-medium">{reservation.room.number}</p>
                            </div>

                            <div>
                                <p className="font-medium text-gray-500">Cena:</p>
                                <p className="font-medium">{dayjs(reservation.endDate).diff(dayjs(reservation.startDate), 'day') * reservation.room.price} zł </p>
                            </div>

                            <LoadingButton
                                endIcon={<SendIcon/>}
                                loadingPosition="end"
                                variant="filled"
                                id="submit"
                                onClick = {editReservation}
                                className="col-span-2"
                            >
                                <span>Edytuj</span>

                            </LoadingButton>

                        </div>
                    </div>
                </div>
            </>
        )
}