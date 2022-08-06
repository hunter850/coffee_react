import React, { Fragment } from "react";

function ElementWrap(props) {
    const { children, component = null, ...others } = props;
    if (component === null) {
        return React.createElement(Fragment, {}, children);
    } else if (
        component === "input" ||
        component === "img" ||
        component === "hr" ||
        component === "br"
    ) {
        return React.createElement(component, { ...others });
    } else {
        return React.createElement(component, { ...others }, children);
    }
}

export default ElementWrap;
