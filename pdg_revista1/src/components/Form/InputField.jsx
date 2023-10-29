import React from "react";

const InputField = ({
    type,
    name,
    value,
    onChange,
    placeholder,
    label,
    inpclass = "form-control",
    divclass = "col",
    validation = null,
}) => {
    return (
        <>
            <div className={divclass}>
                <label htmlFor={name} className="form-label">
                    {label} 
                </label>
                <input
                    type={type}
                    className={inpclass}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    placeholder={placeholder}
                />
                {validation}
            </div>
        </>
    );
};

export default InputField;
