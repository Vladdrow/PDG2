import React, { useState, useEffect } from 'react';
import "../../assets/css/desktop/components/filter.css"

function Filter({placeholder, toFilter, onSelectCity }) {
    /* const [filteredCities, setFilteredCities] = useState([]); */
    const [filtered, setFiltered] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setFiltered(toFilter);
    }, [toFilter]);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchCity(searchTerm);
        if (searchTerm) {
            const matchingCities = toFilter.filter(city => city.toLowerCase().includes(searchTerm.toLowerCase()));
            setFiltered(matchingCities);
            setShowDropdown(true);
        } else {
            setFiltered(toFilter);
            setShowDropdown(false);
        }
    };

    return (
        <div className="box-search city-filter-container">
            <input
                type="text"
                placeholder={`${placeholder}...`}
                value={searchCity}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            />
             <button onClick={() => setShowDropdown(prev => !prev)} className="dropdown-button"><div className={`dropdown-arrow ${showDropdown ? 'rotated': ''}`}></div></button>
            {showDropdown && (
                <div className="city-dropdown">
                    <ul>
                        {filtered.map((object, index) => (
                            <li key={index} onClick={() => {
                                setSearchCity(object);
                                onSelectCity(object);
                                setShowDropdown(false);
                            }}>
                                {object}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Filter;