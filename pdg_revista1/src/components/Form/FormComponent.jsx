import React from 'react'
import InputField from './InputField';
import PasswordStrengthIndicator from '../Security/PasswordStrengthIndicator';

const FormComponent = ({ formData, onChange, onSubmit, loading }) => {
    return (
        <form onSubmit={onSubmit}>
            <InputField
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                placeholder="Ingresa tu nombre"
                label="Nombre"
            />
            <InputField
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                placeholder="Ingresa tu apellido"
                label="Apellido"
            />
            <InputField
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Ingresa tu correo electrónico"
                label="Correo Electrónico"
            />
            <InputField
                type="email"
                name="email"
                value={formData.password}
                onChange={onChange}
                placeholder="Ingresa tu contraseña"
                label="Contraseña"
            />
            <PasswordStrengthIndicator password={formData.password} />
            <InputField
                type="email"
                name="email"
                value={formData.confirmPassword}
                onChange={onChange}
                placeholder="Confirma tu contraseña"
                label="Confirmar Contraseña"
            />
            <div className="btn-contain">
                <button type="submit" className="btn btn-primary mb-3">
                    {loading ? "Cargando..." : "Registrarse"}
                </button>
            </div>
        </form>
    );
};


export default FormComponent