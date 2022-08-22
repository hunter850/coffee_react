/* eslint-disable prettier/prettier */
import { Fragment, useState, useEffect, useContext } from "react";
import "./OrderHistoryDetailMain.css";
import MemberMenu from "../MemberMenu/MemberMenu";
import OrderHistoryDetailList from "../OrderHistoryDetail/OrderHistoryDetailList";
import OrderHistoryDetailPrice from "../OrderHistoryDetail/OrderHistoryDetailPrice";
import { useParams, Link } from "react-router-dom";
import {v4} from "uuid";
import ChatBot from "../../../Bot/ChatBot";
import Footer from "../../../Footer";
import moment from "moment";

import { getOrderHistoryDetail } from "../../../../config/api-path";

import axios from "axios";
import AuthContext from "../../AuthContext";

function OrderHistoryDetailMain() {
    const { token } = useContext(AuthContext);
    const [myOrder, setMyOrder] = useState([]);
    const [dataIsLoad,setDataIsLoad] = useState(false);
    const [isProduct,setIsProduct] = useState(0); // 不是product就是food

    // console.log(typeof order_sid) ，路由的sid為字串要用Number做型別轉換
    const { order_sid } = useParams();

    useEffect(() => {
        axios
            .get(getOrderHistoryDetail, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log(response.data);
                // 回來資料的 order_sid = 路由的 order_sid
                const getOrderSid = response.data.filter((v) => {
                    return Number(v.order_sid) === Number(order_sid);
                });
                setMyOrder(getOrderSid);
                setDataIsLoad(true);

            });
    }, [token, order_sid]);

    const orderList = Object.values(myOrder).map((v, i) => v.order_list);
    // console.log(orderList[0]);


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
                                下訂日期<span>{ dataIsLoad ? moment(myOrder[0].order_time).format("YYYY-MM-DD") : ""}</span>
                            </div>
                            <div className="odd-line"></div>
                            <div className="odd-state">
                                訂單狀態<span>{ dataIsLoad ? myOrder[0].order_status : ""}</span>
                            </div>
                            <div className="odd-line"></div>
                            <div className="odd-list-wrap">
                                {myOrder.map((v, i) => {
                                    return (
                                        <Fragment key={v.cart_sid}>
                                            <OrderHistoryDetailList list={{
                                                cartPrice: v.cartPrice,
                                                quantity: v.quantity,
                                                cart_sid: v.cart_sid,
                                                order_discount: v.order_discount,
                                                order_id: v.order_id,
                                                order_member_id: v.order_member_id,
                                                order_price: v.order_price,
                                                order_sid: v.order_sid,
                                                order_status: v.order_status,
                                                order_time: v.order_time,
                                                name: v.name,
                                                pic: v.pic,
                                                price: v.price,
                                                products_with_products_categories_sid: v.products_with_products_categories_sid,
                                            }}
                                            orderList={orderList}
                                            />
                                        </Fragment>
                                    );
                                })}
                                <OrderHistoryDetailPrice price={{
                                                order_discount: dataIsLoad ? myOrder[0].order_discount :"",
                                                order_price: dataIsLoad ?  myOrder[0].order_price:"",
                                            }}
                                            dataIsLoad={dataIsLoad}
                                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatBot/>
            <Footer/>
        </>
    );
}

export default OrderHistoryDetailMain;
