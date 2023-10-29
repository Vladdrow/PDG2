import React, { useState, useEffect } from "react";
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

const Header = ({ Pages, User = null, isHome = false }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderNavLinks = (
        showAll = true,
        specificIndex = null,
        omitFromEnd = 0
    ) => (
        <>
            {(showAll
                ? Pages.slice(0, Pages.length - omitFromEnd)
                : [Pages[specificIndex]]
            ).map((page, index) => (
                <a key={index} href={page.path} className="nav-link">
                    {page.name}
                </a>
            ))}
        </>
    );

    const renderUserInfo = () => (
        <div className="user-info">
            <img
                src={User.PhotoURL}
                alt={`${User.Nombre} ${User.Apellido}`}
                className="user-photo"
            />
            <div className="notification-count">2</div>
            <div className="dropdown">
                <button
                    className="dropbtn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <p>
                        {User.Nombre} {User.Apellido}
                    </p>
                    <div
                        className={`dropdown-arrow ${
                            isDropdownOpen ? "rotated" : ""
                        }`}
                    ></div>
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-content">
                        <a href="/profile">Perfil</a>
                        <a href="/profile">Notificaciones</a>
                        <a href="/settings">Configuración</a>
                        <a href="/logout">Cerrar sesión</a>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <header className="site-header">
            <div className="logo-container">
                <a href="/">
                    <img
                        src={LogoLogistica}
                        alt="Logo del sitio"
                        className="site-logo"
                    />
                </a>
            </div>
            <nav className="site-nav">
                {isHome && !User && isMobile && (
                    <>
                        {renderNavLinks(false, Pages.length - 1)}
                        <button
                            className="btn"
                            onClick={() => console.log("Botón clickeado")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                            >
                                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </button>
                    </>
                )}
                {isHome && !User && !isMobile && renderNavLinks()}
                {User && isMobile && (
                    <>
                        {renderNavLinks(false, 0)}
                        {renderUserInfo()}
                    </>
                )}
                {User && !isMobile && (
                    <>
                        {renderNavLinks(true, null, 2)}{" "}
                        {/* Aquí se omite las dos últimas páginas */}
                        {renderUserInfo()}
                    </>
                )}
                {!isHome && !User && renderNavLinks()}
            </nav>
        </header>
    );
};

export default Header;
