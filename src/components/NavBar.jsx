import { useState, useEffect } from "react";



function MobileMenu(){
    return (
        <>
            <h1>test mobile</h1>
        </>
    )
}

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array to ensure effect only runs once on component mount

    return (
        <>
            {isMobile && (
                <div onClick={toggleNavbar} style={{ backgroundColor: '#2d2d33' }} className="flex flex-col justify-center items-center rounded-full w-12 h-12 
                                                                                                    p-10 mt-2 ml-2 hover:cursor-pointer md:hidden">
                    <span className="space-y-2">
                        <div className="border-t-2 w-7 border-white"></div>
                        <div className="border-t-2 w-10 border-white"></div>
                        <div className="border-t-2 w-7 border-white"></div>
                    </span>
                    <span className="text-sm text-white mt-2 tracking-widest">MENU</span>
                </div>
            )}

            {isOpen && isMobile && <MobileMenu />}
        </>
    );
}