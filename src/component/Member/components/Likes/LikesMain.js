import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MemberMenu from "../MemberMenu/MemberMenu";
import LikesCard from "./LikesCard";
import "./Likes.css";
import ChatBot from "../../../Bot/ChatBot";
import Footer from "../../../Footer";

import { getUserLikes } from "../../../../config/api-path";

import Modal from "../../../Modal/Modal";

import axios from "axios";
import AuthContext from "../../AuthContext";

import { RiHeartAddFill } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { replace } from "lodash";

function LikesMain() {
    const { token } = useContext(AuthContext);

    // --------------------- 拿到收藏的資料 ---------------------

    const [myLikes, setMyLikes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(getUserLikes, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (!response.data) {
                    console.log("收藏");
                    setIsOpen(true);
                    return;
                }
                // console.log(response.data);
                setMyLikes(response.data);
            });
    }, []);

    // 跳轉到商品頁
    const toProduct = () => {
        setIsOpen(false);
        setTimeout(() => {
            navigate("/products", { replace: false });
        },0)
    };

    return (
        <>
            <div className="like-wrap-main">
                <div className="like-container">
                    <MemberMenu />
                    <div className="like-wrap-right">
                        <div className="like-wrap">
                            <TransitionGroup component={null}>
                                {myLikes.map((v, i) => {
                                    return (
                                        <CSSTransition
                                            key={v.products_sid}
                                            timeout={500}
                                            classNames="like"
                                        >
                                            <LikesCard
                                                myLikes={{
                                                    products_name:
                                                        v.products_name,
                                                    products_pic:
                                                        v.products_pic,
                                                    products_price:
                                                        v.products_price,
                                                    products_with_products_categories_sid:
                                                        v.products_with_products_categories_sid,
                                                    products_sid:
                                                        v.products_sid,
                                                }}
                                                setMyLikes={setMyLikes}
                                                setIsOpen={setIsOpen}
                                            />
                                        </CSSTransition>
                                    );
                                })}
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeButton={false} closeAble={false}>
                <Modal.Body style={{ padding: "0" }}>
                    <div className="li-wrap">
                        <div className="li-msg-wrap">
                            <div className="li-msg">
                                <RiHeartAddFill
                                    size={"2.5rem"}
                                    style={{
                                        display: "block",
                                        marginBottom: "40px",
                                    }}
                                />
                                還沒有收藏
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="li-btn"
                            onClick={toProduct}
                        >
                            <FaShoppingBag
                                size={".9rem"}
                                style={{ marginRight: "10px" }}
                            />
                            去逛逛！
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <ChatBot />
            <Footer/>
        </>
    );
}

export default LikesMain;
