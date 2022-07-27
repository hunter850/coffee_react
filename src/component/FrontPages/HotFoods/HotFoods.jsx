import React, { Fragment } from "react";
import HotfoodCard from "./HotfoodCard";
// import styles from "../HotFoods/HotFoods.module.scss";
import { Link } from "react-router-dom";
import ViewmoreBtn from "../ViewmoreBtn";
import "./HotFoods.css";

function HotFoods() {
    return (
        <Fragment>
            <div className="bottom-line m-auto">
                <h2 className="home-title">熱銷餐點</h2>
            </div>
            <div className="d-flex m-auto">
                <HotfoodCard />
                <HotfoodCard hotfoodmargin={200} />
                <HotfoodCard />
                <HotfoodCard hotfoodmargin={200} />
            </div>
            <Link to="/food">
                <ViewmoreBtn />
            </Link>
        </Fragment>
    );
}

export default HotFoods;
