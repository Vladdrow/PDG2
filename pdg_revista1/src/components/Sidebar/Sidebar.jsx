import React from "react";
import SidebarSection from "./SidebarSection";
import "../../assets/css/desktop/components/sidebar.css";
import { sections } from "./SidebarNav";

const Sidebar = ({onSelect}) => {
    return (
        <aside className="sidebar">
            {sections.map((section, index) => (
                <SidebarSection key={index} {...section} onSelect={onSelect} />
            ))}
        </aside>
    );
};

export default Sidebar;
