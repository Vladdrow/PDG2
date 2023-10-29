import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

import CarouselDots from "./CarouselDots";
import "../../assets/css/desktop/components/imagesections.css";
/* import Contenedor from "../../../assets/resources/secciones/contenedor.png";
import Engranaje from "../../../assets/resources/secciones/engranaje.png"; */

function ImageSections({ images, onSelectImage }) {
    const itemsPerGroup = 6;
    const [activeGroup, setActiveGroup] = useState(0);
    const groups = Math.ceil(images.length / itemsPerGroup);

    const nextGroup = () => {
        setActiveGroup((prevGroup) => (prevGroup + 1) % groups);
    };

    const prevGroup = () => {
        setActiveGroup((prevGroup) =>
            prevGroup === 0 ? groups - 1 : prevGroup - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextGroup, 5000);
        return () => clearInterval(interval);
    }, [groups]);

    const handlers = useSwipeable({
        onSwipedLeft: () => nextGroup(),
        onSwipedRight: () => prevGroup(),
    });

    return (
        <div className="img-sections" {...handlers}>
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
                                .map((image, index) => (
                                    <div
                                        className="carousel-item-gs"
                                        key={index}
                                        onClick={() => onSelectImage(image)}
                                    >
                                        <a href="#information-section">
                                            <img
                                                src={image.RutaImagen}
                                                alt={image.Nombre}
                                            />
                                            <div className="alt-tooltip-gs">
                                                {image.Nombre}
                                            </div>
                                        </a>
                                    </div>
                                ))}
                        </div>
                    ))}
            </div>
            <CarouselDots
                items={Array(groups).fill(0)}
                activeIndex={activeGroup}
                setActiveIndex={setActiveGroup}
            />
        </div>
    );
}

export default ImageSections;
