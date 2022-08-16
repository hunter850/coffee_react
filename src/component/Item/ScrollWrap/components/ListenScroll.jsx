import React, { useRef } from "react";
import useShouldEnter from "../../../../hooks/useShouldEnter";
import useShouldEnterBothSides from "../../../../hooks/useShouldEnterBothSides";

function ListenScroll(props) {
    const { children, start, end, backAgain, offset, backOffset, mode } = props;
    const childRef = useRef(null);
    const shouldEnter = useShouldEnter(childRef, offset, mode);
    const shouldEnterBothSides = useShouldEnterBothSides(
        childRef,
        offset,
        backOffset,
        mode
    );
    const isIn = backAgain ? shouldEnterBothSides : shouldEnter;

    // 子層的start end 優先級高於 ScrollWrap的start end
    // ref因為要給childRef用所以被覆蓋了 需要用function讓childRef和props的ref都接到node
    return React.Children.map(children, (Child) => {
        // functional component
        if (typeof Child.type === "function") {
            return React.Children.map(children.type(), (child) => {
                const childClass =
                    child.props && child.props.className
                        ? child.props.className + " "
                        : "";
                return React.cloneElement(child, {
                    className: (() => {
                        // 子層的start end 優先級較高
                        if (isIn) {
                            return child.props.end
                                ? childClass + child.props.end
                                : childClass + end;
                        } else {
                            return child.props.start
                                ? childClass + child.props.start
                                : childClass + start;
                        }
                    })(),
                    ref: (node) => {
                        childRef.current = node;
                        if (child.ref) {
                            child.ref.current = node;
                        }
                    },
                    start: null,
                    end: null,
                });
            });
            // fragment
        } else if (Child.type.description === "react.fragment") {
            const childClass =
                Child.props.children.props &&
                Child.props.children.props.className
                    ? Child.props.children.props.className + " "
                    : "";
            return React.cloneElement(Child.props.children, {
                className: (() => {
                    if (isIn) {
                        return Child.props.children.props.end
                            ? childClass + Child.props.children.props.end
                            : childClass + end;
                    } else {
                        return Child.props.children.props?.start
                            ? childClass + Child.props.children.props?.start
                            : childClass + start;
                    }
                })(),
                ref: (node) => {
                    childRef.current = node;
                    if (Child.ref) {
                        Child.ref.current = node;
                    }
                },
                start: null,
                end: null,
            });
            // 其他(普通jsx)
        } else {
            return React.cloneElement(Child, {
                className: `${
                    Child.props.className ? Child.props.className + " " : ""
                }${
                    isIn
                        ? Child.props.end
                            ? Child.props.end
                            : end
                        : Child.props.start
                        ? Child.props.start
                        : start
                }`,
                ref: (node) => {
                    childRef.current = node;
                    if (Child.ref) {
                        Child.ref.current = node;
                    }
                },
                start: null,
                end: null,
            });
        }
    });
}

export default ListenScroll;
