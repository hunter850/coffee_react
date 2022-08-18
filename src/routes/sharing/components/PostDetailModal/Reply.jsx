import { useState } from "react";
import axios from "axios";
import { avatarDIR, replyAPI } from "../../../../config/api-path";
import useTimeAbout from "../../../../hooks/useTimeAbout";
import { useAuth } from "../../../../component/Member/AuthContextProvider";

import styles from "./scss/Comment.module.scss";
import Modal from "../../../../component/Modal/Modal";

function Reply({ data, replyHandler, getPostDetailData, comment_sid }) {
    const [isDelete, setIsDelete] = useState(false);
    const { sid, token } = useAuth();
    const { reply_sid, member_sid, nickname, avatar, content, created_at } =
        data;

    const {
        comment_wrap,
        img_wrap,
        name_wrap,
        class_nickname,
        grey_span,
        grey_span_a,
        time_wrap,
    } = styles;

    const timeAbout = useTimeAbout();

    const deleteReply = async (sid) => {
        setIsDelete(true);
        await axios.delete(`${replyAPI}/${sid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { comment_sid },
        });

        setTimeout(() => {
            setIsDelete(false);
            getPostDetailData();
        }, 800);
    };

    return (
        <>
            <div style={{ marginLeft: "38px" }}>
                <div className={comment_wrap}>
                    <div className={img_wrap}>
                        <img
                            src={`${avatarDIR}/${avatar || "missing-image.jpg"
                                }`}
                            alt=""
                        />
                    </div>
                    <div className={name_wrap}>
                        <span className={class_nickname}>{nickname}</span>
                    </div>
                    <p>{content}</p>
                </div>
                <div className={time_wrap}>
                    <span className={`${grey_span} me-3`}>
                        {timeAbout(created_at)}
                    </span>
                    {member_sid === sid ? (
                        <>
                            <span
                                className={`${grey_span_a} me-2`}
                                onClick={() => {
                                    deleteReply(reply_sid);
                                }}
                            >
                                刪除
                            </span>
                            <span
                                className={grey_span_a}
                                onClick={() => {
                                    replyHandler(nickname);
                                }}
                            >
                                回覆
                            </span>
                        </>
                    ) : (
                        <span
                            className={grey_span_a}
                            onClick={() => {
                                replyHandler(nickname);
                            }}
                        >
                            回覆
                        </span>
                    )}
                </div>
            </div>
            <Modal
                closeButton={false}
                isOpen={isDelete}
                setIsOpen={setIsDelete}
                time={0.25}
                onClose={() => (document.body.style.overflow = "hidden")}
            >
                <span style={{ color: "var(--BLUE)", padding: ".5rem 5rem" }}>
                    刪除成功
                </span>
            </Modal>
        </>
    );
}

export default Reply;
