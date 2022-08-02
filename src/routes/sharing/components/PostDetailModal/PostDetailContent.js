import React from "react";
import { imgSrc } from "../../../../config/api-path";
import styles from "../../css/PostDetailContent.module.scss";

function PostDetailContent({ data }) {
    const { title, avatar, member_nickname, member_sid } = data.rows;
    const { author, avatar_wrap, info } = styles;
    return (
        <>
            <div className={author}>
                <div className={avatar_wrap}>
                    <img src={`${imgSrc}/member/${avatar}`} alt="avatar" />
                </div>
                <div className={info}>
                    <p>{member_nickname}</p>
                    <p>{member_sid}</p>
                </div>
            </div>

            <h5 style={{ clear: "both" }}>{title}</h5>
            <pre>{JSON.stringify(data.rows, null, 4)}</pre>
        </>
    );
}

export default PostDetailContent;
