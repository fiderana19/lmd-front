import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if(isAuthenticated) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoute;