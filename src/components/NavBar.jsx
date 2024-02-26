import { useState, useEffect } from "react";
import { useTransition,useSpring, animated} from "@react-spring/web";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


AnimatedSpan.propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.func,
};

function AnimatedSpan ({children, action}) {
    const [props, set] = useSpring(() => ({
        borderBottom: '0px solid white',
        transform: 'translateY(0px)',
        config: {duration: 50},
    }));

    return (
        <animated.span
            style={props}
            className="hover:cursor-pointer hover:text-gray-500 hover:pb-2"
            onMouseEnter={() => set({borderBottom: '2px solid white', transform: 'translateY(-5px)'})}
            onMouseLeave={() => set({borderBottom: '0px solid white', transform: 'translateY(0px)'})}
            onClick={action}
        >
            {children}
        </animated.span>
    );
}


export default function NavBar(props) {

    let history = useNavigate();

    const isLoggedIn = props.isLoggedIn;

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
    const [navBarColor, setNavBarColor] = useState(window.scrollY > window.innerHeight ? "#2d2d33" : "transparent");
    const [hiddeNavBar, setHiddeNavBar] = useState(false);

    let options = [
        { name: 'O nas', link: '/login' },
        isLoggedIn ? { name: 'Twoje rezerwacje', link: '/reservation' } : null,
        { name: isLoggedIn ? 'Wyloguj się' : 'Zaloguj się', link: isLoggedIn ? '/logout' : '/login' }
    ].filter(option => option != null);

    const transition = useTransition(isOpen, {
        from: { x: -100, y: -100, opacity: 0, borderRadius: '100%' }, // initial border radius
        enter: { x: 0, y: 0, opacity: 1, borderRadius: '0%' }, // enter border radius
        leave: { x: 0, y: -200, opacity: 0, borderRadius: '10%'},
        config: {duration: 500}
    });

    const AnimatedNavbarColor = useSpring({
        backgroundColor: navBarColor,
        config: {duration: 400},
    });

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const handleNavBarColor = () => {
        let color;

        if (window.location.pathname === "/login" || window.location.pathname === "/register") {
            setHiddeNavBar(true)
            color = "transparent"
        } else {
            setHiddeNavBar(false)
            color = (window.scrollY >= window.innerHeight - 100) ? "#2d2d33" : "transparent";

        }
        setNavBarColor(color);
    };


    useEffect(() => {

        window.addEventListener("scroll", handleNavBarColor);

        return () => {
            window.removeEventListener("scroll", handleNavBarColor);
        };

    }, []);


    useEffect(() => {

        handleNavBarColor();

    },[history]);



    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    return (
        <div style={{visibility: hiddeNavBar ? 'hidden' : 'visible'}}>
            {isMobile && !isOpen && (
                <div onClick={toggleNavbar} style={{ backgroundColor: '#2d2d33' }} className="flex flex-col justify-center items-center rounded-full w-12 h-12
                                                                                                    p-10 fixed top-2 left-2 z-10 hover:cursor-pointer">
                    <span className="space-y-2">
                        <div className="border-t-2 w-7 border-white"></div>
                        <div className="border-t-2 w-10 border-white"></div>
                        <div className="border-t-2 w-7 border-white"></div>
                    </span>
                    <span className="text-sm text-white mt-2 tracking-widest">MENU</span>
                </div>
            )}

            {isMobile && transition(
                (styles, item) => item &&
                    <animated.div style={{ ...styles, backgroundColor: '#2d2d33' }} className="text-white h-52 fixed top-0 w-full z-10">
                        <div className="mx-8 space-y-4 p-4 pb-8 md:hidden">
                            <span className="flex justify-start text-2xl hover:cursor-pointer w-fit " onClick={toggleNavbar}> x </span>
                            <div className="flex flex-col justify-center items-center space-y-4 font-bold">
                                {options.map((option, index) => (
                                    <AnimatedSpan key={index} action={toggleNavbar}>
                                        {option.name}
                                    </AnimatedSpan>
                                ))}
                            </div>
                        </div>
                    </animated.div>

            )}

            {!isMobile && (
                <animated.div style={{...AnimatedNavbarColor}} className="text-white h-20 fixed top-0 w-full z-10">
                    <div className="h-full flex justify-end items-center space-x-6 font-bold mx-8" >
                        {options.map((option, index) => (
                            <AnimatedSpan key={index}>
                                <Link to={{pathname: option.link}}> {option.name} </Link>
                            </AnimatedSpan>
                        ))}
                    </div>
                </animated.div>
            )}

        </div>
    );
}