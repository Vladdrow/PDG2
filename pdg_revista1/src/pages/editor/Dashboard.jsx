import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import "../../assets/css/desktop/components/dashboard.css";

import UserManagement from "./UserManagement";

function Dashboard() {
    const [selectedItem, setSelectedItem] = useState(""); // Paso 1
    const User = {
        ID: "12345", // ID único del usuario
        CorreoElectronico: "usuario@ejemplo.com", // Correo electrónico del usuario
        Nombre: "Juan", // Primer nombre del usuario
        Apellido: "Valencia", // Apellido del usuario (para simplificar, lo hemos dejado como un solo campo, pero puedes dividirlo en ApellidoPaterno y ApellidoMaterno si lo prefieres)
        IsEditor: false, // Indica si el usuario es un editor
        IsPremium: true, // Indica si el usuario tiene una suscripción premium
        FechaRegistro: "2023-01-01", // Fecha de registro del usuario
        FechaUltimoAcceso: "2023-09-01", // Última fecha de acceso del usuario
        /* photoURL: ImgUser, */ // URL de la foto del perfil del usuario
    };

    const EditorPages = [
        /* {
            name: "Inicio",
            path: "/editor",
        }, */
        /* {
            name: "ViewUsers",
            path: "/dashboard",
        }, */
        /* {
            name: "Gestionar Empresas",
            path: "/manage-companies",
        },
        {
            name: "Publicar Notificaciones",
            path: "/publish-notifications",
        },
        {
            name: "Gestionar Contenido",
            path: "/manage-content",
        },
        {
            name: "Estadísticas",
            path: "/statistics",
        },*/
        {
            name: "Cerrar Sesión",
            path: "/logout",
        },
    ];

    return (
        <>
            <Header Pages={EditorPages} User={User} />
            <main className="dashboard-container">
                <Sidebar onSelect={setSelectedItem} />
                <div className="canvas">
                    <Routes>
                        <Route
                            path="user-management"
                            element={<UserManagement />}
                        />
                    </Routes>
                </div>
            </main>
        </>
    );
}

export default Dashboard;
