import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "../../assets/css/desktop/pages/home.css";
import { getHomePageData } from "../../api/auth.api";

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

function Home() {
    const baseURL = "http://192.168.216.228:3010";
    const [selectedImage, setSelectedImage] = useState(null);

    const [guideInfoDB, setGuideInfo] = useState({});
    const [companiesImgDB, setCompaniesImg] = useState([]);
    const [imgSectionsDB, setImgSections] = useState([]);
    const [teamMembersDB, setTeamMembers] = useState([]);

    const randomSection = Math.floor(Math.random() * 25) + 1;
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Dentro");
                const response = await getHomePageData();
                const data = response.data;
                const fullBookImagePath = `${baseURL}/assets/${data.book.RutaImagen}`;
                data.book.RutaImagen = fullBookImagePath;
                /* console.log(fullBookImagePath);*/
                /* /* console.log("response: ", response); */

                console.log("data: ", data);
                setGuideInfo(data.book);
                setCompaniesImg(
                    data.companies.map((company) => ({
                        ...company,
                        RutaArchivo: `${baseURL}/assets/${company.RutaArchivo}${company.NombreArchivo}`,
                    }))
                );
                setImgSections(
                    data.sections.map((section) => ({
                        ...section,
                        RutaImagen: `${baseURL}/assets/${section.RutaImagen}${section.NombreImagen}`,
                    }))
                );
                setTeamMembers(
                    data.editors.map((editor) => ({
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
        console.log("companies", companiesImgDB[4]);
        console.log("sections", imgSectionsDB[4]);
        console.log("team", teamMembersDB[4]);
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

    const imageLinks = [
        {
            image: LogoPrueba,
            link: "https://www.facebook.com",
        },
        {
            /* image:  */
            link: "https://www.youtube.com",
        },
        {
            image: LogoPrueba,
            link: "https://www.twitter.com",
        },
        {
            /* image: LogoVer, */
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
        /* LogoVer,
        "../assets/img/logos/logo-prueba", */
        LogoPrueba,
        "../assets/img/logos/logo-prueba",
        /*LogoVer */
    ];

    const NewUserPages = [
        /* {
            NamePage: "Inicio",
            ToPage: "/",
        }, */
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
            path: "#footer",
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

    const ImgSections = [
        {
            name: "Sec1",
            src: Contenedor,
            alt: "Img1",
            desc: "Description1",
            link: "#",
        },
        {
            name: "Sec2",
            src: Engranaje,
            alt: "Img2",
            desc: "Description2",
            link: "#",
        },
        {
            name: "Sec3",
            src: Contenedor,
            alt: "Img3",
            desc: "Description3",
            link: "#",
        },
        {
            name: "Sec4",
            src: Engranaje,
            alt: "Img4",
            desc: "Description4",
            link: "#",
        },
        {
            name: "Sec5",
            src: Contenedor,
            alt: "Img5",
            desc: "Description5",
            link: "#",
        },
        {
            name: "Sec6",
            src: Engranaje,
            alt: "Img6",
            desc: "Description6",
            link: "#",
        },
        {
            name: "Sec7",
            src: Contenedor,
            alt: "Img7",
            desc: "Description7",
            link: "#",
        },
        {
            name: "Sec8",
            src: Engranaje,
            alt: "Img8",
            desc: "Description8",
            link: "#",
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
            <Header Pages={NewUserPages} /* user={User} */ />
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
                            /* ClName="img-sections" */
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
                                    : ImgSections[0].link
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
                <section className="our-team">
                    <div className="title-our-team">
                        <h2>OUR TEAM</h2>
                    </div>
                    {teamMembersDB.slice(0, 3).map((member, index) => (
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

{
    /* <section className="sects-home other-guide-books">
                    <h2>OTHER GUIDES</h2>
                    <GuidesCarousel itemsPerSlide={3} images={images2} />
                </section> */
}
