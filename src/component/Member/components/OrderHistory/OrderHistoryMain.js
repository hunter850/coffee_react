import { useState, useEffect, useContext } from "react";
import MemberMenu from "../MemberMenu/MemberMenu";
import OderHistoryCard from "./OderHistoryCard";
import { getOrderHistory } from "../../../../config/api-path";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatBot from "../../../Bot/ChatBot";
import Footer from "../../../Footer";

import axios from "axios";
import AuthContext from "../../AuthContext";

import Modal from "../../../Modal/Modal";

import { RiFilePaper2Fill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";

function OrderHistoryMain() {
    const { token } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const [cards, setCards] = useState([]);

    

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(getOrderHistory, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.data.length) {
                // console.count(123);
                console.log("歷史訂單");
                setIsOpen(true);
            }
            setCards(response.data);
        };
        getData();
    }, []);

    // 跳轉到商品頁
    const toProduct = () => {
        setIsOpen(false);
        setTimeout(() => {
            navigate("/products", { replace: false });
        }, 0);
    };

    return (
        <>
            <div className="odh-wrap-main">
                <div className="odh-container">
                    <MemberMenu />
                    <div className="odh-wrap-right">
                        <div className="odh-wrap-title">歷史訂單</div>
                        {cards.map((v, i) => {
                            return (
                                <div key={v.order_sid}>
                                    <OderHistoryCard
                                        cards={{
                                            order_sid: v.order_sid,
                                            order_time: v.order_time,
                                            order_member_id: v.order_member_id,
                                            order_price: v.order_price,
                                            order_id: v.order_id,
                                            order_status: v.order_status,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeButton={false} closeAble={false}>
                <Modal.Body style={{ padding: "0" }}>
                    <div className="or-wrap">
                        <div className="or-msg-wrap">
                            <div className="or-msg">
                                <RiFilePaper2Fill
                                    size={"2.5rem"}
                                    style={{
                                        display: "block",
                                        marginBottom: "40px",
                                    }}
                                />
                                您尚未建立歷史訂單
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="or-btn"
                            onClick={toProduct}
                        >
                            <FaShoppingCart
                                size={".9rem"}
                                style={{ marginRight: "10px" }}
                            />
                            至商品頁購買
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <ChatBot />
            <Footer />
        </>
    );
}

export default OrderHistoryMain;
