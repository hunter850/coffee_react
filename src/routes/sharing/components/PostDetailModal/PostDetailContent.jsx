import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import axios from "axios";
import useTimeAbout from "../../../../hooks/useTimeAbout";
import styles from "./scss/PostDetailContent.module.scss";
import Tag from "../Tag";
import Likes from "./Likes";
import Comment from "./Comment";
import More from "./More";
import { cloneDeep } from "lodash";
import {
    avatarDIR,
    commentAPI,
    memberLikeAPI,
} from "../../../../config/api-path";

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

function PostDetailContent(props) {
    const {
        data,
        getPostDetailData,
        resetState,
        setRows,
        setLoginOpen,
        setEditMode,
    } = props;
    const commentInput = useRef(null);
    const mounted = useRef(false);
    const { authorized, token } = useAuth();
    const [commentWrapToggle, setCommentWrapToggle] = useState(true);
    const [didLiked, setDidLiked] = useState(false);
    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, [commentWrapToggle]);

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
    } = styles;

    const commentPost = async () => {
        if (authorized) {
            if (commentInput.current.value === "") {
                commentInput.current.focus();
                return;
            }
            const data = {
                content: commentInput.current.value,
                post_sid,
            };

            await axios.post(commentAPI, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            commentInput.current.value = "";
            getPostDetailData();
        } else {
            setLoginOpen(true);
        }
    };

    const memberLikePost = async () => {
        if (!authorized) {
            setLoginOpen(true);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        if (didLiked) {
            await axios.delete(`${memberLikeAPI}/${post_sid}/unlike`, config);
        } else {
            await axios.post(`${memberLikeAPI}/${post_sid}/like`, {}, config);
        }

        getPostDetailData();
    };

    useEffect(() => {
        if (authorized && mounted.current) {
            (async () => {
                const r = await axios.get(`${memberLikeAPI}/${post_sid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDidLiked(!!r.data.liked);

                setRows((pre) => {
                    const obj = cloneDeep(pre);
                    const ind = pre.findIndex((el) => el.sid === post_sid);
                    if (ind >= 0) {
                        obj[ind].liked = r.data?.liked || 0;
                        obj[ind].likes = r.data.total;
                        return obj;
                    } else {
                        return pre;
                    }
                });
            })();
        } else {
            mounted.current = true;
        }
    }, [data]);

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
                        <More
                            post_sid={post_sid}
                            member_sid={member_sid}
                            resetState={resetState}
                            setEditMode={setEditMode}
                        >
                            {svgIcon}
                        </More>
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
                        style={{ lineHeight: "1.5rem", minHeight: "4rem" }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></p>

                    <div
                        className="mb-3 d-flex f-w"
                        style={{ marginLeft: "-4px" }}
                    >
                        {tags.map((v, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "0 4px",
                                    marginBottom: "4px",
                                }}
                            >
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
                            onClick={() => {
                                if (comments > 0) {
                                    setCommentWrapToggle(!commentWrapToggle);
                                }
                            }}
                        >
                            ．{comments > 0 ? "留言" + comments : "尚未有留言"}
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

            <div
                className={msg_wrap}
                onClick={() => {
                    setReplyTo({
                        cmt_sid: 0,
                        member_sid: 0,
                        who: "",
                    });
                }}
            >
                <input className={msg_bar} ref={commentInput} />
                <button className={msg_submit} onClick={commentPost}>
                    發佈
                </button>
            </div>
        </>
    );
}

export default PostDetailContent;
