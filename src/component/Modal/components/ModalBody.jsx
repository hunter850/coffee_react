// import React, { Fragment } from "react";
import ElementWrap from "../ElementWrap";
import "../modal.css";

function ModalBody(props) {
    const {
        bordPadding = "0px 36px",
        children,
        component = "div",
        className,
        style,
        ...others
    } = props;
    return (
        <ElementWrap
            component={component === null ? "div" : component}
            {...others}
            className={`modal_text ${className}`}
            style={{
                width: "100%",
                maxHeight: "calc(90vh - 132px)",
                overflow: "auto",
                padding: `${bordPadding}`,
                ...style,
            }}
        >
            {children}
        </ElementWrap>
    );
}

export default ModalBody;
