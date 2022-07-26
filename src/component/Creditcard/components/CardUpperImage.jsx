import { Fragment } from "react";
import Chip from "./Chip";
import CardType from "./CardType";
import styles from "../css/cardNumberInput.module.scss";

function CardUpperImage(props) {
    const { cardNumber } = props;
    const { cart_upper_containter } = styles;

    return (
        <Fragment>
            <div className={cart_upper_containter}>
                <Chip />
                <CardType cardNumber={cardNumber} />
            </div>
        </Fragment>
    );
}

export default CardUpperImage;
