import { userLogin } from "@/api/User";
import { HttpStatus } from "@/constants/Http_status";
import { TOAST_TYPE } from "@/constants/ToastType";
import { LoginType } from "@/types/User";
import { showToast } from "@/utils/Toast";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextProps = {
    token?: string | null;
    isAuthenticated: boolean;
    login: (data: LoginType) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    )

    const isAuthenticated = !!token;

    const navigate = useNavigate();

    const login = async (data: LoginType) => {
        const response = await userLogin(data);

        if(response?.status === HttpStatus.OK) {
            await localStorage.setItem('token', response?.data?.token);
            setToken(response?.data.token);
            navigate("/home")
        } else if(response?.status === HttpStatus.UNAUTHORIZED) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: response?.data?.message
            })
        } else {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de conexion !"
            })
        }
    }

    const logout = async () => {
        await localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be inside of AuthProvider");
    }

    return context;
}