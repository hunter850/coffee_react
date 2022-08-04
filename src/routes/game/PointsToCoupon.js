import { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../component/NavBar/NavBar";
import "./css/PointsToCoupon.css";
import PointsToCouponItem from "../game/Components/PointsToCouponItem";


function PointsToCoupon() {
    return (
        <Fragment>
            <NavBar />
            <div className="PointsToCouponContainer">
                <div className="PointsToCouponContainerInner">
                    <div>目前積分:</div>
                    <PointsToCouponItem />
                    <div>剩餘積分: </div>
                    <div className="filledLinkBox">
                        <div className="filledLink">兌換</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PointsToCoupon;
