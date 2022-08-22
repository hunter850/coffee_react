import { useState, useMemo, useCallback, useReducer } from "react";
import useClass from "../../hooks/useClass";
import CardUpperImage from "./components/CardUpperImage";
import CardNumberInput from "./components/CardNumberInput";
import CardHolder from "./components/CardHolder";
import CardValidDate from "./components/CardValidDate";
import CardBlackBar from "./components/CardBlackBar";
import CardWhiteBar from "./components/CardWhiteBar";
import CardType from "./components/CardType";
import CardForm from "./components/CardForm";
import styles from "./css/cardNumberInput.module.scss";

function Creditcard(props) {
    const {
        cardNumber,
        setCardNumber,
        cardName,
        setCardName,
        cardMonth,
        setCardMonth,
        cardYear,
        setCardYear,
        cardCvv,
        setCardCvv,
        cardSubmitHandler,
        confirmButton = true,
        className = "",
    } = props;
    const {
        creditcard_wrap,
        transform_wrap,
        creditcard_containter,
        creditcard_containter_back,
        card_bottom,
        cvv_wrap,
        creditcard_flip,
        creditcard_flip_active,
        frame_blur,
        fram_number_focus,
        fram_name_focus,
        fram_valid_focus,
    } = styles;
    const c = useClass();
    const reducer = useCallback((state, action) => {
        switch (action.type) {
            case "blur":
                return frame_blur;
            case "number":
                return fram_number_focus;
            case "name":
                return fram_name_focus;
            case "valid":
                return fram_valid_focus;
            default:
                return frame_blur;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [frameStyle, frameStyleDispatch] = useReducer(reducer, frame_blur);
    const [flipIsActive, setFlipIsActive] = useState(false);

    // 翻卡效果class
    const focusHandler = useCallback(() => {
        setFlipIsActive(true);
    }, []);
    const blurHandler = useCallback(() => {
        setFlipIsActive(false);
    }, []);
    const flipClass = useMemo(() => {
        if (flipIsActive) return creditcard_flip_active;
        return creditcard_flip;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flipIsActive]);

    // 白框reducer改className
    const cardFrameBlur = useCallback(() => {
        frameStyleDispatch({ type: "blur" });
    }, []);
    const cardNumberFocus = useCallback(() => {
        frameStyleDispatch({ type: "number" });
    }, []);
    const cardNameFocus = useCallback(() => {
        frameStyleDispatch({ type: "name" });
    }, []);
    const cardValidFocus = useCallback(() => {
        frameStyleDispatch({ type: "valid" });
    }, []);

    return (
        <div className={c(creditcard_wrap, "animate__animated", className)}>
            <div className={transform_wrap}>
                <div className={flipClass}>
                    <div className={frameStyle}></div>
                    <div className={creditcard_containter}>
                        <CardUpperImage cardNumber={cardNumber} />
                        <CardNumberInput cardNumber={cardNumber} />
                        <div className={card_bottom}>
                            <CardHolder cardName={cardName} />
                            <CardValidDate
                                cardMonth={cardMonth}
                                cardYear={cardYear}
                            />
                        </div>
                    </div>
                    <div className={creditcard_containter_back}>
                        <CardBlackBar />
                        <div className={cvv_wrap}>
                            <p>CVV</p>
                            <CardWhiteBar cardCvv={cardCvv} />
                            <CardType cardNumber={cardNumber} />
                        </div>
                    </div>
                </div>
                <div className="form_containter">
                    <CardForm
                        cardNumber={cardNumber}
                        setCardNumber={setCardNumber}
                        cardName={cardName}
                        setCardName={setCardName}
                        cardMonth={cardMonth}
                        setCardMonth={setCardMonth}
                        cardYear={cardYear}
                        setCardYear={setCardYear}
                        cardCvv={cardCvv}
                        setCardCvv={setCardCvv}
                        cardSubmitHandler={cardSubmitHandler}
                        focusHandler={focusHandler}
                        blurHandler={blurHandler}
                        cardFrameBlur={cardFrameBlur}
                        cardNumberFocus={cardNumberFocus}
                        cardNameFocus={cardNameFocus}
                        cardValidFocus={cardValidFocus}
                        confirmButton={confirmButton}
                    />
                </div>
            </div>
        </div>
    );
}

export default Creditcard;
