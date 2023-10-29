import { useState, useEffect } from "react";
import Modal from "react-modal";
import InputField from "../Form/InputField";

Modal.setAppElement("#root"); // Esto es para la accesibilidad

function EditUserModal({ isOpen, onRequestClose, user }) {
    // Estados locales para cada campo
    const [id, setId] = useState(user?.ID || "");
    const [name, setName] = useState(user?.Nombre || "");
    const [surname, setSurname] = useState(user?.Apellidos || "");
    const [email, setEmail] = useState(user?.CorreoElectronico || "");
    const [userType, setUserType] = useState(user?.TipoUsuario || "");
    const [registrationDate, setRegistrationDate] = useState(user?.FechaRegistro || "");

    // Este useEffect se ejecutará cada vez que la propiedad 'user' cambie
    useEffect(() => {
        if (user) {
            setId(user.ID || "");
            setName(user.Nombre || "");
            setSurname(user.Apellidos || "");
            setEmail(user.CorreoElectronico || "");
            setUserType(user.TipoUsuario || "");
            setRegistrationDate(user.FechaRegistro || "");
        }
    }, [user]);

    const handleSaveChanges = () => {
        // Lógica para guardar los cambios del usuario editado.
        // Esta función puede hacer una llamada API para actualizar los datos,
        // y luego actualizar la lista de usuarios en el componente padre.
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal de Edición"
            className={{
                base: "modal-content",
                afterOpen: "modal-content--after-open",
            }}
            overlayClassName={{
                base: "modal-overlay",
                afterOpen: "modal-overlay--after-open",
            }}
        >
            <button className="close-modal" onClick={onRequestClose}>
                X
            </button>
            <div>
                <h2>Editar Usuario</h2>
                <InputField
                    label="ID"
                    value={id}
                    readOnly // ID generalmente no debería ser editable
                />
                <InputField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <InputField
                    label="Apellidos"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <InputField
                    label="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Tipo de Usuario"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                />
                <InputField
                    label="Fecha de Registro"
                    value={registrationDate}
                    readOnly // Las fechas de registro también podrían no ser editables
                />
                {/* ... (otros campos que quieras incluir) */}
                <button onClick={handleSaveChanges}>Guardar Cambios</button>
            </div>
        </Modal>
    );
}

export default EditUserModal;
