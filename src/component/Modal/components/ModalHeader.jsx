import ElementWrap from "../ElementWrap";

function ModalHeader(props) {
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
                overflow: "hidden",
                textAlign: "center",
                minHeight: "24px",
                flexShrink: "0",
                ...style,
            }}
        >
            {children}
        </ElementWrap>
    );
}

export default ModalHeader;
