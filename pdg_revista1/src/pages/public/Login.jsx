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

import moment from "moment-timezone";

function Login() {
    const navigate = useNavigate();
    const { login: loginAuth, user: userAuth } = useAuth();
    /*"De useAuth(), extrae la propiedad login y 
    asígnala a una nueva variable llamada loginAuth". */
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
                navigate("/auth/dashboard");
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
                        {/* {fecha && (
                            <div className="alert alert-danger">{fecha}</div>
                        )} */}
                    </h2>
                    <form onSubmit={handleSubmit}>
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
                        <div className="box-inp mb-3">
                            <label htmlFor="password" className="form-label">
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
                <Link to="/auth/dashboard">Redirect Home</Link>
            </div>
        </main>
    );
}

export default Login;
