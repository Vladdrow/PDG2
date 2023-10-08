import React from "react";
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

function Header({ User, Pages }) {
    return (
        <header>
            <section className="first-container">
                <div className="img-logo">
                    <img src={LogoLogistica} alt="Logistics logo" />
                </div>
                <div className="link-nav-user">
                    <div className="link-nav">
                        {Pages.map((page, index) => (
                            <LinkTo key={index} Page={page} />
                        ))}
                    </div>
                    <AuthUser User={User} />
                </div>
            </section>
            {/* <a href="https://contactoeconomico.com/edicion-265/">LINK</a> */}
        </header>
    );
}

export default Header;
