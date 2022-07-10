import { Fragment, useMemo } from "react";

function CardWhiteBar({ cardCvv }) {
    const textContent = useMemo(() => {
        return cardCvv
            .split("")
            .map(() => "*")
            .join("");
    }, [cardCvv]);

    const whiteBarStyle = {
        width: "100%",
        height: "45px",
        backgroundColor: "#fff",
        textAlign: "right",
        color: "#333",
        borderRadius: "4px",
        fontSize: "18px",
        lineHeight: "45px",
        paddingRight: "10px",
        marginBottom: "20px",
    };

    return (
        <Fragment>
            <div style={whiteBarStyle}>{textContent}</div>
        </Fragment>
    );
}

export default CardWhiteBar;
