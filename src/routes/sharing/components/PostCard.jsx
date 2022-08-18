import { useState, useEffect } from "react";
import axios from "axios";
import { memberLikeAPI } from "../../../config/api-path";
import { useAuth } from "../../../component/Member/AuthContextProvider";
import { sharingIMGS } from "../../../config/api-path";
import { FaHeart } from "react-icons/fa";
import styles from "./scss/PostCard.module.scss";
import Modal from "../../../component/Modal/Modal";

function PostCard({ cardData, modalMode, chooseToSearch, setIsOpen }) {
    const { authorized, sid: login_sid, account, token } = useAuth();
    const {
        post_card,
        like_wrap,
        like_str,
        content_wrap,
        title_nickname,
        nickname_span,
        title_span,
        tags_wrap,
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
    } = cardData;

    const [didLike, setDidLike] = useState(false);
    // const [likeQ, setLikeQ] = useState(0);

    // useEffect(() => {
    //     axios(`${memberLikeAPI}/${sid}`, {
    //         params: { member_sid: login_sid },
    //     }).then((r) => {
    //         setDidLike(Boolean(r.data.liked));
    //         setLikeQ(r.data.total);
    //     });
    // }, [modalMode]);

    // const likeHandler = async (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();

    //     if (authorized) {
    //         setDidLike(!didLike);
    //         if (didLike) {
    //             await axios.delete(memberLikeAPI + "/" + sid, {
    //                 data: { member_sid: sid },
    //             });
    //             setLikeQ((pre) => pre - 1);
    //         } else {
    //             await axios.post(memberLikeAPI + "/" + sid, {
    //                 member_sid: login_sid,
    //             });
    //             setLikeQ((pre) => pre + 1);
    //         }
    //     } else {
    //         setIsOpen(true);
    //     }
    // };

    return (
        <>
            <div className={post_card}>
                <img src={`${sharingIMGS}/${img_name}`} alt={title} />
                <ul>
                    <li
                        className={like_wrap}
                        onClick={(e) => {
                            // likeHandler(e);
                            e.stopPropagation();
                            e.preventDefault();

                            setIsOpen(true);
                        }}
                    >
                        <FaHeart
                            color={didLike ? "#faa" : "#fff"}
                            fontSize="1.25rem"
                        />
                        <span className={like_str}>{likes}</span>
                    </li>
                    <li className={content_wrap}>
                        <div className={title_nickname}>
                            <span
                                className={nickname_span}
                                onClick={(e) => {
                                    console.log("名稱篩", member_sid);
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
