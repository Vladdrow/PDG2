import pool from "../db";

// CONSULTAS PARA EL HOME

// 1. Obtener datos del libro de turno
export const getBookInfo = async () => {
    const bookId = '1'; //Numero de ejemplo
    const [result] = await pool.query("SELECT * FROM Libro WHERE ID = ?", [bookId]);
    return result[0];
}
/* export const getAllBooks = async () => {
    const [results] = await pool.query("SELECT * FROM Libro");
    return results;
};
 */
// 2. Obtener el ID, SeccionID e imágenes de las empresas con tipo de membresía = 2
export const getCompaniesImg = async () => {
    const query = `
        SELECT e.ID, e.SeccionID, aa.RutaArchivo AS Imagen
        FROM Empresa e
        JOIN Membresia_Empresa me ON e.ID = me.EmpresaID
        JOIN Archivo_Adjunto aa ON e.ID = aa.EmpresaID
        WHERE me.TipoMembresia = '2';   
    `;// 2 es de premium
    const [results] = await pool.query(query);
    return results;
};

// 3. Obtener todos los datos de las Secciones
export const getAllSections = async () => {
    const [results] = await pool.query("SELECT * FROM Seccion");
    return results;
};

// 4. Obtener todos los datos de los editores
export const getAllEditors = async () => {
    const [results] = await pool.query("SELECT * FROM Editor");
    return results;
};