import { useMemo } from "react";
import ElementWrap from "../ElementWrap";
import styles from "../modal.module.scss";

function ModalFooter(props) {
    const { children, component = "div", className, style, ...others } = props;
    const { modal_footer } = styles;
    const footerClass = useMemo(() => {
        if (className) return modal_footer + " " + className;
        return modal_footer;
    }, [modal_footer, className]);
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
            className={footerClass}
            style={style}
        >
            {children}
        </ElementWrap>
    );
}

export default ModalFooter;
