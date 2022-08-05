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
                    fontSize: "15px",
                    color: "#787878",
                    marginLeft: "1.7rem",
                    marginRight: ".25rem",
                }}
            >
                {likes}
            </span>
        </div>
    );
}

export default Likes;
