import { useState, useRef, useMemo, useEffect } from "react";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { Link } from "react-router-dom";
import axios from "axios";

import useTimeAbout from "../../../../hooks/useTimeAbout";
import {
    avatarDIR,
    commentAPI,
    memberLikeAPI,
} from "../../../../config/api-path";
import styles from "./scss/PostDetailContent.module.scss";

import Tag from "../Tag";
import Likes from "./Likes";
import Comment from "./Comment";
import More from "./More";
import Modal from "../../../../component/Modal/Modal";

function PostDetailContent({ data, getPostDetailData }) {
    const commentInput = useRef(null);
    const [commentWrapToggle, setCommentWrapToggle] = useState(true);
    const [didLiked, setDidLiked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const displayToggle = useMemo(() => {
        return { display: commentWrapToggle ? "block" : "none" };
    }, [commentWrapToggle]);

    const { authorized, sid, account, token } = useAuth();

    const {
        sid: post_sid,
        title,
        avatar,
        created_at,
        updated_at,
        member_nickname,
        member_sid,
        topic_sid,
        content,
        likes,
        comments,
        tags,
        comment,
    } = data.rows;

    const topicName = ["未分類", "課程", "商品", "其它"];
    const timeAbout = useTimeAbout();
    const [replyTo, setReplyTo] = useState({
        cmt_sid: 0,
        member_sid: 0,
        who: "",
    });

    const {
        grid_top,
        author,
        avatar_wrap,
        info,
        nickname,
        topic,
        grey_span,
        post_content,
        toggle_a,
        content_title,
        msg_wrap,
        msg_bar,
        msg_submit,
        edit,
    } = styles;

    const svgIcon = (
        <svg
            aria-label="更多選項"
            className="_ab6-"
            color="#262626"
            fill="#262626"
            height="28"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
    );

    const commentPost = async () => {
        if (authorized) {
            if (commentInput.current.value === "") {
                commentInput.current.focus();
                return;
            }
            const data = {
                member_sid: sid,
                content: commentInput.current.value,
                post_sid,
            };
            const r = await axios.post(commentAPI, data);
            commentInput.current.value = "";
            if (r.data.success) getPostDetailData();
        } else {
            setIsOpen(true);
        }
    };

    const memberLikePost = async () => {
        if (!authorized) {
            setIsOpen(true);
            return;
        }

        const res = await axios(`${memberLikeAPI}/${post_sid}`, {
            params: { member_sid: sid },
        });

        if (res.data.liked > 0) {
            const res2 = await axios.delete(`${memberLikeAPI}/${post_sid}`, {
                data: { member_sid: sid },
            });
        } else {
            const res2 = await axios.post(`${memberLikeAPI}/${post_sid}`, {
                member_sid: sid,
            });
        }

        setDidLiked(!didLiked);
        getPostDetailData();
    };

    useEffect(() => {
        if (authorized) {
            axios(`${memberLikeAPI}/${post_sid}`, {
                params: { member_sid: sid },
            }).then((r) => {
                setDidLiked(!!r.data.liked);
            });
        }
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, [isOpen]);

    return (
        <>
            <div className={grid_top}>
                <div className={author}>
                    <div className={avatar_wrap}>
                        <img
                            src={`${avatarDIR}/${avatar || "missing-image.jpg"
                                }`}
                            alt="avatar"
                        />
                    </div>
                    <div className={info}>
                        <span className={nickname}>{member_nickname}</span>
                        <span className={grey_span}>#{member_sid}</span>
                    </div>
                    <div className="ms-auto">
                        <More>{svgIcon}</More>
                    </div>
                </div>
                <div className={post_content}>
                    <h5 className={`${content_title} mb-1`}>{title}</h5>
                    <div className="mb-3 d-flex align-items-center">
                        <span className={topic}>{topicName[topic_sid]}</span>
                        <span className={grey_span}>
                            {updated_at
                                ? `${timeAbout(updated_at)} 已編輯 `
                                : timeAbout(created_at)}
                        </span>
                    </div>
                    {/* 內文 */}
                    <p
                        className="mb-5"
                        style={{ lineHeight: "1.5rem" }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></p>

                    <div
                        className="mb-3 d-flex f-w"
                        style={{ marginLeft: "-4px" }}
                    >
                        {tags.map((v, i) => (
                            <div key={i} style={{ padding: "0 4px" }}>
                                <Tag>{v}</Tag>
                            </div>
                        ))}
                    </div>
                    <div className="mb-2 d-flex">
                        <Likes
                            likes={likes}
                            didLiked={didLiked}
                            memberLikePost={memberLikePost}
                        />
                        <span
                            className={toggle_a}
                            onClick={() =>
                                setCommentWrapToggle(!commentWrapToggle)
                            }
                        >
                            ．留言 {comments}
                        </span>
                    </div>

                    {commentWrapToggle &&
                        comment.map((v, i) => {
                            return (
                                <Comment
                                    key={i}
                                    data={v}
                                    post_sid={post_sid}
                                    replyTo={replyTo}
                                    setReplyTo={setReplyTo}
                                    getPostDetailData={getPostDetailData}
                                />
                            );
                        })}
                </div>
            </div>

            <div className={msg_wrap}>
                <input className={msg_bar} ref={commentInput} />
                <button className={msg_submit} onClick={commentPost}>
                    發佈
                </button>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} time=".4">
                <Link
                    to="/member/login"
                    style={{
                        textDecoration: "none",
                        color: "var(--BLUE)",
                        padding: "40px",
                    }}
                >
                    <h4>請先登入</h4>
                </Link>
            </Modal>
        </>
    );
}

export default PostDetailContent;