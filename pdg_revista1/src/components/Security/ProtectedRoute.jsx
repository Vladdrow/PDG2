import { Navigate, Outlet } from "react-router-dom";
/* import { useAuth } from "../../context/AuthContext"; */
function ProtectedRoute({
    isAllowed,  
    children,
    redirectTo = "/",
}) {
    if (!isAllowed) {
        return <Navigate to={redirectTo} /* "/login" */ />;
    }
    return children ? children : <Outlet />;
}

export default ProtectedRoute;
