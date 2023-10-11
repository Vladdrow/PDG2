import React from "react";

function B_ImageInfo({ link, src }) {
    return (
        <a href={link}>
            <div className="box-img">
                <div className="img-info">
                    <img src={src} alt="" />
                </div>
            </div>
        </a>
    );
}

export default B_ImageInfo;
