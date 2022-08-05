import React from "react";
// import { FaHeart } from "react-icons/fa";
import styles from "../../css/Likes.module.scss";

function Likes({ likes, likeHandler }) {
    const { like_wrap, heart, liked } = styles;

    return (
        <div className={like_wrap}>
            <div className={heart}>
                <button onClick={likeHandler}></button>
            </div>
            <span
                style={{
                    marginLeft: "1.75rem",
                    lineHeight: "1.5rem",
                }}
            >
                {likes}
            </span>
        </div>
    );
}

export default Likes;
