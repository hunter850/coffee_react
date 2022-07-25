import { Fragment, useMemo } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import styles from "../css/cardNumberInput.module.scss";

function CardType(props) {
    const { cardNumber } = props;
    const { card_img_wrap, card_type } = styles;

    const imageSrc = useMemo(() => {
        switch (cardNumber[0]) {
            case "3":
                if (cardNumber[1] === "5") {
                    return "https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg";
                } else if (cardNumber[1] === "4" || cardNumber[1] === "7") {
                    return "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/amex.png";
                } else {
                    return "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png";
                }
            case "4":
                return "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png";
            case "5":
                return "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png";
            case undefined:
                return "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png";
            default:
                return "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png";
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
