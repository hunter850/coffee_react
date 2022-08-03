import React from "react";
import { imgSrc } from "../../../../config/api-path";
import styles from "../../css/PostDetailContent.module.scss";

function PostDetailContent({ data }) {
    const {
        title,
        avatar,
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
            <div className="grid_top">
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
                    <p className="mb-3">{topicName[topic_sid]}</p>
                    <p className="mb-5">{content}</p>
                    <div className="mb-1">
                        Tags:
                        {tags.map((v, i) => (
                            <span key={i}>{v}、</span>
                        ))}
                    </div>
                    <div className="mb-1">
                        <span>Likes:{likes}</span>
                        <span>．留言:{comments}</span>
                    </div>
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur corporis quo ipsam eum, doloremque quos nulla aliquam architecto magnam totam iste officia, assumenda minus odio earum suscipit iure aspernatur ducimus?
                        Illo deserunt voluptas eum, optio consectetur, dignissimos saepe quisquam quos eius qui assumenda sequi nisi architecto, sit ex. In eaque ipsa tempora, placeat commodi alias minus magni ullam voluptatem sed?
                        Cum facilis perferendis nemo atque debitis enim quis reiciendis quibusdam consequuntur cupiditate dolorem nisi accusamus eveniet vero voluptatem earum iure similique, itaque obcaecati veniam nihil! Alias rem aliquid voluptatum accusantium!
                        Ducimus minima placeat molestiae, fuga cum veritatis repudiandae cumque blanditiis ipsam accusantium animi quam recusandae ipsum est repellat atque officia, eum dolores et! Molestias debitis, error eius quisquam dolorem nemo!
                        Repellendus autem dicta tempora aliquam consequatur placeat totam provident, facilis repudiandae fuga fugiat ipsam vitae ab assumenda natus iure, ipsum perferendis cum? Alias similique quaerat atque officia iste, illum saepe?
                    </div>
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
