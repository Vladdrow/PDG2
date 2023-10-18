import React, { useState, useEffect } from "react";

import RowLeft from "../../assets/svg/left-circle.svg";
import RowRight from "../../assets/svg/right-circle.svg";

import CarouselDots from "./CarouselDots";
import "../../assets/css/desktop/components/imgcarousel.css"


const ImgCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [images]);  // Añadido la dependencia images para asegurarse de que el useEffect se ejecute si images cambia

    return (
        <div className="carousel">
            <div className="carousel-inter">
                <button className="carousel-button prev" onClick={prevSlide}>
                    <img src={RowLeft} alt="Previous slide" />
                </button>
                {images.map((image, index) => (
                    <a
                        key={index}
                        href={image.link}
                        target="_blank"
                        rel="noopener noreferrer"  // Añadido por seguridad al usar target="_blank"
                        className={`carousel-slide ${
                            index === currentIndex ? "active" : ""
                        }`}
                        style={{
                            backgroundImage: `url(${image.RutaArchivo})`,
                            animation: `${
                                index === currentIndex ? "fade-in" : "fade-out"
                            } 1s ease-in-out`,
                        }}
                    ></a>
                ))}
                <button className="carousel-button next" onClick={nextSlide}>
                    <img src={RowRight} alt="Next slide" />
                </button>
            </div>
            <CarouselDots
                items={images}
                activeIndex={currentIndex}
                setActiveIndex={setCurrentIndex}
            />
        </div>
    );
};

export default ImgCarousel;