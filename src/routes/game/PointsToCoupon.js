import { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../component/NavBar/NavBar";
import "./css/PointsToCoupon.css";
//import PointsToCouponItem from "../game/Components/PointsToCouponItem";

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
                    <div>目前積分: {points - count * 300}</div>
                    <div>
                        兌換優惠券張數:
                        {/* <button
                            onClick={() => {
                                if (count - 1 < 0) {
                                    return;
                                }
                                setCount(count - 1);
                            }}
                            className="PointsToCouponbtn"
                        >
                            -
                        </button>
                        <span>{count < 0 ? 0 : count}</span>
                        <button
                            onClick={() => {
                                if (count + 1 > points / 300) {
                                    return;
                                }
                                setCount(count + 1);
                            }}
                            className="PointsToCouponbtn"
                        >
                            +
                        </button> */}
                        <span>{count}</span>
                    </div>
                    <div>
                        剩餘積分:
                        {points - count * 300 < 0
                            ? "積分不足"
                            : points - count * 300}
                    </div>
                    <div className="filledLinkBox">
                        <div
                            className="filledLink"
                            onClick={handlePointsToCoupon}
                        >
                            兌換
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PointsToCoupon;
