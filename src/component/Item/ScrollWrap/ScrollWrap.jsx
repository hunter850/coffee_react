import React from "react";
import ElementWrap from "./ElementWrap";
import ListenScroll from "./components/ListenScroll";

const ScrollWrap = (props) => {
    const {
        children,
        component = null,
        from = "",
        to = "",
        backAgain = false,
        offset = 0,
        backOffset = 0,
        ...others
    } = props;
    return (
        <ElementWrap component={component} {...others}>
            {React.Children.map(children, (child) => (
                <ListenScroll
                    from={from}
                    to={to}
                    backAgain={backAgain}
                    offset={offset}
                    backOffset={backOffset}
                >
                    {child}
                </ListenScroll>
            ))}
        </ElementWrap>
    );
};

export default ScrollWrap;
