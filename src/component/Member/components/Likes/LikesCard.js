/* eslint-disable prettier/prettier */
import { useState,useContext } from "react";
import "./Likes.css";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import AuthContext from "../../AuthContext";
import axios from "axios";
import { delUserLikes,getUserLikes } from "../../../../config/api-path";
import { useNavigate } from "react-router-dom";


function LikesCard({myLikes,setMyLikes,setIsOpen}) {

    const { products_name, products_pic, products_price, products_with_products_categories_sid, products_sid } = myLikes;
    const { token } = useContext(AuthContext);

    const [heartIsClick,setHeartIsClick] = useState(false);
    const [deleteSid,setDeleteSid] = useState(products_sid);

    const navigate = useNavigate();

// --------------------- 移除收藏的資料 ---------------------
    const handleCancel = (e) => {
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
                
// --------------------- 移除完render新的收藏 ---------------------
        axios.get(getUserLikes, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {

                if(!response.data){
                    setMyLikes([]);
                    setIsOpen(true);
                    return;
                }
                console.log(response.data);
                setMyLikes(response.data);
            });

        // 愛心切換
        e.preventDefault();
        setHeartIsClick(!heartIsClick);
    });
    }

    
    const gotoProduct = (id) => {
        navigate(`/products/detail/${id}`);
    };

    return (
            <div className="like-info">
                <div className="like-info-wrap">
                    <div className="like-content" onClick={() =>gotoProduct(products_sid)}>
                        <div className="like-pic" style={{ backgroundImage: `url(http://localhost:3500/images/products/${products_with_products_categories_sid}/${products_pic})`,backgroundRepeat: 'no-repeat',backgroundPosition: 'center',backgroundSize: 'cover',}}>
                        </div>
                        <div className="like-name">{products_name}</div>
                        <div className="like-price">
                            {products_price}<span>元</span>
                        </div>
                    </div>
                    <button className="like-btn" onClick={handleCancel}>{heartIsClick ? (<FaRegHeart style={{ marginRight: "8px" }}/>) : (<FaHeart style={{ marginRight: "8px" }}/>)}
                            取消收藏
                    </button>
                </div>
            </div>
    );
}

export default LikesCard;
