import React, { useMemo } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import styles from "./../css/postnav.module.scss";

function PostNav({ scrollDir = "up" }) {
    const { post_nav, container, collapse, search_wrap, search_bar } = styles;

    return (
        <div className={`${post_nav} ${scrollDir === "down" && collapse}`}>
            <div className={container}>
                <h4 style={{ width: "25%" }}>分享牆</h4>
                <div className={search_wrap}>
                    <div className={search_bar}>search</div>
                </div>
                <div
                    className="icon_wrap"
                    style={{ width: "25%", textAlign: "end" }}
                >
                    <BsFillPlusSquareFill
                        color="#324A59"
                        fontSize="24"
                        style={{ marginRight: "1.5rem" }}
                    />
                    <FaHeart color="#324A59" fontSize="24" />
                </div>
            </div>
        </div>
    );
}

export default PostNav;
