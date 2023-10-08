import React, { useEffect, useState } from "react";
import Down from "../../assets/svg/down-sharp.svg"

function DropdownMenu() {
    const options = [
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
        { value: "3", label: "Three" },
        { value: "4", label: "Four" },
        { value: "5", label: "Five" },
        { value: "6", label: "Six" },
        { value: "7", label: "Seven" },
        { value: "8", label: "Eight" },
        { value: "9", label: "Nine" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIsRotated(!isRotated);
    };

    const selectOption = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        setIsRotated(false); 
    };
    return (
        <div className="form-control dropdown">
            <input
                type="text"
                id="selectedOption"
                className="form-control"
                placeholder="Choose category..."
                value={selectedOption}
                readOnly
            />
            <button
                className="dropdown-toggle-me"
                id="dropdownToggle"
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : "false"}
                onClick={toggleDropdown}
            >
                <img
                    src={Down}
                    alt="Row Down"
                    id="row-down"
                    className={`row-down ${isRotated ? "rotated" : ""}`}
                />
            </button>
            {isOpen && (
                <div className="dropdown-menu" aria-labelledby="dropdownToggle">
                    {options.map((option) => (
                        <div
                            className="dropdown-option"
                            key={option.value}
                            onClick={() => selectOption(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
