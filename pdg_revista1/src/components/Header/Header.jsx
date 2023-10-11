import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/desktop/components/header.css";

/* Resource */
import Search from "../../assets/svg/search-sharp.svg";
import LogoLogistica from "../../assets/img/logos/logo-revista.png";
import LogoUser from "../../assets/img/logos/logo-user.png";

/* Components */
import DropdownMenu from "../Global/DropdownMenu";
import LinkTo from "../Global/LinkTo";
import AuthUser from "./components/AuthUser";

import "./header.css"; // Estilos para el header

const Header = ({ Pages, user = null }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <header className="site-header">
            <div className="logo-container">
                <img
                    src={LogoLogistica}
                    alt="Logo del sitio"
                    className="site-logo"
                />
            </div>
            <nav className="site-nav">
                {Pages.slice(0, /* user ? 3 :  */5).map((page, index) => (
                    <a key={index} href={page.path} className="nav-link">
                        {page.name}
                    </a>
                ))}
                {user && (
                    <div className="user-info">
                        <img
                            src={user.photoURL}
                            alt={user.Nombre}
                            className="user-photo"
                        />
                        {2 > 0 && (
                            <div className="notification-count">
                                2 {/* {notificationCount} */}
                            </div>
                        )}
                        <div className="dropdown">
                            <button
                                className="dropbtn"
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                            >
                                {user.Nombre} {user.Apellido}
                                <div className={`dropdown-arrow ${isDropdownOpen ? 'rotated': ''}`}></div>
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-content">
                                    {/* Aquí puedes agregar más opciones */}
                                    <a href="/profile">Perfil</a>
                                    <a href="/profile">Notificaciones</a>
                                    <a href="/settings">Configuración</a>
                                    <a href="/logout">Cerrar sesión</a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
/* function Header({ User, Pages }) {
    return (
        <header>
            <section className="first-container">
                <div className="img-logo">
                    <div className="img-2-logo">
                        <img src={LogoLogistica} alt="Logistics logo" />
                    </div>
                </div>
                <div className="link-nav-user">
                    <div className="link-nav">
                        {Pages.map((page, index) => (
                            <LinkTo key={index} Page={page} />
                        ))}
                    </div>
                    // <AuthUser User={User} /> 
                </div>
            </section>
        </header>
    );
}

export default Header; */
