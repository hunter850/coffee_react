import styles from "./scss/Likes.module.scss";

function Likes({ likes, memberLikePost, didLiked }) {
    const { like_wrap, container, heart, liked } = styles;

    return (
        <div className={like_wrap} onClick={memberLikePost}>
            <div className={container}>
                <div className={`${heart} ${didLiked ? liked : ""}`}></div>
            </div>
            <span
                style={{
                    fontSize: "15px",
                    color: "#787878",
                    marginLeft: "1.75rem",
                    marginRight: ".25rem",
                }}
            >
                {likes}
            </span>
        </div>
    );
}

export default Likes;
