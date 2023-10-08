import React, { useState } from "react";
import Slider from "react-slick";

import Logo from "../../../assets/img/logos/logo-prueba.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GuidesCarousel = ({ itemsPerSlide, images }) => {
    const showArrows = images.length > 3;

    const settings = {
        infinite: showArrows,
        slidesToShow: itemsPerSlide,
        slidesToScroll: 1,
        arrows: showArrows,
    };

    return (
        <div className="slider-container">
            <Slider {...settings} className="slider-element">
                {images.map((image, index) => (
                    <div key={index} className="guides-container">
                        <img src={image} alt={`Image ${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default GuidesCarousel;
