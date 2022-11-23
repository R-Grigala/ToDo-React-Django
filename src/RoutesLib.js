import { Route, Routes as RoutesList } from "react-router-dom";
import { ROUTES_CONFIG } from "./config/ROUTES.js"


function RoutesLib() {
    return (
        <RoutesList>
            {ROUTES_CONFIG.map((route) => {
                const Page = route.page
                const Guard = route.guard
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Guard>
                                <Page />
                            </Guard>
                        }
                    >
                    </Route>
                )
            })}
            <Route path="*" element={<h1>Not Found</h1>} />
        </RoutesList>
    );
}

export default RoutesLib;