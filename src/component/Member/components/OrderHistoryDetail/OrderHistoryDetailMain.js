import { Fragment, useState, useEffect, useContext } from "react";
import "./OrderHistoryDetailMain.css";
import MemberMenu from "../MemberMenu/MemberMenu";
import OrderHistoryDetailList from "../OrderHistoryDetail/OrderHistoryDetailList";
import OrderHistoryDetailPrice from "../OrderHistoryDetail/OrderHistoryDetailPrice";
import { useParams, Link } from "react-router-dom";

import { getOrderHistoryDetail } from "../../../../config/api-path";

import axios from "axios";
import AuthContext from "../../AuthContext";

function OrderHistoryDetailMain() {
    const { token } = useContext(AuthContext);
    const [myOrder, setMyOrder] = useState([]);

    // console.log(typeof order_sid) ，網址的sid為字串要用Number做型別轉換
    const { order_sid } = useParams();

    useEffect(() => {
        axios
            .get(getOrderHistoryDetail, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                const getOrderSid = response.data.filter((v) => {
                    console.log(v.order_sid);
                    return Number(v.order_sid) === Number(order_sid);
                });
                console.log(getOrderSid);
                setMyOrder(getOrderSid);
            });
    }, [token, order_sid]);

    return (
        <>
            <div className="odd-wrap-main">
                <div className="odd-container">
                    <div className="odd-wrap-right">
                        <MemberMenu />
                    </div>
                    <div className="odd-wrap-left">
                        <div className="odd-title">訂單詳細</div>
                        <div className="odd-detail-wrap">
                            <div className="odd-date">
                                下訂日期<span>2022年06月24日</span>
                            </div>
                            <div className="odd-line"></div>
                            <div className="odd-state">
                                訂單狀態<span>取貨完成</span>
                            </div>
                            <div className="odd-line"></div>
                            <div className="odd-list-wrap">
                                {myOrder.map((v, i) => {
                                    return (
                                        <Fragment key={v.cart_sid}>
                                            <OrderHistoryDetailList />
                                        </Fragment>
                                    );
                                })}
                                <OrderHistoryDetailPrice />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryDetailMain;
