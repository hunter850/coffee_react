import React from "react";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import useTimeAbout from "../../../../hooks/useTimeAbout";

import { imgSrc } from "../../../../config/api-path";
import styles from "../../css/Comment.module.scss";
import Reply from "./Reply";

function Comment({ data }) {
    const { authorized, sid, account, token } = useAuth();
    const {
        member_sid,
        nickname,
        avatar,
        content,
        replies,
        reply,
        created_at,
    } = data;

    const timeAbout = useTimeAbout();

    const {
        wrap,
        comment_wrap,
        img_wrap,
        name_wrap,
        content_wrap,
        class_nickname,
        grey_span,
        time_wrap,
    } = styles;

    return (
        <div className={wrap}>
            <div className={comment_wrap}>
                <div className={img_wrap}>
                    <img src={`${imgSrc}/member/${avatar}`} alt="avatar" />
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
                    <span className={grey_span}>刪除</span>
                ) : (
                    <span className={grey_span}>回覆</span>
                )}
            </div>
            {reply && reply.map((v, i) => <Reply data={v} />)}
        </div>
    );
}

export default Comment;
