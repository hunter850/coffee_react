import { useRef, useCallback, useEffect } from "react";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import axios from "axios";
import useTimeAbout from "../../../../hooks/useTimeAbout";

import { avatarDIR, replyAPI, commentAPI } from "../../../../config/api-path";
import styles from "../../css/Comment.module.scss";
import Reply from "./Reply";

const emptyObj = {
    cmt_sid: 0,
    member_sid: 0,
    who: "",
};

function Comment({ data, getPostDetailData, replyTo, setReplyTo, post_sid }) {
    const { authorized, sid, account, token } = useAuth();
    const {
        member_sid,
        comment_sid,
        nickname,
        avatar,
        content,
        replies,
        reply,
        created_at,
    } = data;

    const {
        wrap,
        comment_wrap,
        img_wrap,
        name_wrap,
        content_wrap,
        class_nickname,
        grey_span,
        grey_span_a,
        time_wrap,
        reply_input_wrap,
        reply_input,
        reply_button,
    } = styles;

    const timeAbout = useTimeAbout();
    const replyInput = useRef(null);

    const replyHandler = (toWho) => {
        if (!sid) {
            alert("請先登入");
            return;
        }

        setReplyTo((pre) => {
            const newObj = { ...pre };
            newObj.cmt_sid = comment_sid;
            newObj.member_sid = sid;
            newObj.who = toWho;

            return newObj;
        });
    };

    useEffect(() => {
        if (replyTo.cmt_sid > 0 && replyInput.current) {
            replyInput.current.focus();
            replyInput.current.setAttribute("placeholder", "@" + replyTo.who);
        }
    }, [replyTo.who]);

    const replyPost = async () => {
        if (authorized) {
            if (replyInput.current.value === "") {
                replyInput.current.focus();
                return;
            }

            const data = {
                member_sid: replyTo.member_sid,
                comment_sid: replyTo.cmt_sid,
                content: replyInput.current.value,
            };
            const r = await axios.post(replyAPI, data);
            alert("回覆成功");
            getPostDetailData();

            setReplyTo(emptyObj);
        } else {
            alert("請先登入");
        }
    };

    const commentDelete = async () => {
        const data = {
            comment_sid,
            post_sid,
        };
        const r = await axios.delete(commentAPI, { data });

        if (r.data.success) getPostDetailData();
    };

    return (
        <div className={wrap}>
            <div className={comment_wrap}>
                <div className={img_wrap}>
                    <img
                        src={`${avatarDIR}/${avatar || "missing-image.jpg"}`}
                        alt="avatar"
                    />
                </div>
                <div className={name_wrap}>
                    <span className={class_nickname}>{nickname}</span>
                </div>
                <div className={content_wrap}>
                    <span>{content}</span>
                </div>
            </div>
            <div className={time_wrap}>
                <span className={`${grey_span} me-3`}>
                    {timeAbout(created_at)}
                </span>
                {member_sid === sid ? (
                    <>
                        <span
                            className={`${grey_span_a} me-2`}
                            onClick={commentDelete}
                        >
                            刪除
                        </span>
                        <span
                            className={grey_span_a}
                            onClick={() => replyHandler(nickname)}
                        >
                            回覆
                        </span>
                    </>
                ) : (
                    <span
                        className={grey_span_a}
                        onClick={() => replyHandler(nickname)}
                    >
                        回覆
                    </span>
                )}
            </div>
            {reply &&
                reply.map((v, i) => (
                    <Reply
                        key={i}
                        data={v}
                        replyHandler={replyHandler}
                        getPostDetailData={getPostDetailData}
                        comment_sid={comment_sid}
                    />
                ))}
            {/*replyTo state有值才出現input */}
            {replyTo.cmt_sid === comment_sid && (
                <div className={reply_input_wrap}>
                    <input
                        type="text"
                        className={reply_input}
                        name=""
                        placeholder={`@${nickname}`}
                        ref={replyInput}
                    />
                    <span
                        className={reply_button}
                        onClick={() => {
                            setReplyTo(emptyObj);
                        }}
                    >
                        取消
                    </span>
                    <span className={reply_button} onClick={replyPost}>
                        發送
                    </span>
                </div>
            )}
        </div>
    );
}

export default Comment;
