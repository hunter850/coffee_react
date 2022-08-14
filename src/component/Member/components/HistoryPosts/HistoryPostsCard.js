/* eslint-disable prettier/prettier */
import { useState,useContext } from "react";
import "./HistoryPosts.css";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import AuthContext from "../../AuthContext";
import axios from "axios";
import { delUserLikes,getUserLikes } from "../../../../config/api-path";
import { useNavigate } from "react-router-dom";


function HistoryPostsCard({sortPosts}) {

    const { sid, title, content, likes, created_at } = sortPosts;
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    
    const gotoPosts = (id) => {
        navigate(`/sharing/${id}`);
    };

    return (
        <div className="hp-info" onClick={() =>gotoPosts(sid)}>
            <div className="hp-info-wrap">
                <div className="hp-title">{title}<span>{created_at.split("T")[0]}</span></div>
                <div className="hp-content">
                    <div className="hp-text" dangerouslySetInnerHTML={{__html: content}}></div>
                    <div className="hp-heart"><FaHeart size={'0.75rem'} style={{marginRight:"8px"}}/>{likes}</div>
                </div>
            </div>
        </div>
    );
}

export default HistoryPostsCard;
