import React from "react";
import { convertToTimeZone } from "../../utils/timeUtils";
import config from "../../../config";

function DataTable({ data, columns, actions, onEditUser }) {
    const myIp = config.ipAddress;
    const baseURL = `http://${myIp}:3010`;

    const handleEdit = (user) => {
        if (onEditUser) {
            if (!user.RutaImagen.startsWith(baseURL)) {
                user.RutaImagen = `${baseURL}/assets/${user.RutaImagen}${user.NombreImagen}`;
            } else {
                console.log("Volviendo a concatenar a la rutaImagen")
            }
            onEditUser(user);
            /* console.log("base ",baseURL);
            console.log("ruta ",user.RutaImagen); */
        }
    };

    return (
        <div className="table-container">
            <table className="table table-hover">
                {/* table-bordered */}
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} scope="col">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item, rowIndex) => {
                            const fechaConvertida = convertToTimeZone(item.FechaRegistro);
                            return (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => {
                                        // Reemplaza el valor de FechaRegistro directamente en esta línea
                                        const value =
                                            col.key === "FechaRegistro"
                                                ? convertToTimeZone(item.FechaRegistro)
                                                : item[col.key];
                                        return <td key={colIndex}>{value}</td>;
                                    })}
                                    {actions && (
                                        <td>
                                            {actions.map((action, actionIndex) => (
                                                <button
                                                    key={actionIndex}
                                                    className={action.className}
                                                    onClick={() => {
                                                        if (action.text === "Editar") {
                                                            handleEdit(item);
                                                        }
                                                        // Aquí puedes agregar más acciones si las necesitas
                                                    }}
                                                >
                                                    {action.text}
                                                </button>
                                            ))}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
