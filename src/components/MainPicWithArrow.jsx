import {motion} from "framer-motion";

function Arrow({ scrollDown }) {
    return (
        <motion.div
            className="absolute bottom-0 flex justify-center cursor-pointer p-12"
            onClick={scrollDown}
            initial={{y: -10}}
            animate={{y: 0}}
            transition={{duration: 1, ease: "easeIn", delay: 1, repeat: Infinity, repeatType: "reverse"}}
        >
            <div className="w-1 h-8 absolute bottom-0 mr-5 border-solid border-2 border-gray-300 -rotate-45"></div>
            <div className="w-1 h-12 absolute bottom-1 border-solid border-2 border-gray-300"></div>
            <div className="w-1 h-8 absolute bottom-0 ml-5 border-solid border-2 border-gray-300 rotate-45"></div>
        </motion.div>


    );
}

export const MainPicWithArrow = ({mainPic, scrollDownDiv, title}) => {

    const scrollDown = (scrollDownDiv) => {
        scrollDownDiv?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <div style={{backgroundImage: `url(${mainPic})`, backgroundSize: 'cover',}}

                 className="flex justify-center items-center h-screen w-full">

                <h1 className="text-white text-center font-serif drop-shadow-2xl p-10 w-full text-6xl md:text-8xl"
                    style={{backdropFilter: "brightness(60%)"}}>{title}</h1>

                <Arrow scrollDown={() => scrollDown(scrollDownDiv)}/>

            </div>
        </>
    )

}