import { Fragment, useMemo } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import styles from "../css/cardNumberInput.module.scss";
import "../../../routes/cart/css/transition_group_animation.module.scss";
import jcb from "../../../images/cart/JCB_logo.png";
import amex from "../../../images/cart/amex.png";
import visa from "../../../images/cart/visa.png";
import mastercard from "../../../images/cart/mastercard.png";

function CardType(props) {
    const { cardNumber } = props;
    const { card_img_wrap, card_type } = styles;

    const imageSrc = useMemo(() => {
        switch (cardNumber[0]) {
            case "3":
                if (cardNumber[1] === "5") {
                    return jcb;
                } else if (cardNumber[1] === "4" || cardNumber[1] === "7") {
                    return amex;
                } else {
                    return visa;
                }
            case "4":
                return visa;
            case "5":
                return mastercard;
            case undefined:
                return visa;
            default:
                return visa;
        }
    }, [cardNumber]);

    return (
        <Fragment>
            <div className={card_img_wrap}>
                <SwitchTransition>
                    <CSSTransition
                        key={imageSrc}
                        timeout={250}
                        classNames="fade"
                    >
                        <img
                            className={card_type}
                            src={imageSrc}
                            alt="VISA card"
                        />
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </Fragment>
    );
}

export default CardType;
