import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MemberMenu from "../MemberMenu/MemberMenu";
// import HistoryPostsCard from "./HistoryPostsCard";
import "./HistoryPosts.css";

import { getUserLikes } from "../../../../config/api-path";

import Modal from "../../../Modal/Modal";

import axios from "axios";
import AuthContext from "../../AuthContext";

import { RiHeartAddFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";

import { CSSTransition, TransitionGroup } from "react-transition-group";

function HistoryPostsMain() {
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
                    setIsOpen(true);
                    return;
                }
                console.log(response.data);
                setMyLikes(response.data);
            });
    }, [token]);

    // 跳轉到商品頁
    // const toProduct = () => {
    //     setIsOpen(false);
    //     setTimeout(() => {
    //         navigate("/products", { replace: false });
    //     },0)
    // };

    return (
        <>
            <div className="hp-wrap-main">
                <div className="hp-container">
                    <MemberMenu />
                    <div className="hp-wrap-right">
                        <div className="hp-wrap">
                            {/* <TransitionGroup component={null}>
                                {myLikes.map((v, i) => {
                                    return (
                                        <CSSTransition key={v.products_sid} timeout={500} classNames="like">
                                            
                                        </CSSTransition>
                                    );
                                })}
                            </TransitionGroup> */}

                        <div className="hp-info">
                            <div className="hp-info-wrap">
                                <div className="hp-title">體驗拉花<span>2022-05-31</span></div>
                                <div className="hp-content">
                                    <div className="hp-text">
                                    每次看到咖啡師的拉花作品，再看看咖啡師拉花的動作看似簡單，胃痛一直很想要體驗拉花，想不到自己實際操作一遍，操作起來還真的不簡單啊。每次看到咖啡師的拉花作品，再看看咖啡師拉花的動作看似簡單，胃痛一直很想要體驗拉花，想不到自己實際操作一遍，操作起來還真的不簡單啊。
                                    </div>
                                    <div className="hp-heart"><FaHeart size={'0.75rem'} style={{marginRight:"10px"}}/>1234</div>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HistoryPostsMain;