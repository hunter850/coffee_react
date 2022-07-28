import { Fragment } from "react";
import styles from "../css/cardNumberInput.module.scss";

function CardBlackBar() {
    const { black_bar } = styles;

    return (
        <Fragment>
            <div className={black_bar}></div>
        </Fragment>
    );
}

export default CardBlackBar;
