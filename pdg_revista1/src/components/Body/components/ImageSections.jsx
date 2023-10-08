import { useState, useEffect } from "react";

import Contenedor from "../../../assets/resources/secciones/contenedor.png";
import Engranaje from "../../../assets/resources/secciones/engranaje.png";

function ImageSections({ images, onSelectImage }) {
    const itemsPerGroup = 6;
    const [activeGroup, setActiveGroup] = useState(0);
    const groups = Math.ceil(images.length / itemsPerGroup);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveGroup((prevGroup) => (prevGroup + 1) % groups);
        }, 5000);

        return () => clearInterval(interval);
    }, [groups]);

    return (
        <div className="img-sections">
            {" "}
            {/* "img-sections-gs" */}
            <div
                className="carousel-container-gs"
                style={{ transform: `translateX(-${activeGroup * 100}%)` }}
            >
                {Array(groups)
                    .fill(0)
                    .map((_, groupIndex) => (
                        <div className="carousel-group-gs" key={groupIndex}>
                            {images
                                .slice(
                                    groupIndex * itemsPerGroup,
                                    (groupIndex + 1) * itemsPerGroup
                                )
                                .map((page, index) => (
                                    <div
                                        className="carousel-item-gs"
                                        key={index}
                                        onClick={() => onSelectImage(page)}
                                    >
                                        <a>
                                            <img
                                                src={page.src}
                                                alt={page.alt}
                                            />
                                            <div className="alt-tooltip-gs">
                                                {page.alt}
                                            </div>
                                        </a>
                                    </div>
                                ))}
                        </div>
                    ))}
            </div>
            <div className="carousel-dots">
                {Array(groups)
                    .fill(0)
                    .map((_, idx) => (
                        <span
                            key={idx}
                            className={`dot ${
                                idx === activeGroup ? "active" : ""
                            }`}
                            onClick={() => setActiveGroup(idx)}
                        ></span>
                    ))}
            </div>
        </div>
    );
}

export default ImageSections;
