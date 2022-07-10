import { useState, useMemo, useCallback } from "react";
import CardUpperImage from "./components/CardUpperImage";
import CardNumberInput from "./components/CardNumberInput";
import CardHolder from "./components/CardHolder";
import CardValidDate from "./components/CardValidDate";
import CardBlackBar from "./components/CardBlackBar";
import CardWhiteBar from "./components/CardWhiteBar";
import CardType from "./components/CardType";
import CardForm from "./components/CardForm";

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
    } = props;
    const styles = useMemo(() => {
        return {
            creditCardWrapStyle: {
                width: "520px",
                height: "550.76px",
            },
            cardFlipStyle: {
                width: "433px",
                height: "243.5625px",
                borderRadius: "10px",
                margin: "auto",
                position: "relative",
                transformStyle: "preserve-3d",
                transformOrigin: "center",
                transition: "all 1s ease-out",
            },
            cardBottomStyle: {
                display: "flex",
                justifyContent: "space-between",
                width: "340.47px",
                height: "32px",
            },
            cvvWrapStyle: {
                width: "100%",
                height: "100%",
                padding: "10px 0px",
            },
            cvvText: {
                fontSize: "12px",
                textAlign: "end",
                marginBottom: "5px",
                paddingRight: "10px",
            },
            cardFrame: {
                borderRadius: "5px",
                opacity: "0",
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                transition: "all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85)",
                overflow: "hidden",
                border: "2px solid rgba(255, 255, 255, 0.65)",
                zIndex: "3",
            },
        };
    }, []);
    const cardContainterStyle = useMemo(() => {
        return {
            width: "433px",
            height: "243.5625px",
            borderRadius: "10px",
            backgroundColor: "skyblue",
            position: "absolute",
            top: "0px",
            left: "0px",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "25px 15px",
            boxShadow: "4px 4px 16px 0px rgba(0,0,0,.25)",
            transformStyle: "preserve-3d",
            transformOrigin: "center",
            backfaceVisibility: "hidden",
        };
    }, []);

    const cardContainerBackStyle = useMemo(() => {
        return { ...cardContainterStyle, transform: "rotateY(180deg)" };
    }, [cardContainterStyle]);
    const [flipStyle, setFlipStyle] = useState(styles.cardFlipStyle);
    const [frameStyle, setFrameStyle] = useState(styles.cardFrame);

    const focusHandler = useCallback(() => {
        setFlipStyle((pre) => ({ ...pre, transform: "rotateY(180deg)" }));
    }, []);
    const blurHandler = useCallback(() => {
        setFlipStyle((pre) => ({ ...pre, transform: "rotateY(0deg)" }));
    }, []);
    const cardFrameBlur = useCallback(() => {
        setFrameStyle(styles.cardFrame);
    }, [setFrameStyle, styles.cardFrame]);
    const cardNumberFocus = useCallback(() => {
        setFrameStyle((pre) => ({
            ...pre,
            transform: "translateX(30px) translateY(100px)",
            width: "373px",
            height: "60px",
            opacity: "1",
        }));
    }, [setFrameStyle]);
    const cardNameFocus = useCallback(() => {
        setFrameStyle((pre) => ({
            ...pre,
            transform: "translateX(30px) translateY(163px)",
            width: "265px",
            height: "60px",
            opacity: "1",
        }));
    }, [setFrameStyle]);
    const cardValidFocus = useCallback(() => {
        setFrameStyle((pre) => ({
            ...pre,
            transform: "translateX(300px) translateY(163px)",
            width: "100px",
            height: "60px",
            opacity: "1",
        }));
    }, [setFrameStyle]);

    return (
        <div style={styles.creditCardWrapStyle}>
            <div style={flipStyle}>
                <div style={frameStyle}></div>
                <div className="card_container" style={cardContainterStyle}>
                    <CardUpperImage cardNumber={cardNumber} />
                    <CardNumberInput cardNumber={cardNumber} />
                    <div className="card_bottom" style={styles.cardBottomStyle}>
                        <CardHolder cardName={cardName} />
                        <CardValidDate
                            cardMonth={cardMonth}
                            cardYear={cardYear}
                        />
                    </div>
                </div>
                <div className="card_container" style={cardContainerBackStyle}>
                    <CardBlackBar />
                    <div style={styles.cvvWrapStyle}>
                        <p style={styles.cvvText}>CVV</p>
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
                />
            </div>
        </div>
    );
}

export default Creditcard;
