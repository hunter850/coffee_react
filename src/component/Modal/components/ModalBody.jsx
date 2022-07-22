import { useMemo } from "react";
import ElementWrap from "../ElementWrap";
import styles from "../modal.module.scss";

function ModalBody(props) {
    const { children, component = "div", className, style, ...others } = props;
    const { modal_text } = styles;
    const modalText = useMemo(() => {
        if (className) return modal_text + " " + className;
        return modal_text;
    }, [modal_text, className]);
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
            className={modalText}
            style={{
                width: "100%",
                maxHeight: "calc(90vh - 132px)",
                overflow: "auto",
                padding: "0px 36px",
                ...style,
            }}
        >
            {children}
        </ElementWrap>
    );
}

export default ModalBody;
