import ElementWrap from "./ElementWrap";

function SpinnerWrap(props) {
    const { children, spinner = "", component = null } = props;
    return (
        <ElementWrap component={component}>
            {props.in === true || props.in === undefined ? children : spinner}
        </ElementWrap>
    );
}

export default SpinnerWrap;
