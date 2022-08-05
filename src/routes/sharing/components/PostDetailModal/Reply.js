import useTimeAbout from "../../../../hooks/useTimeAbout";
import { useAuth } from "../../../../component/Member/AuthContextProvider";

import styles from "../../css/Comment.module.scss";
import { imgSrc } from "../../../../config/api-path";

function Reply({ data }) {
    const { authorized, sid, account, token } = useAuth();
    const { member_sid, nickname, avatar, content, created_at } = data;

    const {
        comment_wrap,
        img_wrap,
        name_wrap,
        class_nickname,
        grey_span,
        time_wrap,
    } = styles;

    const timeAbout = useTimeAbout();

    const { } = styles;

    return (
        <div style={{ marginLeft: "38px" }}>
            <div className={comment_wrap}>
                <div className={img_wrap}>
                    <img src={`${imgSrc}/member/${avatar}`} alt="" />
                </div>
                <div className={name_wrap}>
                    <spa className={class_nickname}>{nickname}</spa>
                </div>
                <p>{content}</p>
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
        </div>
    );
}

export default Reply;
