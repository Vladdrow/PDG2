import React, { useEffect, useState } from "react";

import LogoContacto from "../../assets/img/logos/logo-revista.png";
import { Link } from "react-router-dom";
import "./footer.css";
import config from "../../../config";

import { getSocialNetworks } from "../../api/content.api.js";

function Footer({ showNetwork = false }) {
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

    console.log("Redes Sociales:", socialNetworks);
    return (
        <footer id="footer">
            <section className="magazine-name">
                <div className="img-lg-ft">
                    <Link to="/">
                        <img src={LogoContacto} alt="Magazine name" />{" "}
                    </Link>
                </div>
            </section>
            {showNetwork && (
                <section className="social-media-links">
                    <div className="title-social">
                        <p>Redes Sociales</p>
                    </div>
                    <div className="img-links">
                        {socialNetworks.map((social, index) => (
                            <a key={index} href={social.Url} target="_blank">
                                <img
                                    src={social.RutaImagen}
                                    alt={social.Nombre}
                                />
                            </a>
                        ))}
                    </div>
                </section>
            )}
            {/* <section className="nav-footer">
                {navLinks.map((navLink, index) => (
                    <a key={index} href={navLink.link} target="_blank">
                        {navLink.text_nav}
                    </a>
                ))}
            </section> */}
            <section className="copyright">
                <p>
                    Copyright © 2023 CadenaLogistica | Todos los derechos
                    reservados.
                </p>
            </section>
        </footer>
    );
}

export default Footer;
