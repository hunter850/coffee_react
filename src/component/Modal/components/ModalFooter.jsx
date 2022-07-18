import ElementWrap from "../ElementWrap";

function ModalFooter(props) {
    const { children, component = "div", className, style, ...others } = props;
    return (
        <ElementWrap
            component={component === null ? "div" : component}
            {...others}
            className={`modal_text ${className}`}
            style={{
                width: "100%",
                overflow: "hidden",
                minHeight: "24px",
                height: "fit-content",
                flexShrink: "0",
                ...style,
            }}
        >
            {children}
        </ElementWrap>
    );
}

export default ModalFooter;
