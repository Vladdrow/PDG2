import React from "react";

function B_DescriptionInfo({ title, description, link, buttonText }) {
    const maxLength = 600;
    const processedDescription =
        description.length > maxLength
            ? description.substring(0, maxLength)
            : description;

    const showMoreButton = description.length > maxLength;

    return (
        <div className="box-description">
            <div className="desc-information">
                <div className="title-desc">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    <div className="description">
                        <p>{description}</p>
                    </div>
                </div>
                {/* showMoreButton && */ (
                    <div className="more-information">
                        <a
                            id="btn-more"
                            className="btn btn-danger m-2"
                            href={link}
                            target="_blank"
                        >
                            {buttonText}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default B_DescriptionInfo;
