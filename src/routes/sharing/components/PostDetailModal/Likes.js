import styles from "../../css/Likes.module.scss";

function Likes({ likes, memberLikePost, didLiked }) {
    const { like_wrap, heart, liked } = styles;

    return (
        <div className={like_wrap} onClick={memberLikePost}>
            <div className={`${heart} ${didLiked && liked}`}></div>
            <span
                style={{
                    fontSize: "15px",
                    color: "#787878",
                    marginLeft: "1.7rem",
                    marginRight: ".25rem",
                }}
            >
                {likes}
            </span>
        </div>
    );
}

export default Likes;
