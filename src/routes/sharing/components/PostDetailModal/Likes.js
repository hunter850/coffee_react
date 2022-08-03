import React from "react";
import { FaHeart } from "react-icons/fa";

function Likes({ likes }) {
    return (
        <span>
            <FaHeart />
            Likes: {likes}
        </span>
    );
}

export default Likes;
