import React from "react";

function Tag({ className = "", children }) {
    const styleObj = {
        // marginRight: ".5rem",
        backgroundColor: "#C8D2DC",
        color: "#253945",
        borderRadius: "1rem",
        fontSize: "14px",
        padding: "2px 10px",
        marginBottom: "6px",
        whiteSpace: "nowrap",
    };

    return (
        <span style={styleObj} className={`animate__animated ${className}`}>
            {children}
        </span>
    );
}

export default Tag;
