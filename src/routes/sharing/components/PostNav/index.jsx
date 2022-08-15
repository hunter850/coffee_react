import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Seachbar from "./Seachbar";
import { avatarDIR } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";

import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import styles from "./scss/PostNav.module.scss";

function PostNav(props) {
    const navigate = useNavigate();

    const {
        scrollDir = "up",
        setRows,
        setSearchMode,
        keyWord,
        setKeyWord,
        setIsEnd,
        setGetDataTimes,
        chooseToSearch,
        tabs,
        setTabs,
        resetState,
    } = props;
    const { authorized, sid, account, token, avatar } = useAuth();
    const {
        post_nav,
        container,
        title_wrap,
        collapse,
        search_wrap,
        icon_wrap,
        avatar_wrap,
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
                            setTabs("home");
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
                        setTabs={setTabs}
                    />
                </div>
                <ul className={icon_wrap}>
                    <li
                        onClick={() => {
                            setTabs("home");
                            window.scrollTo(0, 0);
                            resetState();
                        }}
                    >
                        <Link to="/sharing">
                            <AiFillHome
                                color={tabs === "home" ? "#b79973" : "324A59"}
                                fontSize="26"
                            />
                        </Link>
                    </li>
                    <li
                        onClick={() => {
                            setTabs("newPost");
                        }}
                    >
                        <Link to="/sharing/newpost">
                            <BsFillPlusSquareFill
                                color={
                                    tabs === "newPost" ? "#b79973" : "324A59"
                                }
                                fontSize="24"
                            />
                        </Link>
                    </li>
                    <li
                        onClick={() => {
                            chooseToSearch({ type: "member_like", sid });
                            window.scrollTo(0, 0);
                            setTabs("heart");
                        }}
                    >
                        <Link to="/sharing">
                            <FaHeart
                                color={tabs === "heart" ? "#b79973" : "324A59"}
                                fontSize="24"
                            />
                        </Link>
                    </li>
                    <li
                        className={avatar_wrap}
                        onClick={() => {
                            chooseToSearch({ type: "nickname", sid });
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
