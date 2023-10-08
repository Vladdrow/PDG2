import React from "react";

import Search from "../../assets/svg/search-sharp.svg";

import DropdownMenu from './DropdownMenu'

function SearchBar() {
    return (
        <section className="input-group search-hd">
            <input
                type="search"
                className="form-control box-search"
                placeholder="Write what you want to search..."
            />
            <DropdownMenu />
            <button className="btn btn-search" type="button">
                <img src={Search} alt="Search" className="search-icon" />
            </button>
        </section>
    );
}

export default SearchBar;
