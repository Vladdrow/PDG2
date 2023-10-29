import React from "react";
import { convertToTimeZone } from "../../utils/timeUtils";

function DataTable({ data, columns, actions, onEditUser }) {
    const handleEdit = (user) => {
        if (onEditUser) {
            onEditUser(user);
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
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.key === "FechaRegistro"
                                                ? fechaConvertida
                                                : item[col.key]}
                                        </td>
                                    ))}
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
