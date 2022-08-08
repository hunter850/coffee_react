import styles from "./../css/postCard.module.scss";
import { sharingIMGS } from "../../../config/api-path";
import { FaHeart } from "react-icons/fa";

function PostCard({ cardData }) {
    const {
        post_card,
        post_card_fig,
        like_wrap,
        like_str,
        content_wrap,
        title_nickname,
        nickname_span,
        title_span,
        tags_wrap,
        hi,
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
    return (
        <>
            <div className={post_card}>
                <img src={`${sharingIMGS}/${img_name}`} alt={title} />
                <ul>
                    <li className={like_wrap}>
                        <FaHeart color="#fff" fontSize="1.25rem" />
                        <span className={like_str}>{likes}</span>
                    </li>
                    <li className={content_wrap}>
                        <div className={title_nickname}>
                            <span className={nickname_span}>
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
