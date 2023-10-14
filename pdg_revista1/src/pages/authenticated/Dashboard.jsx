import React from "react";
import { Link } from "react-router-dom";
/* Style */
import "../../assets/css/desktop/pages/dashboard.css";

/* Resources */
/* import LogoVer from "../../assets/img/logos/logo-ver.jpg"; */
/* import LogoHor from "../assets/img/logos/logo-hor.jpg"; */

import LogoGourmet from "../../assets/img/logos/logo-gourmet.png";
import LogoLogistica from "../../assets/img/logos/logo-logistica.png";
import LogoPrueba from "../../assets/img/logos/logo-prueba.jpg";
import LeftCircle from "../../assets/svg/left-circle.svg";
import RightCircle from "../../assets/svg/right-circle.svg";
import LogoUser from "../../assets/img/logos/logo-user.png";

/* Components */
import LogoAdsSection from "../../components/Body/components/LogoAdsSection";
import AdsBox from "../../components/Body/components/AdsBox";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Global/SearchBar";
import ImgCarousel from "../../components/Card/ImgCarousel";

function Dashboard() {
    const User = [
        {
            Name: "Renzo V.",
            Photo: LogoUser,
        },
    ];

    const imageLinks = [
/*         {
            image: LogoPrueba,
            link: "https://www.facebook.com",
        },
        {
            image: LogoVer,
            link: "https://www.youtube.com",
        },
        {
            image: LogoPrueba,
            link: "https://www.twitter.com",
        },
        {
            image: LogoVer,
            link: "https://www.instagram.com",
        },
        {
            image: LogoPrueba,
            link: "https://www.twitch.com",
        }, */
    
    ];

    const PremiumUserPages = [
        {
            NamePage: "Inicio",
            ToPage: "/dashboard",
        },
/*         {
            NamePage: "Explorar",
            ToPage: "/explore",
        }, */
        {
            NamePage: "Perfil",
            ToPage: "/profile",
        },
        {
            NamePage: "Notificaciones",
            ToPage: "/notifications",
        },
        /* {
            NamePage: "Contenido Premium",
            ToPage: "/premium-content",
        }, */
        {
            NamePage: "Cerrar Sesión",
            ToPage: "/logout",
        },
    ];
    return (
        <>
            <Header User={User} Pages={PremiumUserPages}/>
            <Link to="/auth/show1">Redirect premium</Link>
            <main id="dashboard">
                <LogoAdsSection imageLinks={imageLinks} />
                <SearchBar />

                <section className="sect-mn sect-pubs-ads-main">
                    <div className="box-pas pub-ad-aside">
                        <div className="frst-in-paa">
                            <div className="scnd-in-paa">
                                <section className="sect-pubs">
                                    <article>
                                        {/* <div className="overlay"></div> */}
                                        <img src={LogoLogistica} alt="" />
                                        {/* <div className="article-text">
                                    </div> */}
                                        <h2>Title</h2>
                                        <p>Breve descripcion</p>
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                        <h3>Title</h3>
                                        <p>Breve descripcion</p>
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                        <h3>Title</h3>
                                        <p>Breve descripcion</p>
                                    </article>
                                </section>
                                <section className="sect-pubs">
                                    <article>
                                        {/* <div className="overlay"></div> */}
                                        <img src={LogoLogistica} alt="" />
                                        {/* <div className="article-text">
                                        </div> */}
                                        <h2>Title</h2>
                                        <p>Breve descripcion</p>
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                        <h3>Title</h3>
                                        <p>Breve descripcion</p>
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                        <h3>Title</h3>
                                        <p>Breve descripcion</p>
                                    </article>
                                </section>
                                {/* <div className="ads-betwn-sects">
                                    <img src={LogoGourmet} alt="" />
                                </div> */}
                                {/* <AdsBox /> */}
                                <ImgCarousel images={imageLinks}/>

                                <section className="sect-pubs">
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                    </article>
                                </section>
                                <section className="sect-pubs">
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                    </article>
                                    <article>
                                        <img src={LogoLogistica} alt="" />
                                    </article>
                                </section>
                                <section className="view-more-filter">
                                    <div className="filter">
                                        <select
                                            className="form-select vm-filter"
                                            name="departaments"
                                            id=""
                                        >
                                            <option value="santa-cruz">
                                                Santa Cruz
                                            </option>
                                        </select>
                                    </div>
                                    <div className="view-more">
                                        <img src={LeftCircle} alt="" />
                                        <img src={RightCircle} alt="" />
                                        <span>View more</span>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="box-pas aside">
                        <aside className="sticky-aside">
                            <section className="ads-aside">
                                <div className="big-ads">
                                    <img src={LogoPrueba} alt="Ads" />
                                </div>
                                <div className="big-ads">
                                    <img src={LogoPrueba} alt="Ads" />
                                </div>
                            </section>
                        </aside>
                    </div>
                </section>

                <section className="">
                    <div className="phrase">
                        <img src={LogoGourmet} alt="Ads" />
                    </div>
                </section>
                <section className="">
                    <div className="other-phrase">
                        <img src={LogoGourmet} alt="Ads" />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Dashboard;
