import pool from "../db.js";
import { generateKeyWithSalt } from "../services/crypt.service.js";

export const saveUserToDb = async (user) => {
    const {
        email,
        password,
        isEditor,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
    } = user;

    try {
        await pool.query("START TRANSACTION");

        const resultUsuario = await pool.query(
            "INSERT INTO Usuario (CorreoElectronico, Contrasena, TipoUsuario, FechaRegistro) VALUES (?,?,?,?)",
            [email, password, isEditor ? "1" : "2", new Date()]
        );

        const UsuarioID = resultUsuario[0].insertId;
        const userTypeTable = isEditor ? "Editor" : "Lector";

        await pool.query(
            `INSERT INTO ${userTypeTable} (UsuarioID, Nombre, ApellidoPaterno, ApellidoMaterno) VALUES (?,?,?,?)`,
            [UsuarioID, nombre, apellidoPaterno, apellidoMaterno]
        );

        await pool.query("COMMIT");
        return "Registrando usuario";
    } catch (error) {
        await pool.query("ROLLBACK");
        throw error; // Re-lanza el error para que pueda ser manejado por niveles superiores
    }
};

export const getUserByEmail = async (email) => {
    const [results] = await pool.query(
        "SELECT ID, CorreoElectronico, Contrasena, BloqueoTemporal FROM Usuario WHERE CorreoElectronico = ?",
        [email]
    );
    return results[0];
};
export const getDataUser = async (userId) => {
    const [results] = await pool.query("SELECT ID, CorreoElectronico, TipoUsuario, FechaUltimoAcceso, FechaRegistro  FROM Usuario WHERE ID = ?", [
        userId,
    ]);
    return results[0];
};

export const getDateRegisterUser = async (userId) => {
    const [results] = await pool.query(
        "SELECT FechaRegistro FROM Usuario WHERE ID = ?",
        [userId]
    );
    return results[0];
};

export const getUserAdditionalDetails = async (userId, userType) => {
    const tableName = userType === "1" ? "Editor" : "Lector";

    const [results] = await pool.query(
        `SELECT * FROM ${tableName} WHERE UsuarioID = ?`,
        [userId]
    );
    return results[0];
};

export const updateLastAccess = async (userId) => {
    await pool.query("UPDATE Usuario SET FechaUltimoAcceso = ? WHERE ID = ?", [
        new Date(),
        userId,
    ]);
};

export const incrementFailedAttempts = async (userId) => {
    const [user] = await pool.query(
        "SELECT IntentosFallidos FROM Usuario WHERE ID = ?",
        [userId]
    );
    const failedAttempts = user[0].IntentosFallidos;

    if (failedAttempts >= 4) {
        await pool.query(
            "UPDATE Usuario SET BloqueoTemporal = DATE_ADD(?, INTERVAL 1 MINUTE) WHERE ID = ?",
            [new Date(), userId]
        );
    }
    await pool.query("UPDATE Usuario SET IntentosFallidos = ? WHERE ID = ?", [
        failedAttempts + 1,
        userId,
    ]);
};

export const clearFailedAttempts = async (userId) => {
    await pool.query(
        "UPDATE Usuario SET IntentosFallidos = 0, BloqueoTemporal = NULL WHERE ID = ?",
        [userId]
    );
};

export const storeKeyForUserWithSalt = async (userId) => {
    const dateUser = getDateRegisterUser(userId);


    /* console.log("REGISTER USER DATE:",registerUser); */
    const { key, salt } = generateKeyWithSalt(userId, dateUser);

    // Guardar en Llave_Lector
    await pool.query(
        "INSERT INTO Llave_Lector (LectorID, LlaveEncriptada, FirmaLlave, Estado, FechaCreacion) VALUES (?, ?, ?, ?, ?)",
        [userId, key, salt, "1", new Date()]
    );

    // Guardar en Llave_Valida
    await pool.query(
        "INSERT INTO Llave_Valida (LlaveEncriptada, FirmaLlave, EstadoLlave, Fecha) VALUES (?, ?, ?, ?)",
        [key, salt, "1", new Date()]
    );

    return key;
};
//Verificar si tiene una llave activa
export const hasActiveKey = async (userId) => {
    const [results] = await pool.query(
        "SELECT * FROM Llave_Lector WHERE LectorID = ? AND Estado = '1'",
        [userId]
    );
    return results.length > 0;
};

export const getLastKeyGenerationDate = async (userId) => {
    const [results] = await pool.query(
        "SELECT FechaCreacion FROM Llave_Lector WHERE LectorID = ? ORDER BY FechaCreacion DESC LIMIT 1",
        [userId]
    );
    return results[0]?.FechaCreacion;
};

//
export const getUserKey = async (userId) => {
    const [results] = await pool.query(
        "SELECT LlaveEncriptada FROM Llave_Lector WHERE LectorID = ?",
        [userId]
    );
    if (results.length === 0) {
        console.log("No se encontró llave para el usuario con ID:", userId);
        return null;
    }
    return results[0].LlaveEncriptada;
};

export const isValidUserKey = async (userKey) => {
    const [results] = await pool.query(
        "SELECT * FROM Llave_Valida WHERE LlaveEncriptada = ? AND EstadoLlave = '1'", // Suponiendo que '1' es Activo
        [userKey]
    );
    return results.length > 0;
};
