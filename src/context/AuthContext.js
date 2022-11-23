import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({
    isAuthenticated: false
})
console.log();
function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("IS_AUTHENTICATED") === "1") {
            setIsAuthenticated("1")
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }