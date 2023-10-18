import React, { useState, useEffect } from "react";

import "../../assets/css/desktop/components/slidercard.css";

import LogoVer from "../../assets/img/logos/logo-revista.png";
function SliderCard({ title, images, clName }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000); // Cambiará cada 2 segundos

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div
            className={`d-card-slide card-corner ${clName}`}
            /* style={{ backgroundImage: `url(${images[currentIndex]})` }} */
        >
            <h2 className="hidden-title">{title[currentIndex]}</h2>
            <img src={images[currentIndex]} alt="Slider Image" />
        </div>
    );
}

export default SliderCard;
