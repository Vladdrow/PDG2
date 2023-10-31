import React from "react";
import SidebarSection from "./SidebarSection";
import "../../assets/css/desktop/components/sidebar.css";
import { sections } from "./SidebarNav";

const Sidebar = ({onSelect, onCollapsed}) => {
    return (
        <aside className={`sidebar ${onCollapsed ? "collapsed": ""}`}>
            {sections.map((section, index) => (
                <SidebarSection key={index} {...section} onSelect={onSelect} onCollapsed={onCollapsed}/>
            ))}
        </aside>
    );
};

export default Sidebar;
