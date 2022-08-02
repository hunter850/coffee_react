import React, { Fragment } from "react";
import HotFoodImg from "../../../images/frontpage/food/Rectangle-133.png";
import "./HotfoodCard.css";

export default function HotfoodCard({ hotfoodmargin }) {
    return (
        <Fragment>
            <div
                className="hotfood-container m-auto"
                style={{ marginTop: hotfoodmargin }}
            >

                <div className="hotfood-circle">
                    <img src={HotFoodImg} alt="" />
                </div>
                <p className="hotfood-name" style={{ color: "black" }}>
                    凱薩沙拉
                </p>
                <p style={{ color: "black" }}>NT$ 499</p>

            </div>
        </Fragment>
    );
}
