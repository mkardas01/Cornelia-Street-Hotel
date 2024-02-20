import Login from "./Login.jsx";
import { useState } from "react";
import mainPic from "/assets/front.png";
import { motion } from "framer-motion";

function AnimatedDiv({ Child }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "fit-content" }}
                transition={{ duration: 0.8, ease: "easeIn" }}
            >
                <Child />
            </motion.div>
        </>
    );
}

export default function Login_Register(props) {
    const { type } = props;

    return (
        <>
            <div className="flex h-screen">
                <div style={{ backgroundImage: `url(${mainPic})`, backgroundSize: 'cover', backgroundPosition: 'left' }}
                     className="w-1/2 bg-black h-full">
                </div>
                <div className="flex flex-col justify-center items-center bg-gray-50 w-1/2 h-full ">
                    {type === "login" &&
                        <AnimatedDiv Child={Login} />
                    }
                    {type === "register" &&
                        <motion.div
                            initial={{opacity: 0, height: 0 }}
                            animate={{opacity: 1, height: "fit-content" }}
                            transition={{ duration: 0.8, ease: "easeIn" }}
                        >
                            <p>rejestracja</p>
                        </motion.div>
                    }
                </div>
            </div>
        </>
    );
}
