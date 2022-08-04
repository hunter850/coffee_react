import { useState, useEffect, useContext } from "react";
import MemberMenu from "../MemberMenu/MemberMenu";
import LikesCard from "./LikesCard";
import "./Likes.css";

import { getUserLikes } from "../../../../config/api-path";

import axios from "axios";
import AuthContext from "../../AuthContext";

function LikesMain() {

    const { token } = useContext(AuthContext);

    // --------------------- 拿到收藏的資料 ---------------------
    useEffect(() => {
        axios
            .get(getUserLikes, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
            });
    }, [token]);

    return (
        <>
            <div className="like-wrap-main">
                <div className="like-container">
                    <MemberMenu />
                    <LikesCard />
                </div>
            </div>
        </>
    );
}

export default LikesMain;
