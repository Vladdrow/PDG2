import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "../../assets/css/desktop/pages/home.css";
import {
    getBookData,
    getCompaniesData,
    getSectionsData,
    getEditorsData,
} from "../../api/content.api";

/* import LogoVer from "../../assets/img/logos/logo-ver.jpg"; */
/* import LogoHor from "../assets/img/logos/logo-hor.jpg"; */
import Guide from "../../assets/resources/guia-logistica-2023.jpg";

import LogoPrueba from "../../assets/img/logos/logo-prueba.jpg";
import LogoUser from "../../assets/img/logos/logo-user.png";
import Facebook from "../../assets/img/socialNetworks/logo_facebook.png";
import Instagram from "../../assets/img/socialNetworks/logo_instagram.png";

import Contenedor from "../../assets/resources/secciones/contenedor.png";
import Engranaje from "../../assets/resources/secciones/engranaje.png";
import ImgUser from "../../assets/resources/members/logo-user.png";

import ImgCarousel from "../../components/Card/ImgCarousel";
import GuidesCarousel from "../../components/Card/GuidesCarousel";
import TitleH2 from "../../components/Global/TitleH2";
import ImageSections from "../../components/Card/ImageSections";
import TeamMember from "../../components/Body/components/TeamMember";
import B_ImageInfo from "../../components/Body/components/B_ImageInfo";
import B_DescriptionInfo from "../../components/Body/components/B_DescriptionInfo";
import config from "../../../config";

function Home() {
    const myIp = config.ipAddress;
    const baseURL = `http://${myIp}:3010`;

    const [selectedImage, setSelectedImage] = useState(null);
    const [guideInfoDB, setGuideInfo] = useState({});
    const [companiesImgDB, setCompaniesImg] = useState([]);
    const [imgSectionsDB, setImgSections] = useState([]);
    const [teamMembersDB, setTeamMembers] = useState([]);
    const [socialNetworks, setSocialNetworks] = useState([]);

    const randomSection = Math.floor(Math.random() * 25) + 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookData = await getBookData();
                const bookImage = `${baseURL}/assets/${bookData.RutaImagen}`;
                bookData.RutaImagen = bookImage;                
                setGuideInfo(bookData);

                const companiesData = await getCompaniesData();
                setCompaniesImg(
                    companiesData.map((company) => ({
                        ...company,
                        RutaArchivo: `${baseURL}/assets/${company.RutaArchivo}${company.NombreArchivo}`,
                    }))
                );

                const sectionsData = await getSectionsData();
                setImgSections(
                    sectionsData.map((section) => ({
                        ...section,
                        RutaImagen: `${baseURL}/assets/${section.RutaImagen}${section.NombreImagen}`,
                    }))
                );

                const editorsData = await getEditorsData();
                setTeamMembers(
                    editorsData.map((editor) => ({
                        ...editor,
                        RutaImagen: `${baseURL}/assets/${editor.RutaImagen}${editor.NombreImagen}`,
                    }))
                );
                // ... establece otros estados según sea necesario
            } catch (error) {
                console.error("Hubo un error al obtener los datos:", error);
            }
        };
        fetchData();
    }, []);

    /* const GuideDB = require(guideInfoDB.RutaImagen); */
    const User = {
        ID: "12345", // ID único del usuario
        CorreoElectronico: "usuario@ejemplo.com", // Correo electrónico del usuario
        Nombre: "Juan", // Primer nombre del usuario
        Apellido: "Valencia", // Apellido del usuario (para simplificar, lo hemos dejado como un solo campo, pero puedes dividirlo en ApellidoPaterno y ApellidoMaterno si lo prefieres)
        IsEditor: false, // Indica si el usuario es un editor
        IsPremium: true, // Indica si el usuario tiene una suscripción premium
        FechaRegistro: "2023-01-01", // Fecha de registro del usuario
        FechaUltimoAcceso: "2023-09-01", // Última fecha de acceso del usuario
        photoURL: ImgUser, // URL de la foto del perfil del usuario
    };
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
            <Header Pages={NewUserPages} isHome={true} /*  User={User}  */ />
            <main id="home">
                <section id="guide-year-section">
                    <article className="article-guide">
                        <B_ImageInfo
                            link={guideInfoDB.UrlLibro}
                            src={guideInfoDB.RutaImagen}
                        />
                        <B_DescriptionInfo
                            title={guideInfoDB.Titulo}
                            description={guideInfoDB.Descripcion}
                            link={guideInfoDB.UrlLibro}
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
                    <ImgCarousel images={companiesImgDB} />
                </section>

                <section id="guide-sections">
                    <article className="sects-home guide-sects">
                        <div className="title-sections">
                            <h2>SECTIONS</h2>
                        </div>
                        <ImageSections
                            images={imgSectionsDB}
                            onSelectImage={setSelectedImage}
                        />
                    </article>
                </section>

                <section id="information-section">
                    <article className="sect-info">
                        <B_DescriptionInfo
                            title={
                                selectedImage
                                    ? selectedImage.Nombre
                                    : imgSectionsDB.length > 0
                                    ? imgSectionsDB[randomSection].Nombre
                                    : "Cargando..."
                            }
                            description={
                                selectedImage
                                    ? selectedImage.Descripcion
                                    : imgSectionsDB.length > 0
                                    ? imgSectionsDB[randomSection].Descripcion
                                    : "Cargando..."
                            }
                            link="#"
                            buttonText="Explorar"
                        />
                        <B_ImageInfo
                            link={
                                selectedImage
                                    ? selectedImage.link
                                    : "#" /* ImgSections[0].link */
                            }
                            src={
                                selectedImage
                                    ? selectedImage.RutaImagen
                                    : imgSectionsDB.length > 0
                                    ? imgSectionsDB[randomSection].RutaImagen
                                    : "Cargando..."
                            }
                        />
                    </article>
                </section>

                <section id="our-team">
                    <div className="title-our-team">
                        <h2>OUR TEAM</h2>
                    </div>
                    <div className="members">
                        {teamMembersDB.slice(0, 3).map((member, index) => (
                            <TeamMember key={index} {...member} />
                        ))}
                    </div>
                    <div className="cont-btn">
                        {teamMembersDB.length > 3 && (
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
            <Footer showNetwork={true} />
        </>
    );
}

export default Home;

{
    /* <section className="sects-home other-guide-books">
                    <h2>OTHER GUIDES</h2>
                    <GuidesCarousel itemsPerSlide={3} images={images2} />
                </section> */
}
