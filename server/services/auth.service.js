import {
    saveUserToDb,
    getUserByEmail,
    getDataUser,
    updateLastAccess,
    incrementFailedAttempts,
    clearFailedAttempts,
    getUserAdditionalDetails,
    storeKeyForUserWithSalt,
    hasActiveKey, // Asume que esta función ya está definida en auth.data
    getLastKeyGenerationDate,
    getUserKey,
    isValidUserKey,
} from "../data/auth.data.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET_STR =
    "0f350ee0f7fae11cf9bd517f2db0a510353e17f37fc0658fd9f76fb604c6631899f2cd05d9e1fcd08a30ba0e31270325693c3b1ae247f83077a57b6fb6462d00"; /* = config.jwtSecret; */

export const registerUser = async (user) => {
    if (!user.isPasswordValid()) {
        throw new Error("Contraseña no válida");
    }
    if (!user.passwordsMatch()) {
        throw new Error("Las contraseñas no coinciden");
    }
    await user.setHashedPassword(user.password);
    return await saveUserToDb(user);
};

export const loginUser = async (correo, contrasena) => {
    const userFromDb = await getUserByEmail(correo);
    if (!userFromDb) {
        return { success: false, message: "Usuario no encontrado" };
    }

    const currentDate = new Date();
    const bloqueoTemporal = new Date(userFromDb.BloqueoTemporal);
    const failedAttempts = userFromDb.IntentosFallidos;

    const isBlocked =
        userFromDb.BloqueoTemporal && bloqueoTemporal > currentDate;

    if (isBlocked) {
        return {
            success: false,
            message:
                "Tu cuenta ha sido temporalmente bloqueada. Por favor, espera un momento y vuelve a intentarlo.",
        };
    } else if (bloqueoTemporal <= currentDate && failedAttempts > 4) {
        console.log("Borrando intentos fallidos");
        await clearFailedAttempts(userFromDb.ID);
    }

    const user = new User(
        userFromDb.ID,
        userFromDb.CorreoElectronico,
        userFromDb.Contrasena,
        null
    );
    if (await user.checkHashedPassword(contrasena)) {
        clearFailedAttempts(user.id);
        updateLastAccess(user.id);

        /*  */
        const dataUser = await getDataUser(user.id);
        const additionalUserInfo = await getUserAdditionalDetails(
            dataUser.ID,
            dataUser.TipoUsuario
        );
        const isPremium = await hasValidKey(user.id);
        /*  */
        const userPayload = {
            id: dataUser.ID,
            name: additionalUserInfo.Nombre,
            userType: userFromDb.TipoUsuario,
        };

        const token = jwt.sign(userPayload, JWT_SECRET_STR, {
            expiresIn: "1h",
        }); // El token expira en 1 hora
        /* res.cookie('token', token, { httpOnly: true }); */
        return buildFullUserInfo(
            dataUser,
            additionalUserInfo,
            isPremium,
            token
        ); // Agregamos el token a la respuesta
    } else {
        console.log("id", user.id);
        incrementFailedAttempts(user.id);
        return { success: false, message: "Contraseña incorrecta" };
    }
};

export const confirmPaymentAndGenerateKey = async (userId) => {
    if (await hasActiveKey(userId)) {
        return {
            success: false,
            message: "El usuario ya tiene una llave activa.",
        };
    }

    const lastKeyDate = await getLastKeyGenerationDate(userId);
    const oneDayMiliseconds = 24 * 60 * 60 * 1000;
    if (
        lastKeyDate &&
        new Date().getTime() - new Date(lastKeyDate).getTime() <
            oneDayMiliseconds
    ) {
        return {
            success: false,
            message:
                "No se puede generar una llave tan pronto para este usuario.",
        };
    }

    // 1. Confirmar el pago (aquí puedes agregar cualquier lógica o llamada a API para confirmar el pago)
    const paymentConfirmed = true;
    if (!paymentConfirmed) {
        return { success: false, message: "El pago no se ha confirmado" };
    }
    // 2. Generar y almacenar la llave y salt
    try {
        const key = await storeKeyForUserWithSalt(userId);
        return {
            success: true,
            message: "Pago confirmado y llave generada exitosamente",
            key: key,
        };
    } catch (error) {
        console.error("Error al generar y almacenar la llave:", error);
        return {
            success: false,
            message: "Hubo un error al generar y almacenar la llave",
        };
    }
};

/* export const verifyToken = async (token) => {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET_STR);
        const userId = decodedToken.id;

        // Obtén los datos del usuario por su ID
        const user = await getDataUser(userId);
        const additionalUserInfo = await getUserAdditionalDetails(
            user.ID,
            user.TipoUsuario
        );
        const isPremium = await hasValidKey(user.id);
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            user: {
                ...user,
                additionalUserInfo: additionalUserInfo,
                isPremium: isPremium,
            },
        };
    } catch (error) {
        console.error("Token verification failed:", error);
        return {
            success: false,
            error: error.message,
        };
    }
}; */

/* Usuario lector logeado */
const buildFullUserInfo = (dataUser, additionalUserInfo, isPremium, token) => {
    const fullUserInfo = {
        ID: dataUser.ID,
        CorreoElectronico: dataUser.CorreoElectronico,
        Nombre: additionalUserInfo.Nombre,
        ApellidoPaterno: additionalUserInfo.ApellidoPaterno,
        ApellidoMaterno: additionalUserInfo.ApellidoMaterno,
        IsEditor: dataUser.TipoUsuario === "1" ? true : false,
        IsPremium: isPremium,
        RutaImagen: dataUser.RutaImagen,
        NombreImagen: dataUser.NombreImagen,
        FechaUltimoAcceso: dataUser.FechaUltimoAcceso,
        FechaRegistro: dataUser.FechaRegistro,
    };
    return {
        success: true,
        message: "Inicio de sesión exitoso",
        userDataDB: fullUserInfo,
        token: token,
    };
};

const hasValidKey = async (userId) => {
    const userKey = await getUserKey(userId);
    return await isValidUserKey(userKey);
};
