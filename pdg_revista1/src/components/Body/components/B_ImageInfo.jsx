import React from "react";

function B_ImageInfo({ link, src, clase="" }) {
    return (
        <a href={link}>
            <div className={`box-img ${clase}`}>
                <div className="img-info">  
                    <img src={src} alt="" />
                </div>
            </div>
        </a>
    );
}

export default B_ImageInfo;
