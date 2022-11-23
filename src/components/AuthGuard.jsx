import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../config/ROUTES";
import { AuthContext } from "../context/AuthContext";

function AuthGuard({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.GETSTARTED}></Navigate >
    }
    return <>{children}</>
}

export default AuthGuard;