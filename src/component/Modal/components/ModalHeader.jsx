import { useMemo } from "react";
import ElementWrap from "../ElementWrap";
import styles from "../modal.module.scss";

function ModalHeader(props) {
    const { children, component = "div", className, style, ...others } = props;
    const { modal_header } = styles;
    const headerClass = useMemo(() => {
        if (className) return modal_header + " " + className;
        return modal_header;
    }, [modal_header, className]);
    return (
        <ElementWrap
            component={
                component === null ||
                component === "input" ||
                component === "img" ||
                component === "hr" ||
                component === "br"
                    ? "div"
                    : component
            }
            {...others}
            className={headerClass}
            style={style}
        >
            {children}
        </ElementWrap>
    );
}

export default ModalHeader;
