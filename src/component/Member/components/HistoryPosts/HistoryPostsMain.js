import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MemberMenu from "../MemberMenu/MemberMenu";
import HistoryPostsCard from "./HistoryPostsCard";
import "./HistoryPosts.css";
import useLog from "../../../../hooks/useLog";

import { getUserPosts } from "../../../../config/api-path";

import Modal from "../../../Modal/Modal";

import axios from "axios";
import AuthContext from "../../AuthContext";

import { RiHeartAddFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

import { CSSTransition, TransitionGroup } from "react-transition-group";

function HistoryPostsMain() {
    const { token } = useContext(AuthContext);

    // --------------------- 拿到收藏的資料 ---------------------

    const [myPosts, setMyPosts] = useState([]);
    const [sortPosts, setSortPosts] = useState([]);
    // const [monthSortPosts, setMonthSortPosts] = useState([]);
    const [sortData, setSortData] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(getUserPosts, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // if (!response.data) {
                //     setIsOpen(true);
                //     return;
                // }
                console.log(response.data);
                setMyPosts(response.data);
                setSortPosts(response.data);
            });
    }, [token]);

    // 拿到下拉選單的值
    const sortPost = (e) => {
        // --------------------- 下拉選單排序 ---------------------

        // myPosts.forEach((item)=>{
        //     console.log(item.created_at);
        // });

        const dateAsc = (a, b) => {
            const date = new Date(a.created_at);
            const date2 = new Date(b.created_at);
            return date - date2;
        };
        const dateDesc = (a, b) => {
            const date = new Date(a.created_at);
            const date2 = new Date(b.created_at);
            return date2 - date;
        };

        setSortData(e.target.value);
        if (e.target.value === "") {
            console.log(1);
            setSortPosts([...myPosts]);
        } else if (e.target.value === "dateAsc") {
            console.log(2);
            setSortPosts([...myPosts].sort(dateAsc));
        } else if (e.target.value === "dateDesc") {
            console.log(3);
            setSortPosts([...myPosts].sort(dateDesc));
        } else if (e.target.value === "threeMonths") {
            const newMyPosts = myPosts.filter((v) => {
                const now = new Date();
                const dataDate = new Date(v.created_at).getTime();
                return now.getTime() - dataDate <= 7776000000;
            });
            console.log(newMyPosts);
            setSortPosts(newMyPosts);
        }
    };

    // console.log(sortPosts);

    // useEffect(() => {
    //     if (sortData === "dateAsc") {
    //         const renderAsc = myPosts.sort(dateAsc);
    //         setMyPosts(renderAsc);
    //     }
    //     if (sortData === "dateDesc") {
    //         const renderDesc = myPosts.sort(dateDesc);
    //         setMyPosts(renderDesc);
    //     }

    //     if (sortData === "threeMonths") {
    //         const newArray = [];

    //         const date1 = new Date().getMonth() + 1;
    //         for (let i = 0; i < myPosts.length; i++) {
    //             const date2 = new Date(myPosts[i].created_at).getMonth() + 1;
    //             const threeMonthsResult = date1 - date2;

    //             if (threeMonthsResult <= 3) {
    //                 newArray.push(myPosts[i]);
    //                 // console.log(myPosts[i]);
    //                 // const threeMonthsData = myPosts[i];
    //                 setMyPosts(newArray);
    //             }
    //         }
    //     }
    // }, [sortData]);

    // useEffect(() => {
    //     console.log(sortPosts);
    // }, [sortData]);

    // console.log(myPosts.sort(dateAsc));

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
                        <div className="hp-sort-section">
                            <div className="hp-arr">
                                <FaCaretDown />
                            </div>
                            <select
                                className="hp-sort"
                                value={sortData}
                                onChange={(e) => sortPost(e)}
                            >
                                <option value="">排序方式</option>
                                <option value="dateAsc">
                                    由近&nbsp;&gt;&nbsp;到遠
                                </option>
                                <option value="dateDesc">
                                    由遠&nbsp;&gt;&nbsp;到近
                                </option>
                                <option value="threeMonths">三個月內</option>
                                <option value="priceDesc">
                                    價錢高&nbsp;&gt;&nbsp;低
                                </option>
                            </select>
                        </div>
                        <div className="hp-wrap">
                            <TransitionGroup component={null}>
                                {sortPosts.map((v, i) => {
                                    return (
                                        <CSSTransition
                                            key={v.sid}
                                            timeout={500}
                                            classNames="hPost"
                                        >
                                            <HistoryPostsCard
                                                sortPosts={{
                                                    sid: v.sid,
                                                    title: v.title,
                                                    content: v.content,
                                                    likes: v.likes,
                                                    created_at: v.created_at,
                                                }}
                                            />
                                        </CSSTransition>
                                    );
                                })}
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HistoryPostsMain;
