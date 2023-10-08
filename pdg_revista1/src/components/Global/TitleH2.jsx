import React from "react";

function TitleH2({ClName, Title}) {
    return (
        <div className={ClName}> {/* "title-sections" */}
            <h2>{Title}</h2>
        </div>
    );
}

export default TitleH2;
