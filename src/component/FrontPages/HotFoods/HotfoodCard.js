import React, { Fragment } from "react";
import "./HotfoodCard.css";
import hotfooddata from "../../../routes/frontPage/data/hotfooddata";

export default function HotfoodCard({ hotfoodmargin }) {
    return (
        <Fragment>
            {hotfooddata.map((v, i) => {
                return (
                    <div
                        key={v.menu_sid}
                        className="hotfood-container m-auto"
                        style={{ marginTop: hotfoodmargin }}
                    >
                        <div className="hotfood-circle">
                            <img src={v.menu_photo} alt="123" />
                        </div>
                        <p className="hotfood-name" style={{ color: "black" }}>
                            {v.menu_name}
                        </p>
                        <p style={{ color: "black" }}>NT$ {v.menu_price_m}</p>
                    </div>
                );
            })}
        </Fragment>
    );
}
