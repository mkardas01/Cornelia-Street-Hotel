import { useState, useEffect, useRef } from "react";
import { useSpring, animated  } from "@react-spring/web";

import mainPic from "../assets/main.jpg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import dayjs from "dayjs";

import "dayjs/locale/pl";



export default function Home() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const [arrivalDate, setArrivalDate] = useState(dayjs());
    const [departureDate, setDepartureDate] = useState(dayjs().add(1, 'day'));

    const divRef = useRef(null);

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


    return (
        <>
            <div ref={divRef} style={{ height: windowHeight, backgroundImage: `url(${mainPic})`, backgroundSize: 'cover',  }} 
                className="flex justify-center items-center " >

                <h1 className="text-white  text-center font-serif drop-shadow-2xl p-10 w-full text-6xl md:text-8xl" style={{backdropFilter: "brightness(60%)"}} >Cornelia Street Hotel</h1>

                <animated.div style={arrowAnimation} className="absolute bottom-0 flex justify-center">
                    <div className="w-1 h-8 absolute  bottom-0 mr-5 border-solid border-2 border-gray-400 -rotate-45"></div>
                    <div className="w-1 h-12 absolute bottom-1  border-solid border-2 border-gray-400"></div>
                    <div className="w-1 h-8 absolute  bottom-0 ml-5 border-solid border-2 border-gray-400 rotate-45"></div>
                </animated.div>
                

            </div>
            <div className="flex flex-col justify-center items-center space-y-6 h-52">

                <h1 className="text-xl">Zaplanuj swój pobyt razem z nami</h1>

                <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">

                        <DatePicker 
                            label="Dzień przyjazdu" 
                            format="DD/MM/YYYY" 
                            defaultValue={arrivalDate}
                            onChange={(newValue) => setArrivalDate(newValue)}
                            disablePast 
                        />

                        <DatePicker 
                            label="Dzień wyjazdu" 
                            format="DD/MM/YYYY" 
                            defaultValue={departureDate}
                            value={dayjs(arrivalDate).isAfter(departureDate) ? dayjs(arrivalDate).add(1, 'day') : departureDate}
                            minDate={dayjs(arrivalDate).add(1, 'day')}
                            onChange={(newValue) => setDepartureDate(newValue)}
                            disablePast 
                        />


                    </LocalizationProvider>

                   
                </div>
                
            </div>
        </>
    );
}
