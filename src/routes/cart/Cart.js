import { Fragment, useState, useCallback } from "react";
import NavBar from "../../component/NavBar";
import Creditcard from "../../component/Creditcard/Creditcard";

function Cart() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardMonth, setCardMonth] = useState("");
    const [cardYear, setCardYear] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const cardSubmitHandler = useCallback((event) => {
        console.log(event);
        event.preventDefault();
    }, []);

    return (
        <Fragment>
            <NavBar />
            <h2>購物車</h2>
            <Creditcard
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
            />
        </Fragment>
    );
}

export default Cart;
