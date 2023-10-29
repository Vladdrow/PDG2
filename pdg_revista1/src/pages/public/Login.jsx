import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginUser } from "../../api/auth.api";
import "../../assets/css/desktop/pages/login.css";

import { useAuth } from "../../context/AuthContext";
/* Resources */
import Logistica from "../../assets/resources/pages/login/transporte.jpg";
/* Components */
import B_FormWelcome from "../../components/Body/components/B_FormWelcome";
import LoadingOverlay from "../../components/Global/LoadingOverlay";
import InputField from "../../components/Form/InputField";

function Login() {
    const navigate = useNavigate();
    const { login: loginAuth, user: userAuth } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    /* const [fecha, setFecha] = useState(""); */

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await loginUser(formData);
            if (response.data.success) {
                loginAuth(response.data.userDataDB);
                /* console.log("Success: ", userAuth); */
                navigate("/auth/logistics-entities");
            }
            console.log(response.data.message);
            // Por ejemplo: redirigir al dashboard
            /* Aqui la redireccion o donde sea conveniente */
        } catch (err) {
            console.log("Error: " + err);
            // Manejo de errores basado en la respuesta del servidor
            if (err.response && err.response.status === 401) {
                console.log(
                    err.response.data
                ); /* Imprime en consola el error */
                setError(err.response.data.message);
            } else {
                setError("Hubo un error al iniciar sesión.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container">
            {loading && <LoadingOverlay />}
            <div className="login-box">
                <B_FormWelcome />
                <section className="img-register">
                    <img src={Logistica} alt="" />
                </section>
                <section className="form-login">
                    <h2 className="card-title text-center mb-4 pt-3">
                        Inicio de Sesión
                    </h2>
                    <form onSubmit={handleSubmit}>                        
                        <InputField 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingresa tu correo electrónico"
                            label="Correo Electrónico:"
                            divclass="box-inp"
                        />
                        <InputField 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            label="Contraseña:"
                            divclass="box-inp"
                        />
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        <div className="btn-contain">
                            <button
                                type="submit"
                                className="btn btn-primary mb-3"
                            >
                                {loading ? "Cargando..." : "Iniciar Sesión"}
                            </button>
                        </div>
                    </form>
                    <div className="dont-account">
                        <p className="m-0">
                            No tienes cuenta?{" "}
                            <Link to="/register">Regístrate</Link>{" "}
                        </p>
                    </div>
                    <div className="forgot-passwd mb-3">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
