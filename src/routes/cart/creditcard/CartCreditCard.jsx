import { Fragment, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../component/NavBar/NavBar";
import Creditcard from "../../../component/Creditcard/Creditcard";

function CartCreditCard() {
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
            <Link to="/cart">cart</Link>
        </Fragment>
    );
}

export default CartCreditCard;
