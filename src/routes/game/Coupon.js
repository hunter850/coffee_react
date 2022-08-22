import { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../component/Member/AuthContextProvider";
import NavBar from "../../component/NavBar/NavBar";
// import "./css/Coupon.css";
import "./css/Coupon.scss";

import axios from "axios";
import { Link, useLocation, useSearchParams,useNavigate } from "react-router-dom";
import moment from "moment";
import ChatBot from "../../component/Bot/ChatBot";
import Infinite from "react-infinite";

function Coupon() {
    const { token } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    const [CouponList, setCouponList] = useState(null);
    const [searchParams] = useSearchParams();
    let type = parseInt(searchParams.get("type"));
    if (isNaN(type)) {
        type = 1;
    }

    const Coupon_foruser = async () => {
        await axios
            .get("http://localhost:3500/Coupon_foruser/API", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                setCouponList(
                    <>
                        {result.data.rows_type1.map((v, i) => {
                            if (type === 1) {
                                return (
                                    <div
                                        className="display_justify_content main-sec"
                                        key={i}
                                    >
                                        <div
                                            className={`${
                                                type == 1 ? "card" : "card2"
                                            } cardstyle`}
                                        >
                                            <div className="w4"></div>
                                            <div className="coupon-style">
                                                <div>
                                                    <div className="CouponName">
                                                        {v.coupon_name}
                                                    </div>
                                                    <div className="coupon-inner-style">
                                                        <div className="px14">
                                                            {moment(
                                                                v.end_time
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm:ss"
                                                            )}
                                                        </div>
                                                        <div className="type-sec">
                                                            將到期
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hoverStyle">
                                            <div className="text-inner">
                                                BUY NOW
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        {result.data.rows_type2_expired.map((v, i) => {
                            if (type === 2) {
                                return (
                                    <div
                                        className="display_justify_content main-sec"
                                        key={i}
                                    >
                                        <div
                                            className={`${
                                                type === 1 ? "card" : "card2"
                                            } cardstyle`}
                                        >
                                            <div className="w4"></div>
                                            <div className="coupon-style">
                                                <div>
                                                    <div className="CouponName">
                                                        {v.coupon_name}
                                                    </div>
                                                    <div className="coupon-inner-style">
                                                        <div className="px14">
                                                            {moment(
                                                                v.end_time
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm:ss"
                                                            )}
                                                        </div>
                                                        <div className="type-sec">
                                                            已過期
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hoverStyle">
                                            <div className="text-inner">
                                                BUY NOW
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        {result.data.rows_type2_used.map((v, i) => {
                            if (type === 2 && v.status === 1) {
                                return (
                                    <div
                                        className="display_justify_content main-sec"
                                        key={i}
                                    >
                                        <div
                                            className={`${
                                                type === 1 ? "card" : "card2"
                                            } cardstyle`}
                                        >
                                            <div className="w4"></div>
                                            <div className="coupon-style">
                                                <div>
                                                    <div className="CouponName">
                                                        {v.coupon_name}
                                                    </div>
                                                    <div className="coupon-inner-style">
                                                        <div className="px14">
                                                            {moment(
                                                                v.used_time
                                                            ).format(
                                                                "YYYY-MM-DD HH:mm:ss"
                                                            )}
                                                        </div>
                                                        <div className="type-sec">
                                                            已使用
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hoverStyle">
                                            <div className="text-inner">
                                                BUY NOW
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </>
                );
            });
    };
    useEffect(() => {
        if (!token) { 
            alert("請先登入");
            navigate("/member/login");
            return;
        }
        Coupon_foruser();
        // console.log(location.search);
    }, [location]);
    return (
        <Fragment>
            <NavBar />
            <div className="CouponContainer">
                <div className="display_justify_content load m23">
                    <Link
                        to={{
                            pathname: "/coupon",
                            search: "type=1",
                        }}
                        className={`link1 Cbutton ${
                            type === 1 ? "active" : " "
                        }`}
                    >
                        可使用
                    </Link>
                    <div className=" display_justify_content wrapper"></div>
                    <div className="display_justify_content wrapper">
                        <Link
                            to={{
                                pathname: "/coupon",
                                search: "type=2",
                            }}
                            className={`link1 Cbutton ${
                                type === 2 ? "active" : " "
                            }`}
                        >
                            已逾期
                        </Link>
                    </div>
                </div>
                <div className="w100">
                    <div className="display_justify_content coupon_style load inner-box">
                        <Infinite containerHeight={925} elementHeight={10000} className="TheInfinite">
                            {CouponList}
                        </Infinite>
                    </div>
                </div>
            </div>
            <ChatBot />
        </Fragment>
    );
}

export default Coupon;
