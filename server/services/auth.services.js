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

export const registerUser = async (user) => {
    if (!user.isPasswordValid(user.password)) {
        throw new Error("Contraseña no válida");
    }
    if (!user.passwordsMatch(user.password, user.confirmPassword)) {
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

    const isBlocked =
        userFromDb.BloqueoTemporal && bloqueoTemporal > currentDate;

    if (isBlocked) {
        return {
            success: false,
            message:
                "Tu cuenta ha sido temporalmente bloqueada. Por favor, espera un momento y vuelve a intentarlo.",
        };
    } else if (bloqueoTemporal <= currentDate) {
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

        const dataUser = await getDataUser(user.id);
        const additionalUserInfo = await getUserAdditionalDetails(
            user.id,
            userFromDb.TipoUsuario
        );
        const llaveValida = await hasValidKey(user.id);

        return buildFullUserInfo(dataUser, additionalUserInfo, llaveValida);
    } else {
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

const buildFullUserInfo = (dataUser, additionalUserInfo, isPremium) => {
    const fullUserInfo = {
        ID: dataUser.ID,
        CorreoElectronico: dataUser.CorreoElectronico,
        Nombre: additionalUserInfo.Nombre,
        ApellidoPaterno: additionalUserInfo.ApellidoPaterno,
        ApellidoMaterno: additionalUserInfo.ApellidoMaterno,
        IsEditor: dataUser.TipoUsuario === "1" ? true : false,
        IsPremium: isPremium,
        FechaUltimoAcceso: dataUser.FechaUltimoAcceso,
        FechaRegistro: dataUser.FechaRegistro,
    };
    return {
        success: true,
        message: "Inicio de sesión exitoso",
        userDataDB: fullUserInfo,
    };
};

const hasValidKey = async (userId) => {
    const userKey = await getUserKey(userId);
    return await isValidUserKey(userKey);
};
