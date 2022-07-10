import { useState, useMemo } from "react";
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
    const creditCardWrapStyle = {
        width: "520px",
        height: "550.76px",
    };
    const cardFlipStyle = {
        width: "433px",
        height: "243.5625px",
        borderRadius: "10px",
        margin: "auto",
        position: "relative",
        transformStyle: "preserve-3d",
        transformOrigin: "center",
        transition: "all 1s ease-out",
    };
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
    const cardBottomStyle = {
        display: "flex",
        justifyContent: "space-between",
        width: "340.47px",
        height: "32px",
    };
    const cardBackStyle = useMemo(() => {
        return {
            transform: "rotateY(180deg)",
        };
    }, []);
    const cvvWrapStyle = {
        width: "100%",
        height: "100%",
        padding: "10px 0px",
    };
    const cvvText = {
        fontSize: "12px",
        textAlign: "end",
        marginBottom: "5px",
        paddingRight: "10px",
    };

    const [flipStyle, setFlipStyle] = useState(cardFlipStyle);
    const cardContainerBackStyle = useMemo(() => {
        return { ...cardContainterStyle, ...cardBackStyle };
    }, [cardContainterStyle, cardBackStyle]);

    const focusHandler = () => {
        setFlipStyle((pre) => ({ ...pre, transform: "rotateY(180deg)" }));
    };
    const blurHandler = () => {
        setFlipStyle((pre) => ({ ...pre, transform: "rotateY(0deg)" }));
    };

    return (
        <div style={creditCardWrapStyle}>
            <div style={flipStyle}>
                <div className="card_container" style={cardContainterStyle}>
                    <CardUpperImage cardNumber={cardNumber} />
                    <CardNumberInput cardNumber={cardNumber} />
                    <div className="card_bottom" style={cardBottomStyle}>
                        <CardHolder cardName={cardName} />
                        <CardValidDate
                            cardMonth={cardMonth}
                            cardYear={cardYear}
                        />
                    </div>
                </div>
                <div className="card_container" style={cardContainerBackStyle}>
                    <CardBlackBar />
                    <div style={cvvWrapStyle}>
                        <p style={cvvText}>CVV</p>
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
                />
            </div>
        </div>
    );
}

export default Creditcard;
