import { Fragment, useState, useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useIndexArray from "../../../hooks/useIndexArray";
import styles from "../css/cardNumberInput.module.scss";
import "../../../routes/cart/css/transition_group_animation.module.scss";

function CardNumberInput(props) {
    const { cardNumber } = props;
    const { card_number } = styles;
    //算出是不是Americna Express
    const isShort = useMemo(() => {
        return (
            cardNumber[0] === "3" &&
            (cardNumber[1] === "4" || cardNumber[1] === "7")
        );
    }, [cardNumber]);
    const fakeArray = useIndexArray(16);
    //生出maxLength長度的[{index: index, content: "#"}]
    const cardMask = useMemo(() => {
        const tempArray = JSON.parse(JSON.stringify(fakeArray));
        for (let i = 0; i < tempArray.length; i++) {
            tempArray[i].content = "#";
        }
        return tempArray;
    }, [fakeArray]);
    const [tempArray, setTempArray] = useState([]);

    // 紀錄cardNumber離場動畫的數字
    useEffect(() => {
        setTempArray((pre) => {
            pre.splice(0, cardNumber.length, ...cardNumber.split(""));
            return [...pre];
        });
    }, [cardNumber]);

    return (
        <Fragment>
            <div className={card_number}>
                <TransitionGroup>
                    {cardMask.map((item) => (
                        <Fragment key={item.index}>
                            <CSSTransition
                                in={item.index < cardNumber.length}
                                timeout={500}
                                classNames={"slide"}
                            >
                                <span>
                                    {cardNumber.split("")[item.index] ===
                                    undefined
                                        ? tempArray[item.index]
                                        : cardNumber.split("")[item.index]}
                                </span>
                            </CSSTransition>
                        </Fragment>
                    ))}
                </TransitionGroup>
                <TransitionGroup>
                    {cardMask.map((item) => (
                        <Fragment key={item.index}>
                            <CSSTransition
                                in={
                                    item.index >= cardNumber.length &&
                                    (item.index !== 15 || !isShort)
                                }
                                timeout={500}
                                classNames="slide"
                            >
                                <span>{item.content}</span>
                            </CSSTransition>
                        </Fragment>
                    ))}
                </TransitionGroup>
            </div>
        </Fragment>
    );
}

export default CardNumberInput;
