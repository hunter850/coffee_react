import React, { Fragment } from "react";
import "./HotfoodCard.css";

// import hotfooddata from "../../../routes/frontPage/data/hotfooddata";

export default function HotfoodCard({ hotfoodmargin, hotfooddata }) {
    // console.log(hotfooddata);
    // const { hotfood_img, hootfood_name, hootfood_price } = hotfooddata;
    // console.log(hotfooddata.hotfood_sid);
    // useEffect(() => {
    //     console.log("jiod", hotfooddata);
    // }, [hotfooddata]);
    return (
        <Fragment>
            <div
                className="hotfood-container m-auto"
                style={{ marginTop: hotfoodmargin }}
            >
                <div className="hotfood-circle">
                    <img src={hotfooddata.hotfood_img} alt="123" />
                </div>
                <p className="hotfood-name" style={{ color: "black" }}>
                    {hotfooddata.hootfood_name}
                </p>
                <p style={{ color: "black" }}>
                    NT$ {hotfooddata.hootfood_price}
                </p>
            </div>
        </Fragment>
    );
}
