import React,{useState} from "react";

import "../../assets/css/desktop/pages/about.css"
function About() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div id="app">
            <div id="header">HEADER</div>
            <div id="sidebar" className={collapsed ? "collapsed" : ""}>
                {/* Aquí tus íconos y botón para colapsar */}
                <button onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? "Expandir" : "Colapsar"}
                </button>
                <div className="sidebar-btn">Icono 1</div>
                <div className="sidebar-btn">Icono 2</div>
                {/* ... */}
            </div>
            <div id="content" className={collapsed ? "full" : ""}>
                CONTENEDOR
            </div>
        </div>
    );
}

export default About;
