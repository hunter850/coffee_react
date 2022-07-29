import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useIndexArray from "../../../hooks/useIndexArray";
import useClass from "../../../hooks/useClass";
import styles from "../css/cardNumberInput.module.scss";
import "../../../routes/cart/css/transition_group_animation.module.scss";

function CardHolder(props) {
    const { cardName } = props;
    const {
        card_name,
        card_name_split,
        hide_text,
        space_width,
        dots_for_hide,
    } = styles;
    const c = useClass();
    const cardMask = useIndexArray(100);
    const [tempArray, setTempArray] = useState([]);
    const [contentWidth, setContentWidth] = useState(0);
    const [textHide, setTextHide] = useState(false);
    const nameRef = useRef(null);
    const nameSplit = useMemo(() => cardName.split(""), [cardName]);
    const nameLength = useMemo(() => cardName.split("").length, [cardName]);
    const transitionGroupStyle = useMemo(() => {
        if (textHide) return c(card_name_split, hide_text);
        return card_name_split;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textHide]);

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
            <div className={card_name} ref={nameRef}>
                <TransitionGroup
                    className={transitionGroupStyle}
                    style={{ maxWidth: `${contentWidth}px` }}
                >
                    {cardMask.map((item) => (
                        <Fragment key={item.index}>
                            <CSSTransition
                                in={item.index < nameLength}
                                timeout={500}
                                classNames={"right"}
                                unmountOnExit
                            >
                                <span
                                    className={
                                        nameSplit[item.index] === " "
                                            ? space_width
                                            : ""
                                    }
                                >
                                    {nameSplit[item.index] === undefined
                                        ? tempArray[item.index]
                                        : nameSplit[item.index].toUpperCase()}
                                </span>
                            </CSSTransition>
                        </Fragment>
                    ))}
                </TransitionGroup>
                {textHide && <span className={dots_for_hide}>...</span>}
            </div>
        </Fragment>
    );
}

export default CardHolder;
