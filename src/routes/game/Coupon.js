import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar";
import "./css/Coupon.css";
import axios from "axios";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";
// import image from "../../images/Coupon/41_Card_01.JPG";

function Coupon() {
    let location = useLocation();
    const [CouponList, setCouponList] = useState(null);

    const [searchParams] = useSearchParams();
    // console.log(searchParams.get("type"));
    let type = parseInt(searchParams.get("type"));
    if (isNaN(type)) {
        type = 1;
    }

    const Coupon_foruser = async () => {
        await axios
            .get("http://localhost:3500/Coupon_foruser/API")
            .then((result) => {
                //console.log(result);
                setCouponList(
                    <>
                        {result.data.rows2.map((v, i) => {
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
                                        {/* <div>
                                            <img
                                                className={`${
                                                    type === 2
                                                        ? "displaynone"
                                                        : ""
                                                } w250p`}
                                                src={`http://localhost:3500/images/Coupon/coupon_icon-removebg-preview.png`}
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                        <img
                                                className={`${
                                                    type === 1
                                                        ? "displaynone"
                                                        : ""
                                                } w250p`}
                                                src={`http://localhost:3500/images/Coupon/coupon_icon-removebg-preview_02.png`}
                                                alt=""
                                            />
                                        </div> */}
                                        <div className="w4"></div>
                                        <div className="coupon-style">
                                            <div>
                                                <div className="CouponName">{v.coupon_name}</div>
                                                <div className="coupon-inner-style">
                                                    <div className="px14">
                                                        {type === 1
                                                            ? moment(
                                                                  v.end_time
                                                              ).format(
                                                                  "YYYY-MM-DD HH:mm:ss"
                                                              )
                                                            : type === 2 &&
                                                              v.status == 0
                                                            ? moment(
                                                                  v.end_time
                                                              ).format(
                                                                  "YYYY-MM-DD HH:mm:ss"
                                                              )
                                                            : moment(
                                                                  v.used_time
                                                              ).format(
                                                                  "YYYY-MM-DD HH:mm:ss"
                                                              )}
                                                    </div>
                                                    <div className="type-sec">
                                                        {type === 1
                                                            ? "到期"
                                                            : type === 2 &&
                                                              v.status == 0
                                                            ? "已過期"
                                                            : "已使用"}
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
                        })}
                    </>
                );
            });
    };
    useEffect(() => {
        Coupon_foruser();
        console.log(location.search);
    }, [location]);
    return (
        <Fragment>
            <NavBar />
            <div className="CouponContainer">
                {/* <video autoplay muted loop id="myVideo">
                    <source src="../../copon_img/Grinding up coffee beans.mp4" type="video/mp4">
                </video> */}
                <div>查看我的優惠券</div>
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
                            已使用或過期
                        </Link>
                    </div>
                </div>
                <div className="w100">
                    <div className="display_justify_content coupon_style load inner-box">
                        {CouponList}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Coupon;
