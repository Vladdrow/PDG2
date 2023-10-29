import React, { createContext, useContext, useState } from "react";
import UserFrontend from "../models/UserFrontend";
/* import { verifyTokenApi } from "../api/auth.api"; */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

/*     var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.58.228:3010/verify", true);
    xhr.withCredentials = true;
    xhr.send(); */

    const login = (userData) => {
        // Crear una instancia de UserFrontend
        const userInstance = new UserFrontend(
            userData.ID,
            userData.CorreoElectronico
        );

        // Establecer propiedades de la instancia
        userInstance.setNombreCompleto(
            userData.Nombre,
            `${userData.ApellidoPaterno} ${userData.ApellidoMaterno}`
        );
        userInstance.setIsEditor(userData.IsEditor);
        userInstance.setIsPremium(userData.IsPremium);
        userInstance.fechaRegistro = userData.FechaRegistro;
        userInstance.fechaUltimoAcceso = userData.FechaUltimoAcceso;
        userInstance.rutaImagen = userData.RutaImagen;
        userInstance.nombreImagen = userData.NombreImagen;

        // Establecer el usuario en el estado
        setUser(userInstance);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };
/*     const verifyToken = async () => {
        try {
            const response = await verifyTokenApi();
            if (response.data.success) {
                setUser(response.data.user);
                console.log("usuario del token: ", response.data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Error verifying token:", error);
        }
    }; */

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
