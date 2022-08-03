import React from "react";
// import { FaHeart } from "react-icons/fa";
import styles from "../../css/Likes.module.scss";

function Likes({ likes }) {
    const { like_wrap, heart, liked } = styles;

    return (
        <div className={like_wrap}>
            <div className={heart}>
                <a href=""></a>
            </div>
            Likes: {likes}
        </div>
    );
}

export default Likes;
