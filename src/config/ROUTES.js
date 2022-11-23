import { ToDo, SignIn, GetStarted } from "../pages/index.js";
import GuestGuard from "../components/GuestGuard"
import AuthGuard from "../components/AuthGuard"


const ROUTES = {
    GETSTARTED: "/",
    SIGNIN: "signin",
    TODO: "todo",
};

const ROUTES_CONFIG = [
    {
        path: ROUTES.GETSTARTED,
        guard: GuestGuard,
        page: GetStarted
    }, {
        path: ROUTES.SIGNIN,
        guard: GuestGuard,
        page: SignIn
    }, {
        path: ROUTES.TODO,
        guard: AuthGuard,
        page: ToDo
    }
]

export default ROUTES;
export { ROUTES_CONFIG };