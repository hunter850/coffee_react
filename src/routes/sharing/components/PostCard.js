function PostCard({ cardData }) {
    //     "tags": [
    //         {
    //             "sid": 2,
    //             "post_sid": 1,
    //             "tag_sid": 2,
    //             "name": "拉花",
    //             "times": 8
    //         },
    //         {
    //             "sid": 3,
    //             "post_sid": 1,
    //             "tag_sid": 3,
    //             "name": "好有趣阿",
    //             "times": 2
    //         },
    //         {
    //             "sid": 4,
    //             "post_sid": 1,
    //             "tag_sid": 4,
    //             "name": "拉花好好玩",
    //             "times": 2
    //         }
    //     ]

    const {
        sid,
        title,
        img_name,
        member_nickname,
        member_sid,
        likes,
        tags,
        topic_sid,
        avatar,
    } = cardData;
    return (
        <>
            <div>
                <img
                    src={`http://localhost:3500/images/sharing/${img_name}`}
                    alt={title}
                />
            </div>
        </>
    );
}

export default PostCard;
