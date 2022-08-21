import { useState, useEffect } from "react";
import axios from "axios";
import { memberLikeAPI } from "../../../config/api-path";
import { useAuth } from "../../../component/Member/AuthContextProvider";
import { sharingIMGS } from "../../../config/api-path";
import { FaHeart } from "react-icons/fa";
import styles from "./scss/PostCard.module.scss";
import Modal from "../../../component/Modal/Modal";

function PostCard({ cardData, modalMode, chooseToSearch, setIsOpen }) {
    const { authorized, token } = useAuth();
    const {
        post_card,
        like_wrap,
        like_str,
        content_wrap,
        title_nickname,
        nickname_span,
        title_span,
        tags_wrap,
        like_heart,
        liked_heart,
    } = styles;
    const {
        sid,
        title,
        img_name,
        member_nickname,
        member_sid,
        likes,
        tags,
        topic_sid,
        liked,
    } = cardData;

    const [didLiked, setDidLiked] = useState(false);
    const [likesNumber, setLikesNumber] = useState(0);

    useEffect(() => {
        setDidLiked(liked > 0);
        setLikesNumber(likes);
    }, [cardData]);

    const likeHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (authorized) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            if (didLiked) {
                await axios.delete(`${memberLikeAPI}/${sid}/unlike`, config);
                setDidLiked(false);
                setLikesNumber((pre) => pre - 1);
            } else {
                await axios.post(`${memberLikeAPI}/${sid}/like`, {}, config);
                setDidLiked(true);
                setLikesNumber((pre) => pre + 1);
            }
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>
            <div className={post_card}>
                <img src={`${sharingIMGS}/${img_name}`} alt={title} />
                <ul>
                    <li
                        className={like_wrap}
                        onClick={(e) => {
                            likeHandler(e);
                        }}
                    >
                        <FaHeart
                            className={didLiked ? liked_heart : like_heart}
                        />
                        <span className={like_str}>{likesNumber}</span>
                    </li>
                    <li className={content_wrap}>
                        <div className={title_nickname}>
                            <span
                                className={nickname_span}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    chooseToSearch({
                                        type: "nickname",
                                        sid: member_sid,
                                    });
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {member_nickname}
                            </span>
                            <span className={title_span}>{title}</span>
                        </div>
                        <div className={tags_wrap}>
                            {tags &&
                                tags.map((v, i) => {
                                    return <span key={i}>{v}</span>;
                                })}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default PostCard;
