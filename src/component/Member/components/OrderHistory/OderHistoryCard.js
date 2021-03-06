import { useState } from "react";
import { Link } from "react-router-dom";
import "./OrderHistoryMain.css";

function OderHistoryCard({cards}) {
    const { order_sid, order_time, order_member_id, order_price, order_id } = cards;

    console.log(order_sid);
    return (
        <>
            <Link to="/member/orderhistory/detail">
                <div className="odh-info">
                    <div className="odh-header">
                        <div className="odh-date-wrap">
                            <div className="odh-date-title">下訂日期</div>
                            <div className="odh-date">2022年06月24日</div>
                        </div>
                        <span className="odh-id">訂單編號</span>
                        <span>{order_id}</span>
                    </div>
                    <div className="odh-info-wrap">
                        <div className="odh-content">
                            <div className="odh-price">
                                <span>訂單金額</span>
                                <span>{order_price}元</span>
                            </div>
                            <div className="odh-state">
                                <span>訂單狀態</span>
                                <span>取貨完成</span>
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
