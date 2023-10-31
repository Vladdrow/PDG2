import React from "react";

function UserListNavigation({ currentPage, setCurrentPage, usersList }) {
    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="btn-list-nav">
            <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
                Anterior
            </button>
            <span>Página {currentPage}</span>
            <button onClick={handleNextPage} disabled={usersList.length < 30}>
                Siguiente
            </button>
        </div>
    );
}

export default UserListNavigation;
