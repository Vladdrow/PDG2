import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import "../assets/css/desktop/pages/home.css";

import LogoVer from "../assets/img/logos/logo-ver.jpg";
/* import LogoHor from "../assets/img/logos/logo-hor.jpg"; */
import Guide from "../assets/resources/guia-logistica-2023.jpg";
import LogoPrueba from "../assets/img/logos/logo-prueba.jpg";
import LogoUser from "../assets/img/logos/logo-user.png";
import Facebook from "../assets/img/socialNetworks/logo_facebook.png";
import Instagram from "../assets/img/socialNetworks/logo_instagram.png";

import Contenedor from "../assets/resources/secciones/contenedor.png";
import Engranaje from "../assets/resources/secciones/engranaje.png";
import ImgUser from "../assets/resources/members/logo-user.png";

import ImgCarousel from "../components/Body/components/ImgCarousel";
import GuidesCarousel from "../components/Body/components/GuidesCarousel";
import TitleH2 from "../components/Global/TitleH2";
import ImageSections from "../components/Body/components/ImageSections";
import TeamMember from "../components/Body/components/TeamMember";
import B_ImageInfo from "../components/Body/components/B_ImageInfo";
import B_DescriptionInfo from "../components/Body/components/B_DescriptionInfo";

function Home() {
    const [selectedImage, setSelectedImage] = useState(null);
    const User = [
        {
            Name: "Renzo V.",
            Photo: LogoUser,
        },
    ];
    const NavLinks = [
        {
            text_nav: "Politica de Privacidad",
            link: "https://www.facebook.com",
        },
        {
            text_nav: "Terminos de Uso",
            link: "https://www.youtube.com",
        },
        {
            text_nav: "Contacto",
            link: "https://www.twitter.com",
        },
        {
            text_nav: "Publicidad",
            link: "https://www.instagram.com",
        },
        {
            text_nav: "Suscripciones",
            link: "https://www.twitch.com",
        },
    ];

    const imageLinks = [
        {
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
        },
    ];

    const LogoSocialMedia = [Facebook, Instagram];

    const SocialLinks = [
        {
            social_media: Facebook,
            link: "https://www.facebook.com",
        },
        {
            social_media: Instagram,
            link: "https://www.instagram.com",
        },
    ];

    const images2 = [
        LogoVer,
        "../assets/img/logos/logo-prueba",
        LogoPrueba,
        "../assets/img/logos/logo-prueba",
        /*LogoVer */
    ];

    const NewUserPages = [
        {
            NamePage: "Inicio",
            ToPage: "/",
        },
        /* {
            NamePage: "Explorar",
            ToPage: "/explore",
        }, */
        {
            NamePage: "Nosotros",
            ToPage: "/about",
        },
        {
            NamePage: "Contáctanos",
            ToPage: "/contact",
        },
        {
            NamePage: "Registrarse",
            ToPage: "/register",
        },
        {
            NamePage: "Iniciar Sesión",
            ToPage: "/login",
        },
    ];

    const ImgSections = [
        {
            name: "Sec1",
            src: Contenedor,
            alt: "Img1",
            desc: "Description1",
        },
        {
            name: "Sec2",
            src: Engranaje,
            alt: "Img2",
            desc: "Description2",
        },
        {
            name: "Sec3",
            src: Contenedor,
            alt: "Img3",
            desc: "Description3",
        },
        {
            name: "Sec4",
            src: Engranaje,
            alt: "Img4",
            desc: "Description4",
        },
        {
            name: "Sec5",
            src: Contenedor,
            alt: "Img5",
            desc: "Description5",
        },
        {
            name: "Sec6",
            src: Engranaje,
            alt: "Img6",
            desc: "Description6",
        },
        {
            name: "Sec7",
            src: Contenedor,
            alt: "Img7",
            desc: "Description7",
        },
        {
            name: "Sec8",
            src: Engranaje,
            alt: "Img8",
            desc: "Description8",
        },
    ];

    const teamMembers = [
        {
            photoSrc: LogoUser,
            name: "Renzo Valencia G.",
            description: "Desarrollador Senior",
        },
        {
            photoSrc: LogoUser,
            name: "Damian Valencia G.",
            description: "Desarrollador SemiSenior",
        },
        {
            photoSrc: LogoUser,
            name: "Vlad Valencia G.",
            description: "Desarrollador Junior",
        },
        {
            photoSrc: LogoUser,
            name: "Vlad Valencia G.",
            description: "Desarrollador Junior",
        },
    ];

    const guide_info = {
        name: "VII GUÍA EMPRESARIAL DE LOGÍSTICA",
        description:
            "En julio de 2014, lanzamos a circulación nuestra primera edición de la revista 'Logística & Negocios Internacionales', destinada a cubrir una necesidad de información especializada para orienta y actualizar a profesionales y empresarios vinculados al rubro logramos una rápida y efectiva aceptación en el público lector, gracias al staff de colaboradores quienes apoyan en una acertada planificación de contenido. " +
            "Luego de tres años de vigencia, al detectar que hacía falta un directorio de las principales empresas e instituciones vinculadas al rubro y, a solicitud de nuestros suscriptores, es que decidimos publicar la Guía Empresarial de Logística, con información ordenada, clasificada y sistematizada, que sirviera como una base de datos actualizada para importadores y exportadores, así como a todo profesional interesado en ingresar al negocio logístico.",
        src: Guide,
        link: "https://logistica-ni.com/guia-empresarial-2023/",
    };
    return (
        <>
            <Header User={User} Pages={NewUserPages} />
            <main id="home">
                <section id="guide-year-section">
                    <article className="article-guide">
                        <B_ImageInfo src={guide_info.src} />
                        <B_DescriptionInfo
                            title={guide_info.name}
                            description={guide_info.description}
                            link={guide_info.link}
                            buttonText="Mas Información"
                        />
                    </article>
                </section>
                <section
                    id="featured-companies-section"
                    className="sects-home ads-carousel"
                >
                    <div className="title-featured">
                        <h2>FEATURED COMPANIES</h2>
                    </div>
                    <ImgCarousel images={imageLinks} />
                </section>
                {/* <section className="sects-home other-guide-books">
                    <h2>OTHER GUIDES</h2>
                    <GuidesCarousel itemsPerSlide={3} images={images2} />
                </section> */}
                <section id="guide-sections">
                    <article className="sects-home guide-sects">
                        <div className="title-sections">
                            <h2>SECTIONS</h2>
                        </div>
                        <ImageSections
                            /* ClName="img-sections" */
                            images={ImgSections}
                            onSelectImage={setSelectedImage}
                        />
                    </article>
                </section>
                <section id="information-section">
                    <article className="sect-info">
                        <B_DescriptionInfo
                            title={
                                selectedImage
                                    ? selectedImage.name
                                    : ImgSections[0].alt
                            }
                            description={
                                selectedImage
                                    ? selectedImage.desc
                                    : ImgSections[0].desc
                            }
                            link="#"
                            buttonText="Explorar"
                        />
                        <B_ImageInfo
                            src={
                                selectedImage
                                    ? selectedImage.src
                                    : ImgSections[0].src
                            }
                        />
                    </article>
                </section>
                <section className="our-team">
                    <div className="title-our-team">
                        <h2>OUR TEAM</h2>
                    </div>
                    {teamMembers.slice(0, 3).map((member, index) => (
                        <TeamMember key={index} {...member} />
                    ))}
                    <div className="cont-btn">
                        {teamMembers.length > 3 && (
                            <a
                                className="btn-more-team btn btn-danger m-2"
                                onClick={() =>
                                    (window.location.href = "/pagina-aparte")
                                }
                            >
                                Ver más miembros del equipo
                            </a>
                        )}
                    </div>
                </section>
            </main>
            <Footer socialLinks={SocialLinks} navLinks={NavLinks} />
        </>
    );
}

export default Home;
