import React, { useEffect, useState } from "react";
import "../../assets/css/desktop/pages/contact.css";

import Header from "../../components/Header/Header";
import ImgUser from "../../assets/resources/members/logo-user.png";
import { getSocialNetworks } from "../../api/content.api";
import config from "../../../config";
import Footer from "../../components/Footer/Footer";

function Contact() {
    const myIp = config.ipAddress;
    const baseURL = `http://${myIp}:3010`;

    const [socialNetworks, setSocialNetworks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const networks = await getSocialNetworks();
                setSocialNetworks(
                    networks.map((network) => ({
                        ...network,
                        RutaImagen: `${baseURL}/assets/${network.RutaImagen}${network.NombreImagen}`,
                    }))
                );
            } catch (error) {
                console.error("Error fetching networks:", error);
                setError(error);
            }
        };
        fetchNetworks();
    }, []);

    console.log("Networks fetched", socialNetworks);
    const User = {
        ID: "12345", // ID único del usuario
        CorreoElectronico: "usuario@ejemplo.com", // Correo electrónico del usuario
        Nombre: "Juan", // Primer nombre del usuario
        Apellido: "Valencia", // Apellido del usuario (para simplificar, lo hemos dejado como un solo campo, pero puedes dividirlo en ApellidoPaterno y ApellidoMaterno si lo prefieres)
        IsEditor: false, // Indica si el usuario es un editor
        IsPremium: true, // Indica si el usuario tiene una suscripción premium
        FechaRegistro: "2023-01-01", // Fecha de registro del usuario
        FechaUltimoAcceso: "2023-09-01", // Última fecha de acceso del usuario
        PhotoURL: ImgUser, // URL de la foto del perfil del usuario
    };
    const NewUserPages = [
        {
            name: "Explorar",
            path: "/explore",
        },
        {
            name: "Nosotros",
            path: "/about",
        },
        {
            name: "Contáctanos",
            path: "/contact",
        },
        {
            name: "Registrarse",
            path: "/register",
        },
        {
            name: "Iniciar Sesión",
            path: "/login",
        },
    ];

    return (
        <>
            <Header Pages={NewUserPages} User={User} />
            <main id="contact">
                <div>
                    <h1>Contáctanos</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ducimus molestias temporibus illum.{" "}
                    </p>
                </div>
                <div>
                    <div className="soc-networks">
                        {socialNetworks.map((social, index) => (
                            <div className="social-item" key={index}>
                                <div className="soc-it-div">
                                    <img
                                        src={social.RutaImagen}
                                        alt={social.Nombre}
                                    />
                                    <h2
                                    /* href={social.Url}
                                        target="_blank"
                                        rel="noopener noreferrer" */
                                    >
                                        {social.Nombre}
                                    </h2>
                                </div>
                                <a href={social.Url} target="_blanck">
                                    <h4>{social.Url}</h4>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="prueba"></div>
            </main>
            <Footer />
        </>
    );
}

export default Contact;
