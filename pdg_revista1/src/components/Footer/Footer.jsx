import React from "react";

import LogoContacto from "../../assets/img/logos/logo-revista.png";
import { Link } from "react-router-dom";
import "./footer.css"

function Footer({ socialLinks, navLinks }) {
    return (
        <footer id="footer">
            <section className="magazine-name">
                <div className="img-lg-ft">
                    <Link to="/"><img src={LogoContacto} alt="Magazine name" /> </Link>
                </div>
            </section>
            <section className="social-media-links">
                <div className="title-social">
                    <p>Redes Sociales</p>
                </div>
                <div className="img-links">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.link}
                            target="_blank"
                        >
                            <img src={social.social_media} alt="" />
                        </a>
                    ))}
                </div>
            </section>
            <section className="nav-footer">
                {navLinks.map((navLink, index) => (
                    <a key={index} href={navLink.link} target="_blank">
                        {navLink.text_nav}
                    </a> 
                ))}
            </section>
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
