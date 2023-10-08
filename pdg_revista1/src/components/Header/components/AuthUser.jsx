import React from "react";

import "../../../assets/css/desktop/components/authuser.css"

import LogoUser from "../../../assets/img/logos/logo-user.png"

function AuthUser({ User }) {
    return (
        <div className="link-user">
            {User.map((user, index) => (
                <div key={index} className="user-container">
                    <div className="img-nm-user">
                        <img src={user.Photo} alt="User profile image" id="img-user" />
                    </div>
                    <div className="user-name">
                        <span>{user.Name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default AuthUser;
