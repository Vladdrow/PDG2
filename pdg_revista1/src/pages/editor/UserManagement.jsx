import React, { useState, useEffect } from "react";
import InputField from "../../components/Form/InputField";
import Register from "../public/Register";
import { getUserDataList } from "../../api/content.api";
import { convertToTimeZone } from "../../utils/timeUtils";

//Components
import RegistrationModal from "../../components/Modal/RegistrationModal";
import EditUserModal from "../../components/Modal/EditUserModal";

import FilterInput from "../../components/List/FilterInput";
import FilterDropdown from "../../components/List/FilterDropdown";
import UserListNavigation from "../../components/List/UserListNavigation";
import DataTable from "../../components/List/DataTable";
import UserFilters from "../../components/Filter/UserFilters";

import "../../assets/css/desktop/components/usermanagement.css";

function PublisherRegistry() {
    const [usersList, setUsersList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    /*     const [userTypeFilter, setUserTypeFilter] = useState("");
    const [keyStatusFilter, setKeyStatusFilter] = useState("");
    const [registrationDateFilter, setRegistrationDateFilter] = useState("");
    const [lastAccessDateFilter, setLastAccessDateFilter] = useState("");
    const [keyCreationDateFilter, setKeyCreationDateFilter] = useState("");
    const [failedAttemptsFilter, setFailedAttemptsFilter] = useState("");
    const [editorRoleFilter, setEditorRoleFilter] = useState("");
    const [emailDomainFilter, setEmailDomainFilter] = useState("");
    const [temporaryLockFilter, setTemporaryLockFilter] = useState(""); */
    const [filters, setFilters] = useState({
        userTypeFilter: "",
        keyStatusFilter: "",
        registrationDateFilter: "",
        lastAccessDateFilter: "",
        keyCreationDateFilter: "",
        failedAttemptsFilter: "",
        editorRoleFilter: "",
        emailDomainFilter: "",
        temporaryLockFilter: "",
    });

    const [showMoreFilters, setShowMoreFilters] = useState(false);
    /* const [isModalOpen, setIsModalOpen] = useState(false); */

    const [isModalOpen, setModalOpen] = useState(false);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const userColumns = [
        { header: "#", key: "ID" },
        { header: "Nombre", key: "Nombre" },
        { header: "Apellidos", key: "Apellidos" }, // Nota: Puedes combinar ApellidoPaterno y ApellidoMaterno antes de enviarlos al componente si es necesario
        { header: "Correo", key: "CorreoElectronico" },
        { header: "TipoUsuario", key: "TipoUsuario" },
        { header: "FechaRegistro", key: "FechaRegistro" },
    ];

    const userActions = [
        { text: "Editar", className: "btn-edit" },
        { text: "Eliminar", className: "btn-delete" },
    ];

    const fetchData = async () => {
        const data = await getUserDataList(currentPage);
        setUsersList(data);
    };

    useEffect(() => {
        fetchData(currentPage); // Llama a fetchData con la página actual al montar el componente
    }, [currentPage]); // Dependencia agregada para que se ejecute cada vez que cambie currentPage

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1); // Incrementa el número de página
    };

    return (
        <>
            {/* <Register /> */}
            <section id="show-users">
                <div className="header-section">
                    <h2>Usuarios</h2>
                    {/* <button>
                        Exportar
                    </button> */}
                    <button className="btn-new-user" onClick={() => setModalOpen(true)}>
                        Nuevo Usuario
                    </button>
                </div>
                <RegistrationModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setModalOpen(false)}
                /> 
                <UserFilters
                    filters={filters}
                    setFilters={setFilters}
                    showMoreFilters={showMoreFilters}
                    setShowMoreFilters={setShowMoreFilters}
                />

                <div className="users-list">
                    <UserListNavigation
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        usersList={usersList}
                    />
                    <DataTable
                        data={usersList}
                        columns={userColumns}
                        actions={userActions}
                        onEditUser={openEditModal}
                    />
                </div>
                <EditUserModal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setEditModalOpen(false)}
                    user={selectedUser}
                />
            </section>
        </>
    );
}

export default PublisherRegistry;
