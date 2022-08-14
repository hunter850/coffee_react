import React from "react";
import ElementWrap from "./ElementWrap";
import ListenScroll from "./components/ListenScroll";

const ScrollWrap = (props) => {
    const {
        children,
        component = null,
        start = "",
        end = "",
        backAgain = false,
        offset = 0,
        backOffset = 0,
        mode = "DOMPosition",
        ...others
    } = props;
    return (
        <ElementWrap component={component} {...others}>
            {React.Children.map(children, (child) => (
                <ListenScroll
                    start={start}
                    end={end}
                    backAgain={backAgain}
                    offset={offset}
                    backOffset={backOffset}
                    mode={mode}
                >
                    {child}
                </ListenScroll>
            ))}
        </ElementWrap>
    );
};

export default ScrollWrap;
