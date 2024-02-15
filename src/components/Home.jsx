import { useState, useEffect, useRef } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web";

import mainPic from "/assets/main.jpg";
import RoomList from './RoomList';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";

import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';


import dayjs from "dayjs";
import "dayjs/locale/pl";

import axios from 'axios';
import ErrorBar from "./ErrorBar.jsx";

export default function Home() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const [arrivalDate, setArrivalDate] = useState(dayjs());
    const [departureDate, setDepartureDate] = useState(dayjs().add(1, 'day'));

    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [showRoom, setShowRoom] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(true);
    const [days, setDays] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const scrollDownDiv = useRef(null);

    const BASE_URL = "http://localhost:8080/api/";


    const [openErrorBar, setOpenErrorBar] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const arrowAnimation = useSpring({
        loop: {reverse:true},
        from: { transform: 'translateY(-10px)' }, 
        to: { transform: 'translateY(0px)'}, 
        config: { tension: 300, friction: 10 }, 
      });

    const scrollDown = () => {
        scrollDownDiv.current?.scrollIntoView({behavior: 'smooth'});
    }

    const getAvailableRooms = async (startDate, endDate) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}room/find`, {
                params: {
                    startDate: dayjs(startDate).format("YYYY-MM-DD"),
                    endDate: dayjs(endDate).format("YYYY-MM-DD")
                }
            });
            if (response.data.length !== 0 ){
                setRooms(response.data);
                setShowRoom(true);
                setShowDatePicker(false)
                setDays(dayjs(endDate).diff(startDate, 'days'))
            }else{
                setOpenErrorBar(true)
                setErrorMessage("Brak dostępnych pokoi w tym terminie");
            }

        } catch (error) {
            setOpenErrorBar(true);
            setErrorMessage("Bład w czasie pobierania danych. Spróbuj ponownie później");
        } finally {
            setLoading(false);
        }
    }

    const transitionRooms = useTransition(showRoom, {
        from: { x: -100, opacity: 0}, // initial border radius
        enter: { x: 0, opacity: 1  }, // enter border radius
        leave: { x: -100, opacity: 0},
        config: {duration: 200}
    });

    const transitionDatePicker = useTransition(showDatePicker, {
        from: { x: -100, opacity: 0}, // initial border radius
        enter: { x: 0, opacity: 1  }, // enter border radius
        leave: { x: 100, opacity: 0},
        config: {duration: 400}
    });


    return (
        <>

            <ErrorBar errorMessage={errorMessage} open={openErrorBar} setOpen={setOpenErrorBar}/>

            <div  style={{ height: windowHeight, backgroundImage: `url(${mainPic})`, backgroundSize: 'cover',  }} 
                className="flex justify-center items-center " >
                <h1 className="text-white  text-center font-serif drop-shadow-2xl p-10 w-full text-6xl md:text-8xl" style={{backdropFilter: "brightness(60%)"}} >Cornelia Street Hotel</h1>

                <animated.div style={arrowAnimation} className="absolute bottom-0 flex justify-center cursor-pointer p-12" onClick={scrollDown}>
                    <div className="w-1 h-8 absolute  bottom-0 mr-5 border-solid border-2 border-gray-500 -rotate-45"></div>
                    <div className="w-1 h-12 absolute bottom-1  border-solid border-2 border-gray-500"></div>
                    <div className="w-1 h-8 absolute  bottom-0 ml-5 border-solid border-2 border-gray-500 rotate-45"></div>
                </animated.div>
                

            </div>

            <div ref={scrollDownDiv} >
                {transitionDatePicker(
                    (styles, item) => item &&
                        <animated.div style={styles} className="bg-gray-100 ">
                            <div className="flex flex-col justify-center items-center text-center py-20 ">

                                <div className="space-y-3 px-10 mx-4">
                                    <h1 className="text-5xl font-serif">WITAMY W CORNELIA STREET HOTEL</h1>
                                    <h2 style={{color: '#a29010'}} className="text-xl">gdzie zachwycające słońce Kalifornii spotyka się z niepowtarzalnym stylem i atmosferą. </h2>
                                </div>
                                <br></br> <br></br>


                                <div className=" mx-20 text-center text-xl md:mx-36">
                                    Nasz hotel zaprasza Cię do odkrycia harmonii pomiędzy nowoczesnością a relaksem, oferując unikalne doświadczenia w każdym detalu.
                                </div>


                            </div>

                            <div className="flex flex-col justify-start items-center space-y-6 text-center px-8 pb-20">

                                <h1 className="text-xl">Zaplanuj swój pobyt razem z nami</h1>

                                <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0" >
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">

                                        <DatePicker
                                            label="Dzień przyjazdu"
                                            format="DD/MM/YYYY"
                                            defaultValue={arrivalDate}
                                            onChange={(newValue) => setArrivalDate(newValue)}
                                            disabled={loading}
                                            disablePast
                                        />

                                        <DatePicker
                                            label="Dzień wyjazdu"
                                            format="DD/MM/YYYY"
                                            defaultValue={departureDate}
                                            value={dayjs(arrivalDate).isAfter(departureDate) ? dayjs(arrivalDate).add(1, 'day') : departureDate}
                                            minDate={dayjs(arrivalDate).add(1, 'day')}
                                            onChange={(newValue) => setDepartureDate(newValue)}
                                            disabled={loading}
                                            disablePast
                                        />


                                    </LocalizationProvider>


                                    <LoadingButton
                                        onClick={() => getAvailableRooms(arrivalDate, departureDate)}
                                        endIcon={<SendIcon />}
                                        loading={loading}
                                        loadingPosition="end"
                                        variant="filled"
                                    >
                                        <span>Wyszukaj</span>
                                    </LoadingButton>


                                </div>

                            </div>
                        </animated.div>
                    )
                }

                {transitionRooms(
                    (styles, item) => item &&
                        <animated.div style={styles} >
                            <RoomList rooms={rooms} showRoom={showRoom} setShowRoom={setShowRoom} setShowDatePicker={setShowDatePicker} days={days}/>
                        </animated.div>
                )}
            </div>



        </>
    );
}
