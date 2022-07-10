import { Fragment } from "react";
import Chip from "./Chip";
import CardType from "./CardType";

function CardUpperImage({ cardNumber }) {
    const cardUpperContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        width: "340.48px",
    };

    return (
        <Fragment>
            <div style={cardUpperContainerStyle}>
                <Chip />
                <CardType cardNumber={cardNumber} />
            </div>
        </Fragment>
    );
}

export default CardUpperImage;
