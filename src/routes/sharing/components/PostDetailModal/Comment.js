import React from "react";

import { imgSrc } from "../../../../config/api-path";
import styles from "../../css/Comment.module.scss";
import Reply from "./Reply";

function Comment({ data }) {
    const { member_sid, nickname, avatar, content, replies, reply } = data;

    const { wrap, comment_wrap, img_wrap } = styles;
    return (
        <div className={wrap}>
            <div className={comment_wrap}>
                <div className={img_wrap}>
                    <img
                        src={`${imgSrc}/member/${avatar}`}
                        width="32"
                        alt="avatar"
                    />
                </div>
                <div>
                    <p style={{ whiteSpace: "nowrap" }}>{nickname}</p>
                    <span>{member_sid}</span>
                </div>
                <div>
                    <span>{content}</span>
                </div>
            </div>
            {reply && reply.map((v, i) => <Reply data={v} />)}
        </div>
    );
}

export default Comment;
