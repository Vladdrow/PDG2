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
            "INSERT INTO Usuario (CorreoElectronico, Contrasena, RutaImagen, NombreImagen, TipoUsuario, FechaRegistro) VALUES (?,?,?,?,?,?)",/* Añadiendo campos dep prueba */
            [email, password,"users/", `user${Math.floor(Math.random() * 4) + 1}.svg`,isEditor ? "1" : "2", new Date()]
        );
        const UsuarioID = resultUsuario[0].insertId;

        const userTypeTable = isEditor ? "Editor" : "Lector";
        let sql = `INSERT INTO ${userTypeTable} (UsuarioID, Nombre, ApellidoPaterno, ApellidoMaterno`;
        const values = [UsuarioID, nombre, apellidoPaterno, apellidoMaterno];

        if (isEditor) {
            sql += `, Rol, Descripcion) VALUES (?,?,?,?,?,?)`;
            values.push(
                "Comercio Exterior",
                "Alto, flaco de ojos verdes, etc, etc"
            );
        } else {
            sql += `) VALUES (?,?,?,?)`;
        }

        await pool.query(sql, values);

        await pool.query("COMMIT");
        return "Registrando usuario";
    } catch (error) {
        await pool.query("ROLLBACK");
        throw error; // Re-lanza el error para que pueda ser manejado por niveles superiores
    }
};

export const getUserById = async (id) => {
    const [results] = await pool.query(
        "SELECT ID, CorreoElectronico, Contrasena, BloqueoTemporal, IntentosFallidos FROM Usuario WHERE CorreoElectronico = ?",
        [email]
    );
    return results[0];
}
export const getUserByEmail = async (email) => {
    const [results] = await pool.query(
        /* "SELECT u.ID, u.CorreoElectronico, u.Contrasena, u.NombreImagen, u.RutaImagen, l.Nombre, l.ApellidoPaterno, l.ApellidoMaterno FROM Usuario u JOIN Lector l ON u.ID = l.usuarioID", */
        "SELECT ID, CorreoElectronico, Contrasena, BloqueoTemporal, IntentosFallidos FROM Usuario WHERE CorreoElectronico = ?",
        [email]
    );
    return results[0];
};
export const getDataUser = async (userId) => {
    const [results] = await pool.query(
        "SELECT ID, CorreoElectronico, TipoUsuario, FechaUltimoAcceso, FechaRegistro, RutaImagen, NombreImagen  FROM Usuario WHERE ID = ?",
        [userId]
    );
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

    // Filtrar los campos que deseas excluir (los dos primeros campos)
    const filteredResults = results.map((row) => {
        // Crear un nuevo objeto excluyendo los dos primeros campos
        const { ID, UsuarioID, ...restOfData } = row;
        return restOfData;
    });

    return filteredResults[0];
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
    let failedAttempts = user[0].IntentosFallidos;
    if (failedAttempts >= 4) {
        await pool.query(
            "UPDATE Usuario SET BloqueoTemporal = DATE_ADD(?, INTERVAL 1 MINUTE) WHERE ID = ?",
            [new Date(), userId]
            );
        }
    failedAttempts+=1;
    await pool.query("UPDATE Usuario SET IntentosFallidos = ? WHERE ID = ?", [
        failedAttempts,
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

    // Guardar en Llave_Usuario
    await pool.query(
        "INSERT INTO Llave_Usuario (UsuarioID, LlaveEncriptada, FirmaLlave, Estado, FechaCreacion) VALUES (?, ?, ?, ?, ?)",
        [userId, key, salt, "1", new Date()]
    );

    // Guardar en Llave_Valida
    await pool.query(
        "INSERT INTO Llave_Valida (LlaveEncriptada, FirmaLlave, EstadoLlave, FechaCreacion) VALUES (?, ?, ?, ?)",
        [key, salt, "1", new Date()]
    );

    return key;
};
//Verificar si tiene una llave activa
export const hasActiveKey = async (userId) => {
    const [results] = await pool.query(
        "SELECT * FROM Llave_Usuario WHERE UsuarioID = ? AND Estado = '1'",
        [userId]
    );
    return results.length > 0;
};

export const getLastKeyGenerationDate = async (userId) => {
    const [results] = await pool.query(
        "SELECT FechaCreacion FROM Llave_Usuario WHERE UsuarioID = ? ORDER BY FechaCreacion DESC LIMIT 1",
        [userId]
    );
    return results[0]?.FechaCreacion;
};

//
export const getUserKey = async (userId) => {
    const [results] = await pool.query(
        "SELECT LlaveEncriptada FROM Llave_Usuario WHERE UsuarioID = ?",
        [userId]
    );
    if (results.length === 0) {
        /* console.log("No se encontró llave para el usuario con ID:", userId); */
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
