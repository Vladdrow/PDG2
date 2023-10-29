import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "../../assets/css/desktop/pages/register.css";
/* Frontend */
import UserRegistration from "../../models/UserRegistration";
/* Recursos */
import Logistica from "../../assets/resources/pages/register/logistica2.jpg";
/* Components */
import B_FormWelcome from "../../components/Body/components/B_FormWelcome";
import LoadingOverlay from "../../components/Global/LoadingOverlay";
import FormComponent from "../../components/Form/FormComponent";

import { register } from "../../api/auth.api";
import InputField from "../../components/Form/InputField";

const Register = ({ isPage = false, onRequestClose }) => {
    const navigate = useNavigate();
    const { login: loginAuth, user: userAuth } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setIsEditorChecked(false);
        setSelectedRole("");
        setRoleDescription("");
        setIsPasswordValid(true);
        setPasswordStrengthMessage("");
        setIsConfirmPasswordValid(true);
        setSamePasswords(null);
    };

    const [loading, setLoading] = useState(false);
    const [answerRegister, setRegister] = useState("");

    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [samePasswords, setSamePasswords] = useState();
    
    const [isEditorChecked, setIsEditorChecked] = useState(false);
    const [roleDescription, setRoleDescription] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const handleCheckboxChange = (event) => {
        setIsEditorChecked(event.target.checked);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            if (value === "") {
                setPasswordStrengthMessage(""); // Si la contraseña está vacía, no mostrar mensaje
            } else {
                const newPassword = value;
                setPasswordStrengthMessage(
                    getPasswordStrengthMessage(newPassword)
                );
            }
        }
        if (name === "confirmPassword") {
            if (value === formData.password) {
                setIsConfirmPasswordValid(true);
            } else {
                setIsConfirmPasswordValid(false);
                setSamePasswords(getMessageSamePassword());
            }
        }
    };

    const getMessageSamePassword = () => {
        return (
            <span className="invalid-feedback">
                Las contraseñas no coinciden.
            </span>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = new UserRegistration(
            formData.email,
            formData.password,
            formData.confirmPassword
        );
        user.setNombreCompleto(formData.firstName, formData.lastName);

        if (!user.passwordsMatch()) {
            alert("Las contraseñas no coinciden");
            return;
        }

        if (!user.isPasswordValid()) {
            alert("La contraseña no cumple con los criterios de seguridad");
            return;
        }

        const userData = {
            Nombre: user.nombre,
            Apellidos: `${user.apellidoPaterno} ${user.apellidoMaterno}`.trim(),
            correo: user.email,
            contrasena: user.password,
            confirmarContrasena: user.confirmPassword,
            esEditor: user.isEditor,
        };

        setLoading(true);
        try {
            const response = await register(userData);
            if (response.data.success) {
                resetForm();
                if (isPage) {
                    console.log("Registro y login exitoso:", response.data);
                    setRegister(response.data);
                    loginAuth(response.data.userDataDB);
                    navigate("/auth/logistics-entities");
                } else {
                    onRequestClose();
                    console.log("Usuario registrado exitosamente");
                }
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            setRegister(error.response.data);
            user = null;
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthMessage = (password) => {
        if (password.length >= 8) {
            if (!/[a-z]/.test(password)) {
                return (
                    <span style={{ color: "red" }}>
                        Debe contener al menos una letra minúscula.
                    </span>
                );
            }
            if (!/[A-Z]/.test(password)) {
                return (
                    <span style={{ color: "red" }}>
                        Debe contener al menos una letra mayúscula.
                    </span>
                );
            }
            if (!/\d/.test(password)) {
                return (
                    <span style={{ color: "red" }}>
                        Debe contener al menos un número.
                    </span>
                );
            }
            if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
                return (
                    <span style={{ color: "red" }}>
                        Debe contener al menos un carácter especial.
                    </span>
                );
            }
        } else {
            return (
                <span style={{ color: "red" }}>
                    Debe tener al menos {8 - password.length} caracteres.
                </span>
            );
        }
        return <span style={{ color: "green" }}>Contraseña válida</span>;
    };

    return (
        <main className="container">
            {loading && <LoadingOverlay />}
            <div className="register-box">
                {isPage && (
                    <>
                        <B_FormWelcome />
                        <section className="img-register">
                            <img src={Logistica} alt="" />
                        </section>
                    </>
                )}
                <section className="form-register">
                    <div className="page-title">
                        <h2 className="card-title text-center mb-4 pt-3">
                            {isPage ? "Crea tu cuenta" : "Nuevo Usuario"}
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="box-inp row mb-3">
                            <InputField
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                label="Nombre:"
                            />
                            <InputField
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Ingresa tu apellido"
                                label="Apellido:"
                            />
                        </div>
                        {!isPage && (
                            <div>
                                <label
                                    htmlFor="check-is-editor"
                                    className="label-check-editor"
                                >
                                    ¿Administrativo?   
                                </label>
                                <input
                                    type="checkbox"
                                    id="check-is-editor"
                                    checked={isEditorChecked}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        )}
                        
                        <div className={isEditorChecked ? "editor-fields open" : "editor-fields"}>
                            <div>
                                <label htmlFor="role">Rol:</label>
                                <select 
                                    id="role" 
                                    value={selectedRole} 
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                >
                                    <option value="">Selecciona un rol</option>
                                    <option value="Gerente General">Gerente General</option>
                                    <option value="Fotógrafo">Fotógrafo</option>
                                    <option value="Gerente de Marketing">Gerente de Marketing</option>
                                    <option value="Coordinador de Redes Sociales">Coordinador de Redes Sociales</option>
                                    
                                </select>
                            </div>
                            <div>
                                <label htmlFor="description">Descripción:</label>
                                <textarea 
                                    id="description"
                                    /* value={roleDescription} */
                                    onChange={(e) => setRoleDescription(e.target.value)}
                                    /* maxLength={200}
                                    placeholder="Descripción (máximo 200 caracteres)" */
                                ></textarea>
                            </div>
                        </div>
                        
                        <InputField
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingresa tu correo electrónico"
                            label="Correo Electrónico:"
                            divclass="box-inp"
                        />
                        <div className="box-inp row mb3">
                            <InputField
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                label="Contraseña:"
                                validation={passwordStrengthMessage}
                            />
                            <InputField
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirma tu contraseña"
                                label="Confirmar Contraseña:"
                                inpclass={`form-control ${
                                    !isConfirmPasswordValid ? "is-invalid" : ""
                                }`}
                                validation={samePasswords}
                            />
                        </div>

                        <div className="btn-contain">
                            <button
                                type="submit"
                                className="btn btn-primary mb-3"
                            >
                                {loading ? "Cargando..." : "Registrarse"}
                            </button>
                        </div>
                    </form>
                    {isPage && (
                        <div className="have-account">
                            <p>
                                Ya tienes cuenta?
                                <Link to="/login">Inicia Sesion</Link>
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Register;
