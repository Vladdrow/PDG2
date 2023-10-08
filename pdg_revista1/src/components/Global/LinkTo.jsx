import React from "react";
import { Link } from "react-router-dom";

function LinkTo({Page}) {
    return (
        <Link to={Page.ToPage}>
            <div className="opc-nav btn btn-warning m-2">{Page.NamePage}</div>
        </Link>
    );
}

export default LinkTo;
