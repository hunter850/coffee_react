import { Fragment } from "react";

function CardBlackBar() {
    const balckBarStyle = {
        width: "433px",
        height: "45px",
        backgroundColor: "rgba(0, 0, 19, 0.8)",
        flexShrink: "0",
    };

    return (
        <Fragment>
            <div style={balckBarStyle}></div>
        </Fragment>
    );
}

export default CardBlackBar;
