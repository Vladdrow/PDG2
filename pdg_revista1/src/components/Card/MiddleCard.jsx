import React from "react";

import "../../assets/css/desktop/components/middlecard.css";
function MiddleCard({ title, description , images}) {
    return (
        <div
            className="d-card-slide middle-card"
            style={{
                backgroundImage: `url(${images})`,
                backgroundPosition: 'center', // centra la imagen de fondo
                backgroundRepeat: 'no-repeat', // evita que la imagen de fondo se repita
                backgroundSize: 'cover' // hace que la imagen de fondo cubra todo el contenedor
            }}
        >
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="btn btn-danger">Button</button>
        </div>
    );
}

export default MiddleCard;
