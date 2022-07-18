import ElementWrap from "../ElementWrap";
import "../modal.css";

function ModalBody(props) {
    const { children, component = "div", className, style, ...others } = props;
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
            className={`modal_text ${className ?? ""}`}
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
