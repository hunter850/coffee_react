import React, { useRef } from "react";
import useIsInRestore from "../../../../hooks/useIsInRestore";
import useIsInOut from "../../../../hooks/useIsInOut";

function ListenScroll(props) {
    const { children, start, end, backAgain, offset, backOffset } = props;
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
    return React.Children.map(children, (Child) => {
        // console.log(<Child />);
        if (typeof Child.type === "function") {
            console.log(Child);
            console.log(React.Children.map(Child, (child) => ({ child })));
        } else if (Child.type.description === "react.fragment") {
            return React.cloneElement(Child.props.children, {
                className: `${Child.props.className} ${
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
        } else {
            return React.cloneElement(Child, {
                className: `${Child.props.className} ${
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
