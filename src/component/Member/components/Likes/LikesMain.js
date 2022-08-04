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

    const [myLikes, setMyLikes] = useState([]);

    useEffect(() => {
        axios
            .get(getUserLikes, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setMyLikes(response.data);
            });
    }, [token]);

    return (
        <>
            <div className="like-wrap-main">
                <div className="like-container">
                    <MemberMenu />
                    <div className="like-wrap-right">
                        <div className="like-wrap">
                            {myLikes.map((v,i) => {
                                return(
                                    <div key={v.products_sid}>
                                            <LikesCard myLikes={{
                                                products_name: v.products_name,
                                                products_pic: v.products_pic,
                                                products_price: v.products_price,
                                                products_sid: v.products_sid,
                                            }}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LikesMain;
