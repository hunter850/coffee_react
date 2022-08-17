import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Seachbar from "./Seachbar";
import { avatarDIR } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { useTabsHistory } from "../../../../Contexts/TabsHistoryProvider";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import styles from "./scss/PostNav.module.scss";

function PostNav(props) {
    const navigate = useNavigate();
    const { tabPush, tabNow } = useTabsHistory();
    const { authorized, sid, account, token, avatar } = useAuth();

    const {
        scrollDir = "up",
        setRows,
        setSearchMode,
        keyWord,
        setKeyWord,
        setIsEnd,
        setGetDataTimes,
        chooseToSearch,
        // tabs,
        // setTabs,
        resetState,
    } = props;
    const {
        post_nav,
        container,
        title_wrap,
        collapse,
        search_wrap,
        icon_wrap,
        avatar_wrap,
        avatar_selected,
    } = styles;

    return (
        <div className={`${post_nav} ${scrollDir === "down" && collapse}`}>
            <div className={container}>
                <div className={title_wrap}>
                    <a
                        href="./#"
                        onClick={(e) => {
                            navigate(0);
                            e.preventDefault();
                            tabPush("home");
                        }}
                    >
                        <h4>分享牆</h4>
                    </a>
                </div>
                <div className={search_wrap}>
                    <Seachbar
                        setRows={setRows}
                        setSearchMode={setSearchMode}
                        keyWord={keyWord}
                        setKeyWord={setKeyWord}
                        setIsEnd={setIsEnd}
                        setGetDataTimes={setGetDataTimes}
                        chooseToSearch={chooseToSearch}
                    />
                </div>
                <ul className={icon_wrap}>
                    <li
                        onClick={() => {
                            tabPush("home");
                            window.scrollTo(0, 0);
                            resetState();
                        }}
                    >
                        <Link to="/sharing">
                            <AiFillHome
                                color={tabNow === "home" ? "#b79973" : "324A59"}
                                fontSize="26"
                            />
                        </Link>
                    </li>
                    {/* NEWPOST */}
                    <li
                        onClick={() => {
                            tabPush("newPost");
                        }}
                    >
                        <Link to="/sharing/newpost">
                            <BsFillPlusSquareFill
                                color={
                                    tabNow === "newPost" ? "#b79973" : "324A59"
                                }
                                fontSize="24"
                            />
                        </Link>
                    </li>
                    <li
                        onClick={() => {
                            chooseToSearch({ type: "member_like", sid });
                            window.scrollTo(0, 0);
                            tabPush("heart");
                        }}
                    >
                        <Link to="/sharing">
                            <FaHeart
                                color={
                                    tabNow === "heart" ? "#b79973" : "324A59"
                                }
                                fontSize="24"
                            />
                        </Link>
                    </li>
                    <li
                        className={
                            tabNow === "myPost" ? avatar_selected : avatar_wrap
                        }
                        onClick={() => {
                            chooseToSearch({ type: "nickname", sid });
                            tabPush("myPost");
                            window.scrollTo(0, 0);
                        }}
                    >
                        <Link to="/sharing">
                            <img
                                src={`${avatarDIR}/${avatar || "missing-image.jpg"
                                    }`}
                                alt="avatar"
                                width="36px"
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PostNav;
