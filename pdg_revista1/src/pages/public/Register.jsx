import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/desktop/pages/register.css";
/* Frontend */
import UserRegistration from "../../models/UserRegistration";
/* Recursos */
import Logistica from "../../assets/resources/pages/register/logistica2.jpg";
/* Components */
import B_FormWelcome from "../../components/Body/components/B_FormWelcome";
import LoadingOverlay from "../../components/Global/LoadingOverlay";

import { register } from "../../api/auth.api";
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [answerRegister, setRegister] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = new UserRegistration(formData.email, formData.password, formData.confirmPassword);
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
            Apellidos: `${user.apellidoPaterno} ${user.apellidoMaterno}`,
            correo: user.email,
            contrasena: user.password,
            confirmarContrasena: user.confirmPassword,
            esEditor: user.isEditor,
        };

        setLoading(true);
        try {
            const response = await register(userData);
            console.log("Registro exitoso:", response.data);
            setRegister(response.data);
            /* console.log(user); */
        } catch (error) {
            console.error("Error en el registro:", error);
            setRegister(error.response.data);
            user = null;
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container">
            {loading && <LoadingOverlay />}
            <div className="register-box">
                <B_FormWelcome />
                <section className="img-register">
                    <img src={Logistica} alt="" />
                </section>
                <section className="form-register">
                    <div className="page-title">
                        <h2 className="card-title text-center mb-4 pt-3">
                            Crea tu cuenta
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="box-inp row mb-3">
                            <div className="col">
                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ingresa tu nombre"
                                />
                            </div>
                            <div className="col">
                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Apellido:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ingresa tu apellido"
                                />
                            </div>
                        </div>
                        <div className="box-inp mb-3">
                            <label htmlFor="email" className="form-label">
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Ingresa tu correo electrónico"
                            />
                        </div>
                        <div className="box-inp row mb-3">
                            <div className="col">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Contraseña:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ingresa tu contraseña"
                                />
                            </div>
                            <div className="col">
                                <label
                                    htmlFor="confirmPassword"
                                    className="form-label"
                                >
                                    Confirmar Contraseña:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirma tu contraseña"
                                />
                            </div>
                        </div>
                        {/* <div className="therms-conditions">
                            <p>
                                Al registrarse, acepta los{" "}
                                <a href="#">Terminos y condiciones</a>
                            </p>
                        </div> */}
                        {answerRegister && (
                            <div className="alert alert-success">{answerRegister}</div>
                        )}
                        <div className="btn-contain">
                            <button
                                type="submit"
                                className="btn btn-primary mb-3"
                            >
                                {loading ? "Cargando..." : "Registrarse"}
                            </button>
                        </div>
                    </form>
                    <div className="have-account">
                        <p>
                            {" "}
                            Ya tienes cuenta?{" "}
                            <Link to="/login">Inicia Sesion</Link>{" "}
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Register;
