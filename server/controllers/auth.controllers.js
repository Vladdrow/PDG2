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
        const result = await loginUserService(email,password);

        if (result.success) {
            res.send(result);
            // En el futuro aquí es donde se enviará un token JWT al cliente.
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
    const { userId } = req.body;  // Suponiendo que el ID del usuario se pasa en el cuerpo de la solicitud

    try {
        const result = await confirmPay(userId);

        if (result.success) {
            res.send(result);
        } else {
            console.log(result.message);
            res.status(400).send(result.message);  // 400 Bad Request es apropiado aquí
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al confirmar el pago y generar la llave");
    }
};
