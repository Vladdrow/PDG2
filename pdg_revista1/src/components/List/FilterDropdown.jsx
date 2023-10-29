import React from "react";

function FilterDropdown({ label, options, value, onChange }) {
    return (
        <div className="filter-wrapper">
            <label className="filter-label">{label}</label>
            <select value={value} onChange={onChange}>
                <option value="">Todos</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterDropdown;
