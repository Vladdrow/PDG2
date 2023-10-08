import React, { createContext, useContext, useState } from "react";
import UserFrontend from "../models/UserFrontend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userData) => {
        // Crear una instancia de UserFrontend
        const userInstance = new UserFrontend(
            userData.ID,
            userData.CorreoElectronico
        );

        // Establecer propiedades de la instancia
        userInstance.setNombreCompleto(
            userData.Nombre,
            userData.ApellidoPaterno + " " + userData.ApellidoMaterno
        );
        userInstance.setIsEditor(userData.TipoUsuario === "1");
        userInstance.setIsPremium(userData.isPremium);
        userInstance.fechaRegistro = userData.FechaRegistro;
        userInstance.fechaUltimoAcceso = userData.FechaUltimoAcceso;

        // Establecer el usuario en el estado
        setUser(userInstance);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
