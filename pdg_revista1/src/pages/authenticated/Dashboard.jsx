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
/* import SearchBar from "../../components/Global/SearchBar"; */
import ImgCarousel from "../../components/Card/ImgCarousel";
import SearchBar from "../../components/List/SearchBar";
import Entities from "../../components/Card/Entities";

/* import SectionInfo from "../../components/Card/SectionInfo"; */
import SliderCard from "../../components/Card/SliderCard";
import MiddleCard from "../../components/Card/MiddleCard";

import LogoVer from "../../assets/img/logos/logo-revista.png";
import Engranaje from "../../assets/resources/secciones/engranaje.png";

function Dashboard() {
    const baseURL = "http://192.168.18.228:3010";
    const rutaUsuario = `${baseURL}/assets/users/user2.svg`;
    const User = {
        ID: "12345", // ID único del usuario
        CorreoElectronico: "usuario@ejemplo.com", // Correo electrónico del usuario
        Nombre: "Juan", // Primer nombre del usuario
        Apellido: "Valencia", // Apellido del usuario (para simplificar, lo hemos dejado como un solo campo, pero puedes dividirlo en ApellidoPaterno y ApellidoMaterno si lo prefieres)
        IsEditor: false, // Indica si el usuario es un editor
        IsPremium: true, // Indica si el usuario tiene una suscripción premium
        FechaRegistro: "2023-01-01", // Fecha de registro del usuario
        FechaUltimoAcceso: "2023-09-01", // Última fecha de acceso del usuario
        PhotoURL: rutaUsuario, // URL de la foto del perfil del usuario
    };
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
            name: "Inicio",
            path: "/dashboard",
        },
        /*         {
            name: "Explorar",
            path: "/explore",
        }, */
        {
            name: "Perfil",
            path: "/profile",
        },
        {
            name: "Notificaciones",
            path: "/notifications",
        },
        /* {
            name: "Contenido Premium",
            path: "/premium-content",
        }, */
        {
            name: "Cerrar Sesión",
            path: "/logout",
        },
    ];

    const LoggedInUserPages = [
        {
            name: "Explorar",
            path: "/explore",
        },
        {
            name: "Suscribirse",
            path: "/subscribe",
        },
        {
            name: "Notificaciones",
            path: "/notifications",
        },
        /* {
            name: "Inicio",
            path: "/",
        }, */
        /* {
            name: "Perfil",
            path: "/profile",
        }, */
        /* {
            name: "Cerrar Sesión",
            path: "/logout",
        }, */
    ];
    const sliderImages = [
        "urlImagen1.jpg",
        "urlImagen2.jpg",
        // ... más imágenes
    ];
    const images = [
        LogoVer,
        LogoPrueba,
        LogoVer,
        LogoPrueba,
        LogoVer,
        LogoPrueba,
        LogoVer,
    ];
    const titleImages = ["1", "2", "3", "4", "5", "6", "7"];

    const entities = [
        {
            Nombre: "Empresa 5",
            Sucursales: [
                {
                    Direccion: "Calle Nu, Ciudad E",
                    Telefonos: ["+555-555-551", "+555-555-552"],
                    Emails: [
                        "contacto1@empresa5.com",
                        "soporte1@empresa5.com",
                        "ventas1@empresa5.com",
                    ],
                }
            ],
            TipoMembresia: 1,
        },
        {
            Nombre: "Empresa 5",
            Sucursales: [
                {
                    Direccion: "Calle Omicron, Ciudad E",
                    Telefonos: ["555-555-555", "555-555-556"],
                    Emails: [
                        "contacto3@empresa5.com",
                        "soporte3@empresa5.com",
                        "ventas3@empresa5.com",
                    ],
                },
            ],
            TipoMembresia: 1,
        },
        {
            Nombre: "Empresa 5",
            Sucursales: [
                {
                    Direccion: "Calle Omicron, Ciudad E",
                    Telefonos: ["555-555-555", "555-555-556"],
                    Emails: [
                        "contacto3@empresa5.com",
                        "soporte3@empresa5.com",
                        "ventas3@empresa5.com",
                    ],
                },
            ],
            TipoMembresia: 1,
        },
        {
            Nombre: "Empresa 5",
            Sucursales: [
                {
                    Direccion: "Calle Nu, Ciudad E",
                    Telefonos: ["555-555-551", "555-555-552"],
                    Emails: [
                        "contacto1@empresa5.com",
                        "soporte1@empresa5.com",
                        "ventas1@empresa5.com",
                    ],
                }
            ],
            TipoMembresia: 1,
        },
        {
            Nombre: "Empresa 5",
            Sucursales: [
                {
                    Direccion: "Calle Nu, Ciudad E",
                    Telefonos: ["555-555-551", "555-555-552"],
                    Emails: [
                        "contacto1@empresa5.com",
                        "soporte1@empresa5.com",
                        "ventas1@empresa5.com",
                    ],
                }
            ],
            TipoMembresia: 1,
        },
        {
            Nombre: "Empresa 1",
            Sucursales: [
                {
                    Direccion: "Calle Alpha, Ciudad A",
                    Telefonos: ["111-111-111", "111-111-112"],
                    Emails: [
                        "contacto1@empresa1.com",
                        "soporte1@empresa1.com",
                        "ventas1@empresa1.com",
                    ],
                },
                {
                    Direccion: "Calle Beta, Ciudad A",
                    Telefonos: ["111-111-113", "111-111-114"],
                    Emails: [
                        "contacto2@empresa1.com",
                        "soporte2@empresa1.com",
                        "ventas2@empresa1.com",
                    ],
                },
                {
                    Direccion: "Calle Gamma, Ciudad A",
                    Telefonos: ["111-111-115", "111-111-116"],
                    Emails: [
                        "contacto3@empresa1.com",
                        "soporte3@empresa1.com",
                        "ventas3@empresa1.com",
                    ],
                },
            ],
            TipoMembresia: 2,
        },
        {
            Nombre: "Empresa 2",
            Sucursales: [
                {
                    Direccion: "Calle Zeta, Ciudad B",
                    Telefonos: ["222-222-225", "222-222-226"],
                    Emails: [
                        "contacto3@empresa2.com",
                        "soporte3@empresa2.com",
                        "ventas3@empresa2.com",
                    ],
                },
            ],
            TipoMembresia: 1,
        },
        {
            Nombre: "Empresa 3",
            Sucursales: [
                {
                    Direccion: "Calle Eta, Ciudad C",
                    Telefonos: ["333-333-331", "333-333-332"],
                    Emails: [
                        "contacto1@empresa3.com",
                        "soporte1@empresa3.com",
                        "ventas1@empresa3.com",
                    ],
                },
            ],
            TipoMembresia: 2,
        },
        {
            Nombre: "Empresa 4",
            Sucursales: [
                {
                    Direccion: "Calle Kappa, Ciudad D",
                    Telefonos: ["444-444-441", "444-444-442"],
                    Emails: [
                        "contacto1@empresa4.com",
                        "soporte1@empresa4.com",
                        "ventas1@empresa4.com",
                    ],
                },
                {
                    Direccion: "Calle Lambda, Ciudad D",
                    Telefonos: ["444-444-443", "444-444-444"],
                    Emails: [
                        "contacto2@empresa4.com",
                        "soporte2@empresa4.com",
                        "ventas2@empresa4.com",
                    ],
                },
            ],
            TipoMembresia: 1,
        },
        {
            Nombre: "Empresa 5",
            Sucursales: [
                {
                    Direccion: "Calle Nu, Ciudad E",
                    Telefonos: ["555-555-551", "555-555-552"],
                    Emails: [
                        "contacto1@empresa5.com",
                        "soporte1@empresa5.com",
                        "ventas1@empresa5.com",
                    ],
                },
                {
                    Direccion: "Calle Xi, Ciudad E",
                    Telefonos: ["555-555-553", "555-555-554"],
                    Emails: [
                        "contacto2@empresa5.com",
                        "soporte2@empresa5.com",
                        "ventas2@empresa5.com",
                    ],
                },
                {
                    Direccion: "Calle Omicron, Ciudad E",
                    Telefonos: ["555-555-555", "555-555-556"],
                    Emails: [
                        "contacto3@empresa5.com",
                        "soporte3@empresa5.com",
                        "ventas3@empresa5.com",
                    ],
                },
            ],
            TipoMembresia: 2,
        },
        {
            Nombre: "Empresa 5",
            Sucursales: [
                {
                    Direccion: "Calle Nu, Ciudad E",
                    Telefonos: ["555-555-551", "555-555-552"],
                    Emails: [
                        "contacto1@empresa5.com",
                        "soporte1@empresa5.com",
                        "ventas1@empresa5.com",
                    ],
                },
                {
                    Direccion: "Calle Xi, Ciudad E",
                    Telefonos: ["555-555-553", "555-555-554"],
                    Emails: [
                        "contacto2@empresa5.com",
                        "soporte2@empresa5.com",
                        "ventas2@empresa5.com",
                    ],
                },
                {
                    Direccion: "Calle Omicron, Ciudad E",
                    Telefonos: ["555-555-555", "555-555-556"],
                    Emails: [
                        "contacto3@empresa5.com",
                        "soporte3@empresa5.com",
                        "ventas3@empresa5.com",
                    ],
                },
            ],
            TipoMembresia: 1,
        },
    ];
    /* console.log(instituciones); */
    const width = window.innerWidth <= 768;
    return (
        <>
            <Header User={User} Pages={LoggedInUserPages} />
            {/* <Link to="/auth/show1">Redirect premium</Link> */}
            <main id="dashboard">
                <section className="b-sect-info">
                    <SliderCard title={titleImages} images={images} clName={width ? `disabled`: ``} />
                    <MiddleCard
                        title="SECCION"
                        description="Descripcion de la seccion"
                        images={Engranaje}
                    />
                    {<SliderCard title={titleImages} images={images} />}
                </section>
                <SearchBar />
                <section id="dsh-empr-inst">
                    {entities.map((entity, i) => (
                        <Entities
                            key={i}
                            Nombre={entity.Nombre}
                            Sucursales={entity.Sucursales}
                            tipoMembresia={entity.TipoMembresia}
                        />
                    ))}
                </section>

                {/* <section className="">
                    <div className="phrase">
                        <img src={LogoGourmet} alt="Ads" />
                    </div>
                </section>
                <section className="">
                    <div className="other-phrase">
                        <img src={LogoGourmet} alt="Ads" />
                    </div>
                </section>  */}
            </main>
        </>
    );
}

export default Dashboard;
