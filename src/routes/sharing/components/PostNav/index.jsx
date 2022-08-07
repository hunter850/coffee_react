import { useState, useEffect } from "react";

import Seachbar from "./Seachbar";
import { imgSrc } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";

import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import styles from "../../css/postnav.module.scss";

function PostNav({ scrollDir = "up" }) {
    const { authorized, sid, account, token, avatar } = useAuth();
    const {
        post_nav,
        container,
        collapse,
        search_wrap,
        search_bar,
        icon_wrap,
        avatar_wrap,
    } = styles;

    return (
        <div className={`${post_nav} ${scrollDir === "down" && collapse}`}>
            <div className={container}>
                <h4 style={{ width: "25%" }}>分享牆</h4>
                <div className={search_wrap}>
                    <Seachbar />
                </div>
                <ul
                    className={icon_wrap}
                    style={{ width: "25%", textAlign: "end" }}
                >
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
