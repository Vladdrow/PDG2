import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    confirmPaymentAndGenerateKey as confirmPay,
} from "../services/auth.service.js";
import User from "../models/User.js";
export const register = async (req, res) => {
    const inputData = req.body;

    const processUser = async (userData) => {
        const {
            Nombre,
            Apellidos,
            correo,
            contrasena,
            confirmarContrasena,
            esEditor,
        } = userData;

        const user = new User(null, correo, contrasena, confirmarContrasena);
        user.setNombreCompleto(Nombre, Apellidos);
        user.setIsEditor(esEditor);

        return await registerUserService(user);
    };

    try {
        if (Array.isArray(inputData)) {
            // Si inputData es un array
            const results = await Promise.all(inputData.map(processUser));
            res.send(results);
        } else {
            // Si inputData es un objeto
            const resultRegister = await processUser(inputData);
            if (resultRegister) {
                // Asumiendo que esto indica un registro exitoso
                const { correo, contrasena } = inputData;
                const resultLogin = await loginUserService(correo, contrasena);
                if (resultLogin.success) {
                    res.send(resultLogin); // Envía la respuesta del login que incluye el token
                } else {
                    // Maneja cualquier error que pueda ocurrir durante el login
                    res.status(401).send(resultLogin.message);
                }
            } else {
                // Maneja cualquier error que pueda ocurrir durante el registro
                res.status(500).send("Hubo un error al registrar el usuario");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al registrar el usuario");
    }
};

export const registerController = async (req, res) => {
    if (req.userData) {
        console.log("Hay Token");
        // Token válido proporcionado, tal vez redirigir a una página de inicio
        /* res.redirect('/auth/dashboard'); */
    } else {
        console.log("Register:");
        register();
    }
};
export const loginController = async (req, res) => {
    if (req.userData) {
        console.log("Hay Token");
        // Token válido proporcionado, tal vez redirigir a una página de inicio
        /* res.redirect('/auth/dashboard'); */
    } else {
        login();
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await loginUserService(email, password);

        if (result.success) {
            res.cookie("jwt", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Asegurar la cookie si estás en producción
                maxAge: 3600000, // 1 hora en milisegundos
            });
            res.send(result);
        } else {
            console.log(result.message);
            res.status(401).send(result.message);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al iniciar sesión");
    }
};

export const confirmPaymentAndGenerateKey = async (req, res) => {
    const { userId } = req.body; // Suponiendo que el ID del usuario se pasa en el cuerpo de la solicitud

    try {
        const result = await confirmPay(userId);

        if (result.success) {
            res.send(result);
        } else {
            console.log(result.message);
            res.status(400).send(result.message); // 400 Bad Request es apropiado aquí
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "Hubo un error al confirmar el pago y generar la llave"
        );
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.send({ success: true, message: "Sesión cerrada exitosamente." });
};

/* export const verifyTokenController = async (req, res) => {
    const token = req.cookies.jwt; // Asume que estás usando una librería como cookie-parser

    const verificationResult = await verifyToken(token);
    if (verificationResult.success) {
        res.status(200).send({ authenticated: true, user: verificationResult.user});
    } else {
        res.status(401).send({
            authenticated: false,
            error: verificationResult.error,
        });
    }
};

export const optionalTokenVerification = async (req, res, next) => {
    const token = req.cookies.jwt; // Asume que estás usando una librería como cookie-parser
    console.log("token:",token);
    if (token) {
        const verificationResult = await verifyToken(token);
        if (verificationResult.success) {
            req.userData = verificationResult.user; // Almacena los datos del usuario en req para uso posterior
        } else {
            console.error(
                "Token verification failed:",
                verificationResult.error
            );
            res.clearCookie("jwt"); // Opcional: podrías querer limpiar la cookie si el token es inválido
        }
    }
    next(); // Pasa al siguiente middleware o ruta
};
 */
