/* eslint-disable prettier/prettier */
import { useState,useContext } from "react";
import "./Likes.css";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import AuthContext from "../../AuthContext";
import axios from "axios";
import { delUserLikes } from "../../../../config/api-path";

function LikesCard({myLikes}) {

    const { products_name, products_pic, products_price, products_with_products_categories_sid, products_sid } = myLikes;
    const { token } = useContext(AuthContext);

    const [heartIsClick,setHeartIsClick] = useState(false);
    const [deleteSid,setDeleteSid] = useState(products_sid);

    const handleHeart = (e) => {
        e.preventDefault();
        setHeartIsClick(!heartIsClick);
    }

    const handleCancel = () => {
    // console.log(deleteSid);
        axios.delete(delUserLikes, {
            params:{
                data: deleteSid,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response);
            });
    }

    return (
        <>
            <div className="like-info" onClick={handleCancel}>
                <div className="like-info-wrap">
                    <div className="like-content">
                        <div className="like-pic" style={{ backgroundImage: `url(http://localhost:3500/images/products/${products_with_products_categories_sid}/${products_pic})`,backgroundRepeat: 'no-repeat',backgroundPosition: 'center',backgroundSize: 'cover',}}>
                        </div>
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
