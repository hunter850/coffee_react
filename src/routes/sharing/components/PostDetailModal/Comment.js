import React from "react";

import { imgSrc } from "../../../../config/api-path";
import styles from "../../css/Comment.module.scss";
import Reply from "./Reply";

function Comment({ data }) {
    const { member_sid, nickname, avatar, content, replies, reply } = data;

    const { wrap, comment_wrap, img_wrap, name_wrap, content_wrap } = styles;
    return (
        <div className={wrap}>
            <div className={comment_wrap}>
                <div className={img_wrap}>
                    <img src={`${imgSrc}/member/${avatar}`} alt="avatar" />
                </div>
                <div className={name_wrap}>
                    <p style={{ whiteSpace: "nowrap" }}>{nickname}</p>
                    <span>{member_sid}</span>
                </div>
                <div className={content_wrap}>
                    <span>{content}</span>
                </div>
            </div>
            {reply && reply.map((v, i) => <Reply data={v} />)}
        </div>
    );
}

export default Comment;
