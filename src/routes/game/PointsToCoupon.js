import { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../component/NavBar/NavBar";
// import "./css/PointsToCoupon.css";
import "./css/PointsToCoupon.scss";

import {
    ScrollMotionContainer,
    ScrollMotionItem,
} from "../game/Components/ScrollMotion";
//import PointsToCouponItem from "../game/Components/PointsToCouponItem";
import ChatBot from "../../component/Bot/ChatBot";
function PointsToCoupon() {
    const { token } = useAuth();
    const [points, setPoints] = useState(null);
    const [vouchers, setVouchers] = useState(null);
    const [count, setCount] = useState(0);
    let theLeftPoints = points - (count + 1) * 300;
    let theAmount = count + vouchers + 1;
    const currentPoints = async () => {
        await axios
            .get("http://localhost:3500/PointsToCoupon/API", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setPoints(result.data.rows[0].total_points);
                setVouchers(result.data.rows2[0].voucher_amount);
            });
    };
    const handlePointsToCoupon = async () => {
        if (points - count * 300 < 300) {
            return;
        }

        // let theLeftPoints = points - count * 300;
        // let theAmount = count;
        setCount(count + 1);
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        axios
            .post(
                "http://localhost:3500/PointsToCoupon/Api-Points-To-Coupon-result",
                {
                    theLeftPoints: theLeftPoints,
                    theAmount: theAmount,
                },
                {
                    headers: headers,
                }
            )
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        currentPoints();
    }, []);
    return (
        <Fragment>
            <NavBar />
            <div className="PointsToCouponContainer">
                <div className="PointsToCouponContainerInner">
                    <ScrollMotionContainer element="div" className="textred">
                        <ScrollMotionItem element="p" type="up">
                            目前積分: {points - count * 300}
                        </ScrollMotionItem>
                    </ScrollMotionContainer>

                    <ScrollMotionContainer element="div">
                        <ScrollMotionItem
                            element="p"
                            type="up"
                            // className="textred"
                        >
                            兌換優惠券張數:{count}
                        </ScrollMotionItem>
                    </ScrollMotionContainer>

                    <ScrollMotionContainer element="div">
                        <ScrollMotionItem element="p" type="up">
                            剩餘積分:
                            {points - count * 300 < 0
                                ? "積分不足"
                                : points - count * 300}
                        </ScrollMotionItem>
                    </ScrollMotionContainer>
                    <div className="filledLinkBox">
                        <div
                            className={`${
                                points - count * 300 < 300
                                    ? "cRedAlert"
                                    : "filledLink"
                            } cardstyle`}
                            onClick={handlePointsToCoupon}
                        >
                            {points - count * 300 < 300 ? "已兌換完畢" : "兌換"}
                        </div>
                    </div>
                </div>
                <div>
                    <img
                        src={require("../../images/Coupon/img_tips_04.png")}
                        alt=""
                    />
                </div>
                <ChatBot />
            </div>
        </Fragment>
    );
}

export default PointsToCoupon;
