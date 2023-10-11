import React from "react";

import "../../assets/css/desktop/components/carouseldots.css"

function CarouselDots({ items, activeIndex, setActiveIndex }) {
    return (
        <div className="carousel-dots">
            {items.map((_, idx) => (
                <span
                    key={idx}
                    className={`dot ${idx === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(idx)}
                ></span>
            ))}
        </div>
    );
}

export default CarouselDots;
