import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    confirmPaymentAndGenerateKey as confirmPay,
} from "../services/auth.services.js";
import User from "../models/User.js";
export const register = async (req, res) => {
    const {
        Nombre,
        Apellidos,
        correo,
        contrasena,
        confirmarContrasena,
        esEditor,
    } = req.body;

    const user = new User(null, correo, contrasena, confirmarContrasena);
    user.setNombreCompleto(Nombre, Apellidos);
    user.setIsEditor(esEditor);

    try {
        const result = await registerUserService(user);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al registrar el usuario");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    /* console.log(req.body); */

    try {
        /* console.log(email,password); */
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
    res.clearCookie('jwt');
    res.send({success: true, message: 'Sesión cerrada exitosamente.'});
};

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send({ message: "Acceso no autorizado" });
    }

    try {
        const userPayload = jwt.verify(token, JWT_SECRET);
        req.user = userPayload;  // Guarda el payload del usuario en el objeto req
        next();
    } catch (error) {
        res.status(401).send({ message: "Token inválido" });
    }
};