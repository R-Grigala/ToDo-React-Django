import { Link } from "react-router-dom";
import ROUTES from "../config/ROUTES";
import ToDo from "../img/ToDo.png"
import { useEffect } from "react";
import defaultsToLocalStorage from "../functions/defaultsToLocalStorage";
import '../styles/GetStarted.css'

function GetStarted() {
    useEffect(() => {
        if (localStorage.getItem("IS_AUTHENTICATED") !== "1") {
            defaultsToLocalStorage()
        }
    }, [])

    return (
        <section className="section">
            <img alt="ToDo" src={ToDo} className="ToDo-img" />
            <h1 className='text-getstarted'>Keep Track Of Daily Tasks In Life</h1>
            <Link to={ROUTES.SIGNIN}>
                <button className='btn-getstarted'>Get Started</button>
            </Link>
        </section >
    );
}

export default GetStarted;