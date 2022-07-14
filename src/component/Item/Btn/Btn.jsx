import React, { useMemo, Fragment } from "react";
import "./Btn.css";

const defaultButtonStyle = {
    backgroundColor: "#253945",
    color: "#fff",
};

export default function Btn({
    style = defaultButtonStyle,
    children,
    type = "button",
    width = "120px",
    backgroundColor = "#253945",
    color = "#fff",
    className = "",
    ...allEvent
}) {
    const buttonStyle = useMemo(() => {
        return { ...style, width, backgroundColor, color };
    }, [width, backgroundColor, color, style]);

    return (
        <Fragment>
            <button
                type={type}
                className={`coffeeBtn ${className}`}
                style={buttonStyle}
                {...allEvent}
            >
                {children}
            </button>
        </Fragment>
    );
}
