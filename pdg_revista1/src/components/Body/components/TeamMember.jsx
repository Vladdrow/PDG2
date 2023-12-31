import React from "react";

function TeamMember({ photoSrc, name, description }) {
    return (
        <article className="team-member">
            <div className="cont-1-team">
                <div className="photo-pers">
                    <img src={photoSrc} alt={name} />
                </div>
                <div className="name-pers">
                    <h3>{name}</h3>
                </div>
            </div>
            <div className="desc-pers">
                <h4>{description}</h4>
            </div>
        </article>
    );
}

export default TeamMember;
