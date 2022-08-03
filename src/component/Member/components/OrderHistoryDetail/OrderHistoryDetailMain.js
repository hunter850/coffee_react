import { Fragment } from "react";
import "./OrderHistoryDetailMain.css";
import MemberMenu from "../MemberMenu/MemberMenu";
import OrderHistoryDetailList from "../OrderHistoryDetail/OrderHistoryDetailList";

function OrderHistoryDetailMain() {
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
                            <div className="odd-date">下訂日期<span>2022年06月24日</span></div>
                            <div className="odd-line"></div>
                            <div className="odd-state">訂單狀態<span>取貨完成</span></div>
                            <div className="odd-line"></div>
                            <div className="odd-list-wrap">
                                <OrderHistoryDetailList />
                                {/* <div className="odd-list">
                                    <div className="odd-list-header">
                                        <span>
                                            <i className="fa-solid fa-pen"></i>評論
                                        </span>
                                        <div className="odd-str-line"></div>
                                        <span>價格</span>
                                        <div className="odd-str-line"></div>
                                        <span>數量</span>
                                        <div className="odd-str-line"></div>
                                        <span>小計</span>
                                    </div>
                                    <div className="odd-body">
                                        <div className="odd-product">
                                            <div className="odd-pic"></div>
                                            <span>曼巴咖啡(半磅)</span>
                                        </div>
                                        <div className="odd-str-line"></div>
                                        <div className="odd-price">280元</div>
                                        <div className="odd-str-line"></div>
                                        <div className="odd-quantity">3</div>
                                        <div className="odd-str-line"></div>
                                        <div className="odd-subtotal">840元</div>
                                    </div>
                                </div> */}
                                <div className="odd-total-wrap">
                                    <div className="odd-total">商品合計<span>1680</span></div>
                                    <div className="odd-total-line"></div>
                                    <div className="odd-discount">折價<span>0</span></div>
                                    <div className="odd-total-line"></div>
                                    <div className="odd-pay">付款金額<span>1680元</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderHistoryDetailMain;