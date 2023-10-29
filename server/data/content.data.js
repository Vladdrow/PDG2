import pool from "../db.js";
import { convertToLaPazTime } from "../utils/dateUtils.js";
/* import { promises as fs } from 'fs';
import path from 'path'; */

import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { readdir } from "fs/promises";

// CONSULTAS PARA EL HOME

// 1. Obtener datos del libro de turno
export const getBookInfo = async () => {
    const bookId = 1; //Numero de ejemplo
    const [result] = await pool.query("SELECT * FROM Libro WHERE ID = ?", [bookId]);
    return result[0];
};

// 2. Obtener el ID, SeccionID e imágenes de las empresas con tipo de membresía = 2
export const getCompaniesImg = async () => {
    const query = `
        SELECT e.ID, e.Nombre, e.SeccionID, me.TipoMembresia, aa.NombreArchivo ,aa.RutaArchivo
        FROM Empresa e
        JOIN Membresia_Empresa me ON e.ID = me.EmpresaID
        JOIN Archivo_Adjunto aa ON e.ID = aa.EmpresaID
        WHERE me.TipoMembresia = '2' AND aa.TipoArchivo = '1';   
    `; // 2 es de premium
    const [results] = await pool.query(query);
    console.log(results);
    return results;
};

// 3. Obtener todos los datos de las Secciones
export const getAllSections = async () => {
    const [results] = await pool.query("SELECT * FROM Seccion");
    return results;
};

// 4. Obtener todos los datos de los editores
export const getAllEditors = async () => {
    const [results] = await pool.query(
        "SELECT e.*, u.RutaImagen, u.NombreImagen FROM Editor e JOIN Usuario u ON e.UsuarioID = u.ID"
    );
    return results;
};

export const getSocialNetworksFromDB = async () => {
    // Suponiendo que tienes una función para interactuar con tu base de datos
    const networks = await pool.query("SELECT * FROM Red_Social");
    return networks;
};

/* Editores */
export const getBasicUsersUnified = async (page = 1, pageSize = 20) => {
    const offset = (page - 1) * pageSize;
    const query = `
        SELECT 
            u.ID, 
            COALESCE(e.Nombre, l.Nombre) AS Nombre,
            CASE 
                WHEN COALESCE(e.ApellidoMaterno, l.ApellidoMaterno) IS NOT NULL THEN 
                    CONCAT(COALESCE(e.ApellidoPaterno, l.ApellidoPaterno), ' ', COALESCE(e.ApellidoMaterno, l.ApellidoMaterno))
                ELSE
                    COALESCE(e.ApellidoPaterno, l.ApellidoPaterno)
            END AS Apellidos,
            u.CorreoElectronico,
            CASE 
                WHEN e.ID IS NOT NULL THEN 'Editor'
                ELSE 'Lector'
            END AS TipoUsuario,
            u.FechaRegistro,
            u.FechaUltimoAcceso
        FROM Usuario u
        LEFT JOIN Editor e ON u.ID = e.UsuarioID
        LEFT JOIN Lector l ON u.ID = l.UsuarioID
        LIMIT ? OFFSET ?;
    `;
    const [results] = await pool.query(query, [pageSize, offset]);

    return results;
};
//Conversor de utc a america/la_paz, estamos con pruebas entre este y la del front
/*     const formattedResults = results.map(user => ({
    ...user,
    FechaRegistro: convertToLaPazTime(user.FechaRegistro),
}));

return formattedResults; */

/* Servidor de directorio de archivos */
/* SocialNetworks Icons */
/* export const getSocialNetworksIcon = async () => {
    const directoryPath = join(dirname(fileURLToPath(import.meta.url)), '../assets/web/icon/social_networks');
    const files = await readdir(directoryPath);
    return files;
} */
