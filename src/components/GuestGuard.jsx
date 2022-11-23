import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../config/ROUTES";
import { AuthContext } from "../context/AuthContext";


function GuestGuard({ children }) {
    const { isAuthenticated } = useContext(AuthContext)
    if (isAuthenticated) {
        return <Navigate to={`/${ROUTES.TODO}`} />
    }
    return <>{children}</>
}

export default GuestGuard