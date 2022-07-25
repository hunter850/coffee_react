import { Fragment } from "react";
import styles from "../css/cardNumberInput.module.scss";

function Chip() {
    const { chip } = styles;
    return (
        <Fragment>
            <div className={chip}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Fragment>
    );
}

export default Chip;
