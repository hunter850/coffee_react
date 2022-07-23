import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useIndexArray from "../../../hooks/useIndexArray";
import "../css/cardNumberInput.module.scss";

function CardHolder({ cardName }) {
    const cardMask = useIndexArray(100);
    const [tempArray, setTempArray] = useState([]);
    const [contentWidth, setContentWidth] = useState(0);
    const [textHide, setTextHide] = useState(false);
    const nameRef = useRef(null);
    const nameSplit = useMemo(() => cardName.split(""), [cardName]);
    const nameLength = useMemo(() => cardName.split("").length, [cardName]);

    useEffect(() => {
        //紀錄transition leave時候的content
        setTempArray((pre) => {
            const output = [...pre];
            let tempName = cardName.toUpperCase();
            output.splice(0, tempName.split("").length, ...tempName.split(""));
            return output;
        });
    }, [cardName]);

    useEffect(() => {
        //name總長超過220就overflow hidden並且顯示...
        const contents = nameRef.current.childNodes[0].childNodes;
        let widthTotal = 0;
        for (let i = 0; i < cardName.length; i++) {
            widthTotal += parseFloat(getComputedStyle(contents[i]).width) || 0;
        }
        if (widthTotal < 220) {
            setContentWidth(widthTotal);
            setTextHide(false);
        } else {
            setTextHide(true);
        }
    }, [cardName]);

    return (
        <Fragment>
            <div
                className="card_name"
                style={{ height: "32px", display: "flex" }}
                ref={nameRef}
            >
                <TransitionGroup
                    className={`card_name_split ${textHide ? "hide_text" : ""}`}
                    style={{ maxWidth: `${contentWidth}px` }}
                >
                    {cardMask.map((item) => (
                        <Fragment key={item.index}>
                            <CSSTransition
                                in={item.index < nameLength}
                                timeout={500}
                                classNames="text_span right"
                                unmountOnExit
                            >
                                <span
                                    className={`text_span ${
                                        nameSplit[item.index] === " "
                                            ? "space_width"
                                            : ""
                                    }`}
                                >
                                    {nameSplit[item.index] === undefined
                                        ? tempArray[item.index]
                                        : nameSplit[item.index].toUpperCase()}
                                </span>
                            </CSSTransition>
                        </Fragment>
                    ))}
                </TransitionGroup>
                {textHide ? <span style={{ marginLeft: "3px" }}>...</span> : ""}
            </div>
        </Fragment>
    );
}

export default CardHolder;
