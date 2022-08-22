/* eslint-disable prettier/prettier */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MemberMenu from "../MemberMenu/MemberMenu";
import HistoryPostsCard from "./HistoryPostsCard";
import "./HistoryPosts.css";
import useLog from "../../../../hooks/useLog";
import ChatBot from "../../../Bot/ChatBot";
import Footer from "../../../Footer";

import { getUserPosts } from "../../../../config/api-path";

import Modal from "../../../Modal/Modal";

import axios from "axios";
import AuthContext from "../../AuthContext";

import { FaEdit } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import { CSSTransition, TransitionGroup } from "react-transition-group";

function HistoryPostsMain() {
    const { token } = useContext(AuthContext);

    // --------------------- 拿到收藏的資料 ---------------------

    const [myPosts, setMyPosts] = useState([]);         // 原始資料
    const [sortPosts, setSortPosts] = useState([]);     // 要做事的資料
    const [sortData, setSortData] = useState("");       // 下拉選單的值
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
                if (response.data.length<=0) {
                    console.log("分享");
                    setIsOpen(true);
                    return;
                }
                console.log(response.data);
                setMyPosts(response.data);
                setSortPosts(response.data);
            });
    }, []);

    // 拿到下拉選單的值
    const sortPost = (e) => {
        // --------------------- 下拉選單排序 ---------------------

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
            setSortPosts([...myPosts].sort(dateAsc));               // sort方法為原陣列排序，不會產生新的陣列，因此先對原資料myPosts進行複製之後再sort，才不會動到原資料

        } else if (e.target.value === "dateDesc") {
            console.log(3);
            setSortPosts([...myPosts].sort(dateDesc));

        } else if (e.target.value === "threeMonths") {
            const newMyPosts = myPosts.filter((v) => {
                const now = new Date();                             // 現在
                const dataDate = new Date(v.created_at).getTime();  // 撈到的資料
                return now.getTime() - dataDate <= 7776000000;      // 1000*60*60*24*90
            });
            console.log(newMyPosts);
            setSortPosts(newMyPosts);
        } else if (e.target.value === "sixMonths") {
            const newMyPosts = myPosts.filter((v) => {
                const now = new Date();                             
                const dataDate = new Date(v.created_at).getTime();  
                return now.getTime() - dataDate >= 15552000000;
            });
            setSortPosts(newMyPosts);
        }

    };

    // 跳轉到分享牆
    const toShare = () => {
        setIsOpen(false);
        setTimeout(() => {
            navigate("/sharing", { replace: false });
        },0)
    };

// --------------------- 拿到搜尋框的值 ---------------------

    const [mySearch, setMySearch] = useState({
        keyword:"",
    });  

    const searchFields = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        setMySearch({ ...mySearch, [id]: val });
    }

// --------------------- 關鍵字搜尋拿到資料後重新渲染畫面 ---------------------
    const handleSearch = () => {
        if(mySearch.keyword !== ""){
            const newPostData = myPosts.filter((v) => {
            return v.title.includes(mySearch.keyword);
        })
            setSortPosts(newPostData);
        }
    }
    useEffect(()=>{
        if(mySearch.keyword === ""){
            setSortPosts([...myPosts]);
        }
    },[mySearch])
    
    return (
        <>
            <div className="hp-wrap-main">
                <div className="hp-container">
                    <MemberMenu />
                    <div className="hp-wrap-right">
                        <div className="hp-header">
                            <div className="hp-search-section">
                                <input
                                    type="text"
                                    placeholder="搜尋文章標題"
                                    id="keyword"
                                    value={mySearch.keyword}
                                    onChange={searchFields}
                                />
                                <div className="hp-search">
                                    <FaSearch size={'0.9rem'} style={{cursor:"pointer"}} onClick={handleSearch}/>
                                </div>
                            </div>
                            <div className="hp-sort-section">
                                <div className="hp-arr">
                                    <FaCaretDown />
                                </div>
                                <select
                                    className="hp-sort"
                                    value={sortData}
                                    onChange={(e) => sortPost(e)}
                                >
                                    <option value="">查詢排序</option>
                                    {/* <option value="dateAsc">
                                        由遠&nbsp;&gt;&nbsp;到近
                                    </option> */}
                                    <option value="dateDesc">
                                        由近&nbsp;&gt;&nbsp;到遠
                                    </option>
                                    <option value="threeMonths">過去三個月</option>
                                    <option value="sixMonths">半年以前的貼文</option>
                                </select>
                            </div>
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

            <Modal isOpen={isOpen} setIsOpen={setIsOpen}  closeButton={false} closeAble={false}>
                <Modal.Body style={{ padding: "0" }}>
                    <div className="li-wrap">
                        <div className="li-msg-wrap">
                            <div className="li-msg">
                                <FaPen
                                    size={"2.5rem"}
                                    style={{
                                        display: "block",
                                        marginBottom: "40px",
                                    }}
                                />
                                還沒有分享
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="li-btn"
                            onClick={toShare}
                        >
                            <FaEdit
                                size={".9rem"}
                                style={{ marginRight: "10px" }}
                            />
                            去發文！
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <ChatBot/>
            <Footer/>
        </>
    );
}

export default HistoryPostsMain;
