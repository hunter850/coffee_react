import React from "react";

function Tag({ tagName }) {
    const styleObj = {
        marginRight: ".5rem",
        backgroundColor: "#C8D2DC",
        color: "#253945",
        borderRadius: "1rem",
        fontSize: "14px",
        padding: "2px 10px",
        marginBottom: "6px",
    };

    return <span style={styleObj}>{tagName}</span>;
}

export default Tag;
