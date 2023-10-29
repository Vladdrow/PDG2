import React from "react";

function FilterInput({ label, value, onChange, placeholder }) {
    return (
        <div className="filter-wrapper">
            <label className="filter-label">{label}</label>
            <input
                type="date"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default FilterInput;
