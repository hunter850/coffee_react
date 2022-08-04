import React from "react";
import { imgSrc } from "../../../../config/api-path";
import styles from "../../css/PostDetailContent.module.scss";

import Tag from "./Tag";
import Likes from "./Likes";

function PostDetailContent({ data }) {
    const {
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
    } = data.rows;
    const topicName = ["未分類", "課程", "商品", "其它"];

    const {
        grid_top,
        author,
        avatar_wrap,
        info,
        nickname,
        grey_span,
        post_content,
        content_title,
        msg_wrap,
        msg_bar,
        msg_submit,
    } = styles;
    return (
        <>
            <div className={grid_top}>
                <div className={author}>
                    <div className={avatar_wrap}>
                        <img src={`${imgSrc}/member/${avatar}`} alt="avatar" />
                    </div>
                    <div className={info}>
                        <p className={nickname}>{member_nickname}</p>
                        <span className={grey_span}>#{member_sid}</span>
                    </div>
                </div>
                <div className={post_content}>
                    <h5 className={`${content_title} mb-1`}>{title}</h5>
                    <div className="mb-3 d-flex align-items-center">
                        <span className="me-3" style={{ color: "#324A59" }}>
                            {topicName[topic_sid]}
                        </span>
                        <span
                            className={grey_span}
                            style={{ fontSize: "14px" }}
                        >
                            {updated_at
                                ? `已編輯 ${updated_at.slice(0, 10)}`
                                : { created_at }}
                        </span>
                    </div>
                    {/* 內文 */}
                    <p className="mb-5">{content}{content}{content}{content}{content}{content}{content}{content}{content}</p>
                    <div className="mb-2 d-flex f-w">
                        {tags.map((v, i) => (
                            <Tag key={i} tagName={v} />
                        ))}
                    </div>
                    <div className="mb-1">
                        <Likes likes={likes} />
                        <span>．留言:{comments}</span>
                    </div>
                    <div></div>
                    {/* <pre>{JSON.stringify(data.rows, null, 4)}</pre> */}
                </div>
            </div>

            <div className={msg_wrap}>
                <input className={msg_bar}></input>

                <span
                    className={`${msg_submit} mx-auto`}
                    style={{ width: "3rem" }}
                >
                    發佈
                </span>
            </div>
        </>
    );
}

export default PostDetailContent;
