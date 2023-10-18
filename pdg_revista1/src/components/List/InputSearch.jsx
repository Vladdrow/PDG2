import React, { useState } from "react";
import "../../assets/css/desktop/components/inputsearch.css";

function InputSearch({ onNewSearch, lastSearches }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [showRecentSearches, setShowRecentSearches] = useState(false);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            setShowRecentSearches(true);
        } else {
            setShowRecentSearches(false);
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            onNewSearch(searchTerm);
            setShowRecentSearches(false);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setShowRecentSearches(false);
    };

    return (
        <div className="box-search input-search-container">
            <input
                type="text"
                placeholder="Empresa/Institucion a buscar..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchTerm && (
                <button onClick={handleClearSearch} className="clear-button">
                    X
                </button>
            )}
            <button onClick={handleSearch} className="search-button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>

            {showRecentSearches && (
                <div className="recent-searches">
                    <ul>
                        {lastSearches.map((search, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setSearchTerm(search);
                                    setShowRecentSearches(false);
                                }}
                            >
                                {search}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default InputSearch;
