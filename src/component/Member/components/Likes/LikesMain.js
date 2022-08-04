import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MemberMenu from "../MemberMenu/MemberMenu";
import LikesCard from "./LikesCard";
import "./Likes.css";

import { getUserLikes } from "../../../../config/api-path";

import Modal from "../../../Modal/Modal";

import axios from "axios";
import AuthContext from "../../AuthContext";

import { RiHeartAddFill } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";

import { CSSTransition } from "react-transition-group";

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
                console.log(response.data);
                if(!response.data){
                    setIsOpen(true);
                    return;
                }
                setMyLikes(response.data);
            });
    }, [token]);

    // --------------------- 移除收藏的資料 ---------------------
    const [isLike, setIsLike] = useState(false);


    // 跳轉到商品頁
    const toProduct = () => {
        navigate("/products", {replace: false});
    }

    return (
        <>
            <div className="like-wrap-main">
                <div className="like-container">
                    <MemberMenu />
                    <div className="like-wrap-right">
                        <div className="like-wrap">
                                {myLikes.map((v,i) => {
                                    return(
                                        <div key={v.products_sid}>
                                                <LikesCard
                                                    myLikes={{
                                                        products_name: v.products_name,
                                                        products_pic: v.products_pic,
                                                        products_price: v.products_price,
                                                        products_with_products_categories_sid: v.products_with_products_categories_sid,
                                                        products_sid: v.products_sid,
                                                    }}
                                                />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Modal.Body style={{ padding : "0"}}>
                    <div className="li-wrap">
                        <div className="li-msg-wrap">
                            <div className="li-msg"><RiHeartAddFill size={'2.5rem'} style={{display:"block",marginBottom:"40px"}}/>還沒有收藏</div>
                        </div>
                        <button type="submit" className="li-btn" onClick={toProduct}><FaShoppingBag size={'.9rem'} style={{marginRight:"10px"}}/>去逛逛！</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LikesMain;
