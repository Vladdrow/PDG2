import React, { useState } from "react";
import "../../assets/css/desktop/components/institucion.css";
import LogoPrueba from "../../assets/svg/institutions.jpg";

const Entities = ({ Nombre, Sucursales = [], tipoMembresia = 1 }) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [showBranches, setShowBranches] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSucursales = () => {
        setIsExpanded(!isExpanded);
    };
    const handleItemClick = (item, type) => {
        if (type === "phone" && isMobile) {
            const userConfirmed = window.confirm(
                `¿Quieres redirigir a la aplicación de teléfono para llamar al ${item}?`
            );
            if (userConfirmed) {
                window.location.href = `tel:${item}`;
            }
        } else {
            copyToClipboard(item);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setShowCopyMessage(true);
                setTimeout(() => setShowCopyMessage(false), 2000);
            })
            .catch((err) => {
                console.error("Error al copiar", err);
            });
    };

    return (
        <div
            className="institucion"
            style={{
                backgroundColor: tipoMembresia === 1 ? "#cdcdcd" : "#FFD700",
            }}
        >
            <div className="name-img-inst">
                <p
                    id="name-inst"
                    style={{ width: tipoMembresia === 2 ? "80%" : "100%" }}
                >
                    {Nombre}
                </p>
                {tipoMembresia === 2 && (
                    <img src={LogoPrueba} alt="Logo de la institución" />
                )}
            </div>

            {Sucursales.map((sucursal, sucIndex) => (
                <div
                    key={sucIndex}
                    className={`sucursal-info ${
                        sucIndex === 0 || isExpanded ? "active" : ""
                    }`} // Modificación aquí
                >
                    <div className="info-inst location">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 384 512"
                            style={{ fill: "#005eff" }}
                        >
                            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                        </svg>
                        <p>{sucursal.Direccion}</p>
                    </div>

                    <div className="phone-inst-info">
                        {sucursal.Telefonos.map((telefono, telIndex) => (
                            <div key={telIndex} className="info-inst phone">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                    style={{ fill: "#005eff" }}
                                >
                                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                </svg>
                                <p
                                    onClick={() =>
                                        handleItemClick(telefono, "phone")
                                    }
                                    style={{
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    }}
                                >
                                    {telefono}
                                </p>
                            </div>
                        ))}
                    </div>

                    {sucursal.Emails.map((correo, mailIndex) => (
                        <div key={mailIndex} className="info-inst correo">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                                
                            >
                                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg>
                            <p
                                onClick={() => handleItemClick(correo, "email")}
                                style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                }}
                            >
                                {correo}
                            </p>
                        </div>
                    ))}
                </div>
            ))}

            {Sucursales.length > 1 && (
                <div className="toggle-branches" onClick={toggleSucursales}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        className={`dropdown-entity ${
                            isExpanded ? "rotated" : ""
                        }`}
                    >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                </div>
            )}
            {showCopyMessage && (
                <span className="success-copy">
                    Elemento copiado al portapapeles!
                </span>
            )}
        </div>
    );
};

export default Entities;