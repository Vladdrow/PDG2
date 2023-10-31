import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import "../../assets/css/desktop/components/dashboard.css";

import UserManagement from "./UserManagement";
import NotificationsManagement from "./NotificationsManagement";
import EntitiesManagement from "./EntitiesManagement";
import SectionsManagement from "./SectionsManagement";
import MonitoringAnalysis from "./MonitoringAnalysis";

function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
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
                <Sidebar onSelect={setSelectedItem} onCollapsed={collapsed} />
                <div className={`canvas ${collapsed ? "full" : ""}`}>
                    <button
                        className={`btn-collapsed ${collapsed ? "pressed" : ""}`}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
                        </svg>
                    </button>
                    <Routes>
                        <Route path="entities-management" element={<EntitiesManagement />} />
                    </Routes>
                    <Routes>
                        <Route path="sections-management" element={<SectionsManagement />} />
                    </Routes>
                    <Routes>
                        <Route
                            path="notifications-management"
                            element={<NotificationsManagement />}
                        />
                    </Routes>
                    <Routes>
                        <Route path="user-management" element={<UserManagement />} />
                    </Routes>
                    <Routes>
                        <Route path="monitoring-analysis" element={<MonitoringAnalysis />} />
                    </Routes>
                </div>
            </main>
        </>
    );
}

export default Dashboard;
