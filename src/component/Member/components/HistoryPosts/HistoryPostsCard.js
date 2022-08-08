/* eslint-disable prettier/prettier */
import { useState,useContext } from "react";
import "./Likes.css";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import AuthContext from "../../AuthContext";
import axios from "axios";
import { delUserLikes,getUserLikes } from "../../../../config/api-path";
import { useNavigate } from "react-router-dom";


function HistoryPostsCard() {

    // const { products_name, products_pic, products_price, products_with_products_categories_sid, products_sid } = myLikes;
    const { token } = useContext(AuthContext);

    const [heartIsClick,setHeartIsClick] = useState(false);

    const navigate = useNavigate();

    
    // const gotoProduct = (id) => {
    //     navigate(`/products/detail/${id}`);
    // };

    return (
        <></>
    );
}

export default HistoryPostsCard;
