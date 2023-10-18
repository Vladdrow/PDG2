import React, { useState } from 'react';
import InputSearch from './InputSearch';
import Filter from './Filter';
import AdvancedFilter from './AdvancedFilter';
import "../../assets/css/desktop/components/searchbar.css";

function SearchBar() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [advancedFilters, setAdvancedFilters] = useState([]);

    const handleNewSearch = (term) => {
        console.log(`Buscando: ${term} en ${selectedCity ? selectedCity : 'todas las ciudades'}`);
        console.log(`Filtros seleccionados:`, advancedFilters);
        // Aquí puedes ejecutar la función que realiza la búsqueda con los criterios establecidos
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };

    const handleFilterChange = (option) => {
        setAdvancedFilters(prev => {
            if (prev.includes(option)) {
                return prev.filter(item => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    return (
        <div className="search-bar-container">
            <InputSearch onNewSearch={handleNewSearch} lastSearches={['Empresa A', 'Empresa B']} />
            <Filter placeholder={"Cities"} toFilter={['Ciudad A', 'Ciudad B', 'Ciudad C']} onSelectCity={handleCitySelect} />
            <Filter placeholder={"Countries"} toFilter={['Pais A', 'Pais B', 'Pais C']} onSelectCity={handleCitySelect} />
            <AdvancedFilter options={['Opción 1', 'Opción 2', 'Opción 3']} onFilterChange={handleFilterChange} />
        </div>
    );
}

export default SearchBar;
