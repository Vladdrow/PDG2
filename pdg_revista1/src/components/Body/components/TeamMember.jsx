import React from "react";

import "../../../assets/css/desktop/components/teammember.css"
function TeamMember({ RutaImagen, Nombre, ApellidoPaterno, ApellidoMaterno, Rol  }) {
    return (
        <article className="team-member">
            <div className="cont-1-team">
                <div className="photo-pers">
                    <img src={RutaImagen} alt={name} />
                </div>
                <div className="name-pers">
                    <h3>{`${Nombre} ${ApellidoPaterno} ${ApellidoMaterno}`}</h3>
                </div>
            </div>
            <div className="desc-pers">
                <h4>{Rol}</h4>
            </div>
        </article>
    );
}

export default TeamMember;
