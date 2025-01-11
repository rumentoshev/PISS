import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isLoggedVal = sessionStorage.getItem("isLogged")
    if (isLoggedVal == "false"){
        return <Navigate to="/" />
    }
    return <Outlet />
}

export default ProtectedRoutes