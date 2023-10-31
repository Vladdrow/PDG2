import { useState, useEffect } from "react";
import Modal from "react-modal";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";
import { convertToTimeZone } from "../../utils/timeUtils";

import "../../assets/css/desktop/components/edituser.css";
Modal.setAppElement("#root"); // Esto es para la accesibilidad

function EditUserModal({ isOpen, onRequestClose, user }) {
    // Estados locales para cada campo
    const [id, setId] = useState(user?.ID || "");
    const [name, setName] = useState(user?.Nombre || "");
    const [surname, setSurname] = useState(user?.Apellidos || "");
    const [email, setEmail] = useState(user?.CorreoElectronico || "");
    const [userType, setUserType] = useState(user?.TipoUsuario || "");
    const [registrationDate, setRegistrationDate] = useState(user?.FechaRegistro || "");
    const [urlImagen, setUrlImagen] = useState(user?.RutaImagen || "");
    const convertedDate = user?.FechaRegistro ? convertToTimeZone(user?.FechaRegistro) : "";

    // Este useEffect se ejecutará cada vez que la propiedad 'user' cambie
    useEffect(() => {
        if (user) {
            setId(user.ID || "");
            setName(user.Nombre || "");
            setSurname(user.Apellidos || "");
            setEmail(user.CorreoElectronico || "");
            setUserType(user.TipoUsuario || "");
            setUrlImagen(user.RutaImagen || "");
            setRegistrationDate(convertedDate);
            /* setRegistrationDate(user.FechaRegistro || ""); */
        }
        console.log(user);
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
                beforeClose: "modal-content--before-close",
            }}
            overlayClassName={{
                base: "modal-overlay",
                afterOpen: "modal-overlay--after-open",
                beforeClose: "modal-overlay--before-close",
            }}
        >
            <button className="close-modal" onClick={onRequestClose}>
                X
            </button>
            <h2>Editar Usuario</h2>
            <form id="edit-user">
                <div className="box-inp row">
                    <div className="left-user">
                        <img src={urlImagen} width="150" height="150" alt={name}/>
                    </div>
                    <div className="right-user">
                        <InputField
                            label="ID"
                            value={id}
                            inpclass="form-control id-not-edit"
                            readOnly // ID generalmente no debería ser editable
                        />
                        <InputField
                            label="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
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
                <div className="box-inp row mb-5">
                    <SelectField
                        label="Tipo de Usuario" 
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        options={[
                            { value: "Lector", label: "Lector" },
                            { value: "Editor", label: "Administrativo" }
                        ]}
                    />
                    <InputField
                        label="Fecha de Registro"
                        value={registrationDate}
                        inpclass="form-control date-not-edit"
                        readOnly // Las fechas de registro también podrían no ser editables
                    />
                </div>
            </form>
            <button onClick={handleSaveChanges}>Guardar Cambios</button>
        </Modal>
    );
}

export default EditUserModal;
