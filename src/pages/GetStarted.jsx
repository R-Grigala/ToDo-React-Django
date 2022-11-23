import { Link } from "react-router-dom";
import ROUTES from "../config/ROUTES";
import ToDo from "../img/ToDo.png"
import { useEffect } from "react";
import defaultsToLocalStorage from "../functions/defaultsToLocalStorage";

function GetStarted() {
    useEffect(() => {
        if (localStorage.getItem("IS_AUTHENTICATED") !== "1") {
            defaultsToLocalStorage()
        }
    }, [])

    return (
        <section className="bg-black text-center h-screen px-8">
            <img alt="ToDo" src={ToDo} className="pt-10 mx-auto w-[90.36px] pt-16" />
            <h1 className='text-white text-3xl sm:text-4xl md1000:text-[54px] font-semibold mt-11 font-main'>Keep Track Of Daily Tasks In Life</h1>
            <Link to={ROUTES.SIGNIN}>
                <button className='bg-main-green font-light text-[28px] md1000:text-[48px] mt-24 sm:mt-40 px-10 py-4 rounded'>Get Started</button>
            </Link>
        </section >
    );
}

export default GetStarted;