import React, { Fragment } from "react";
import "./ViewmoreBtn.css";

export default function ViewmoreBtn({ Vbpaddingtop, transform }) {
    return (
        <Fragment>
            <div
                className="view-more-link"
                style={{
                    paddingTop: Vbpaddingtop,
                    transform: `translateX(${transform}px)`,
                }}
            >
                <div className="view-more-text">View More</div>
                <div className="arrow-icon-right">
                    <img
                        src="https://img.icons8.com/pastel-glyph/64/000000/circled-right.png"
                        alt=""
                        width="48px"
                        height="48px"
                    />
                </div>
            </div>
        </Fragment>
    );
}
