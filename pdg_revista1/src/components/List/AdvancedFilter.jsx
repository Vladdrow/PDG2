import React, { useState } from "react";
import "../../assets/css/desktop/components/advancedfilter.css";

function AdvancedFilter({ options, onFilterChange }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const handleOptionToggle = (option) => {
        if (selectedOptions.includes(option)) {
            const newOptions = selectedOptions.filter(
                (item) => item !== option
            );
            setSelectedOptions(newOptions);
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
        onFilterChange(option);
    };

    return (
        <div className="box-search advanced-filter-container">
            <div className="btn-container">
                <input type="text" readOnly placeholder="Más Filtros" />
                <button
                    className="btn-filter"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                    >
                        <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                    </svg>
                    {showFilters ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                        >
                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                        >
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className={`options-container ${showFilters ? "active" : ""}`}>
                <div className="options-list">
                    {options.map((option, index) => (
                        <div key={index} className="option-item">
                            <input
                                type="checkbox"
                                id={`option-${index}`}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleOptionToggle(option)}
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdvancedFilter;
