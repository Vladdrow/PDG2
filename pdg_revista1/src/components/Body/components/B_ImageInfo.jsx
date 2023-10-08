import React from "react";

function B_ImageInfo({src}) {
    return (
        <div className="box-img">
            <div className="img-info">
                <img src={src} alt="" />
            </div>
        </div>
    );
}

export default B_ImageInfo;
