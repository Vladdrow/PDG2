import React, { useState, useEffect } from "react";

import RowLeft from "../../../assets/svg/left-circle.svg"
import RowRight from "../../../assets/svg/right-circle.svg"
 
const ImgCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Cambia automáticamente la imagen cada 5 segundos
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel">
            <div className="carousel-inter">
                <button className="carousel-button prev" onClick={prevSlide}>
                    <img src={RowLeft} alt="" />
                </button>
                {images.map((image, index) => (
                    <a
                        key={index}
                        href={image.link} // Usa el enlace correspondiente
                        target="_blank"
                        className={`carousel-slide ${
                            index === currentIndex ? "active" : ""
                        }`}
                        style={{
                            backgroundImage: `url(${image.image})`,
                            animation: `${
                                index === currentIndex ? "fade-in" : "fade-out"
                            } 1s ease-in-out`,
                        }}
                    ></a>
                ))}
                <button className="carousel-button next" onClick={nextSlide}>
                <img src={RowRight} alt="" />
                </button>

            </div>
            <div className="carousel-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${
                            index === currentIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ImgCarousel;
