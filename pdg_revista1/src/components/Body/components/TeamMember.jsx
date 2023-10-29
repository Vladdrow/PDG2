import React from "react";

import "../../../assets/css/desktop/components/teammember.css";
function TeamMember({
    RutaImagen,
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Rol,
}) {
    const NombreCompleto = `${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`
    return (
        <article className="team-member">
            <div className="cont-1-team">
                <img src={RutaImagen} alt={NombreCompleto} />
                <h3>{NombreCompleto}</h3>
            </div>
            <div className="desc-pers">
                <h3>{Rol}</h3>
            </div>
        </article>
    );
}

export default TeamMember;
