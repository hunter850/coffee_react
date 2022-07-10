import { Fragment } from "react";

function Chip() {
    const chipStyle = {
        width: "50px",
        height: "40px",
        backgroundImage: "linear-gradient(to bottom left, #ffecc7, #d0b978)",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
    };
    const lineTopStyle = {
        position: "absolute",
        width: "100%",
        height: "1px",
        backgroundColor: "#333",
        top: "13px",
    };
    const lineMiddleStyle = {
        position: "absolute",
        width: "100%",
        height: "1px",
        backgroundColor: "#333",
        top: "20px",
    };
    const lineBottomStyle = {
        position: "absolute",
        width: "100%",
        height: "1px",
        backgroundColor: "#333",
        top: "28px",
    };
    const lineVerticalStyle = {
        position: "absolute",
        width: "1px",
        height: "50px",
        backgroundColor: "#333",
        left: "25px",
    };
    const chipMainStyle = {
        width: "20px",
        height: "25px",
        backgroundImage: "linear-gradient(to bottom left, #efdbab, #e1cb94)",
        border: "1px solid #333",
        borderRadius: "3px",
        zIndex: "1",
    };
    return (
        <Fragment>
            <div className="chip" style={chipStyle}>
                <div className="chip_line" style={lineTopStyle}></div>
                <div className="chip_line" style={lineMiddleStyle}></div>
                <div className="chip_line" style={lineBottomStyle}></div>
                <div className="chip_line" style={lineVerticalStyle}></div>
                <div className="chip_main" style={chipMainStyle}></div>
            </div>
        </Fragment>
    );
}

export default Chip;
