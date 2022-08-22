import React, { Fragment } from "react";
import HotfoodCard from "./HotfoodCard";
// import styles from "../HotFoods/HotFoods.module.scss";
import { Link } from "react-router-dom";
import ViewmoreBtn from "../ViewmoreBtn";
import hotfooddata from "../../../routes/frontPage/data/hotfooddata";
import "./HotFoods.css";
import useLog from "../../../hooks/useLog";

function HotFoods() {
    // useLog(hotfooddata);
    // console.log(hotfooddata);
    return (
        <Fragment>
            <div className="home-container">
                <div className="bottom-line m-auto">
                    <h2 className="home-title">熱銷餐點</h2>
                </div>
                <div className="d-flex hotfood-magin-auto">
                    {hotfooddata.map((v, i) => {
                        return (
                            <Link
                                key={v.hotfood_sid}
                                to="/food"
                                className="hotfoodcard-desktop"
                            >
                                <HotfoodCard
                                    hotfooddata={{
                                        hotfood_sid: v.hotfood_sid,
                                        hotfood_img: v.hotfood_photo,
                                        hootfood_name: v.hotfood_name,
                                        hootfood_price: v.hotfood_price_m,
                                    }}
                                />
                            </Link>
                        );
                    })}

                    <Link to="/food/" className="hotfoodcard-phone">
                        <HotfoodCard
                            hotfooddata={{
                                hotfood_sid: hotfooddata[0].hotfood_sid,
                                hotfood_img: hotfooddata[0].hotfood_photo,
                                hootfood_name: hotfooddata[0].hotfood_name,
                                hootfood_price: hotfooddata[0].hotfood_price_m,
                            }}
                        />
                    </Link>
                    {/* <Link to="/food/11" className="hotfoodcard-place">
                        <HotfoodCard />
                    </Link>
                    <Link to="/food" className="hotfoodcard-place" >
                        <HotfoodCard />
                    </Link>
                    <Link to="/food" className="hotfoodcard-place">
                        <HotfoodCard />
                    </Link> */}
                </div>
                <Link to="/food">
                    <ViewmoreBtn Vbpaddingtop={100} />
                </Link>
            </div>
        </Fragment>
    );
}

export default HotFoods;
