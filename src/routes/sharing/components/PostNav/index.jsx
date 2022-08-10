import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Seachbar from "./Seachbar";
import { imgSrc } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";

import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import styles from "../../css/postnav.module.scss";

function PostNav(props) {
    const {
        scrollDir = "up",
        rows,
        setRows,
        getData,
        setSearchMode,
        keyWord,
        setKeyWord,
        setIsEnd,
        setGetDataTimes,
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
                    <a href="./">
                        <h4>分享牆</h4>
                    </a>
                </div>
                <div className={search_wrap}>
                    <Seachbar
                        setRows={setRows}
                        getData={getData}
                        setSearchMode={setSearchMode}
                        keyWord={keyWord}
                        setKeyWord={setKeyWord}
                        setIsEnd={setIsEnd}
                        setGetDataTimes={setGetDataTimes}
                    />
                </div>
                <ul className={icon_wrap}>
                    <li>
                        <BsFillPlusSquareFill color="#324A59" fontSize="24" />
                    </li>
                    <li>
                        <FaHeart color="#324A59" fontSize="24" />
                    </li>
                    <li className={avatar_wrap}>
                        <img
                            src={`${imgSrc}/member/${avatar || "missing-image.jpg"
                                }`}
                            alt="avatar"
                            width="36px"
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PostNav;
