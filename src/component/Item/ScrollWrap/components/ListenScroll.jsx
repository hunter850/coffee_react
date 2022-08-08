import React, { useRef } from "react";
import useIsInRestore from "../../../../hooks/useIsInRestore";
import useIsInOut from "../../../../hooks/useIsInOut";

function ListenScroll(props) {
    const { children, from, to, backAgain, offset, backOffset } = props;
    const childRef = useRef(children);
    const isInRestore = useIsInRestore(childRef, offset);
    const isInOut = useIsInOut(childRef, offset, backOffset);
    const isIn = backAgain ? isInOut : isInRestore;

    // 單層即可 但以防萬一用Children.map可以避免多children
    // return React.cloneElement(children, {
    //     className: `${children.props.className} hello`,
    //     ref: childRef,
    // });

    // 子層的from to 優先級高於 ScrollWrap的from to
    // ref因為要給childRef用所以被覆蓋了 需要用function讓childRef和props的ref都接到node
    return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            className: `${child.props.className} ${
                isIn
                    ? child.props.to
                        ? child.props.to
                        : to
                    : child.props.from
                    ? child.props.from
                    : from
            }`,
            ref: (node) => {
                childRef.current = node;
                if (child.ref) {
                    child.ref.current = node;
                }
            },
            from: null,
            to: null,
        });
    });
}

export default ListenScroll;
