import React, { Fragment } from "react";
// import HotFoodImg from "../../../images/frontpage/food/Rectangle 133.png";
import "./HotfoodCard.css";

export default function HotfoodCard({ hotfoodmargin }) {
    return (
        <Fragment>
            <div
                className="hotfood-container m-auto hotfood-circle"
                style={{ marginTop: hotfoodmargin }}
            >
                <div>
                    {/* <img src={HotFoodImg} alt="" width="230px" height="230px" /> */}
                </div>
                <p className="hotfood-name">凱薩沙拉</p>
                <p>NT$ 499</p>
            </div>
        </Fragment>
    );
}
