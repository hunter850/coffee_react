/* eslint-disable prettier/prettier */
import { useState } from "react";
import "./Likes.css";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function LikesCard({myLikes}) {

    const { products_name, products_pic, products_price, products_sid } = myLikes;

    const [heartIsClick,setHeartIsClick] = useState(false);

    const handleHeart = (e) => {
        e.preventDefault();
        setHeartIsClick(!heartIsClick);
    }

    return (
        <>
            <div className="like-info">
                <div className="like-info-wrap">
                    <div className="like-content">
                        <div className="like-pic"></div>
                        <div className="like-name">{products_name}</div>
                        <div className="like-price">
                            {products_price}<span>元</span>
                        </div>
                        <button className="like-btn" onClick={handleHeart}>{heartIsClick ? (<FaRegHeart style={{ marginRight: "8px" }}/>) : (<FaHeart style={{ marginRight: "8px" }}/>)}
                            取消收藏
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LikesCard;
