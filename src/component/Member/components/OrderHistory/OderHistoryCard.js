import { useState } from "react";
import { Link } from "react-router-dom";
import "./OrderHistoryMain.css";

function OderHistoryCard({cards}) {
    const { order_sid, order_time, order_member_id, order_price, order_id, order_status } = cards;

    return (
        <>
            <Link to={`/member/orderhistory/detail/${order_sid}`}>
                <div className="odh-info">
                    <div className="odh-header">
                        <div className="odh-date-wrap">
                            <div className="odh-date-title">下訂日期</div>
                            <div className="odh-date">{order_time.split("-")[0]+"年"+order_time.split("-")[1]+"月"+order_time.split("-")[2].split("T")[0]+"日"}</div>
                        </div>
                        <div className="odh-id-wrap">
                            <span className="odh-id">訂單編號</span>
                            <span className="odh-id-s">{order_id}</span>
                        </div>
                    </div>
                    <div className="odh-info-wrap">
                        <div className="odh-content">
                            <div className="odh-price">
                                <span>訂單金額</span>
                                <span>{order_price}元</span>
                            </div>
                            <div className="odh-state">
                                <span>訂單狀態</span>
                                <span>{order_status}</span>
                            </div>
                        </div>
                        <button className="odh-btn">訂單詳細</button>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default OderHistoryCard;
