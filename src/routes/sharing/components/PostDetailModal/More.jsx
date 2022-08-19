import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { postModified } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import Modal from "../../../../component/Modal/Modal";
import styles from "./scss/More.module.scss";
import MySpinner from "../MySpinner";
import { set } from "lodash";

function More(props) {
    const { children, post_sid, member_sid, resetState, setEditMode } = props;
    const modalRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const { sid, token } = useAuth();
    const { option } = styles;

    const handleCopy = () => {
        window.navigator.clipboard.writeText(window.location.href);
        // setIsOpen(false);
        setIsCopy(true);
        setTimeout(() => {
            setIsCopy(false);
            setIsOpen(false);
        }, 800);
    };

    const handleShare = () => {
        const url = window.location.href;
        window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" + url,
            "facebook-share-dialog",
            "width=800,height=600"
        );
    };

    const handleDelete = async () => {
        const r = await axios.put(
            `${postModified}/${post_sid}`,
            { member_sid },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        modalRef.current.style.cursor = "wait";
        setIsDelete(true);
        setTimeout(() => {
            setIsDelete(false);
            modalRef.current.style.cursor = "auto";
            resetState();
        }, 1000);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    return (
        <>
            <div
                style={{
                    padding: "0 1.25rem 0 .75rem",
                    cursor: "pointer",
                }}
                onClick={() => setIsOpen(true)}
            >
                {children}
            </div>
            <dir ref={modalRef}>
                <Modal
                    onClose={() => (document.body.style.overflow = "hidden")}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    time={0.25}
                    closeButton={false}
                >
                    {/* TODO:不是作者不顯示 */}
                    {isCopy !== true ? (
                        <>
                            {sid === member_sid && (
                                <>
                                    <span
                                        className={option}
                                        onClick={() => handleEdit()}
                                    >
                                        編輯文章
                                    </span>
                                    <span
                                        className={option}
                                        style={{ color: "#F62929" }}
                                        onClick={() => handleDelete()}
                                    >
                                        刪除文章
                                    </span>
                                </>
                            )}
                            <span
                                className={option}
                                onClick={() => handleShare()}
                            >
                                分享至Facebook
                            </span>
                            <span
                                className={option}
                                onClick={() => handleCopy()}
                            >
                                複製文章連結
                            </span>
                            <span
                                className={option}
                                onClick={() => setIsOpen(false)}
                            >
                                取消
                            </span>
                            {isDelete === true && <MySpinner />}
                        </>
                    ) : (
                        <span
                            style={{
                                color: "var(--BLUE)",
                                padding: ".5rem 5rem",
                            }}
                        >
                            已複製到剪貼簿
                        </span>
                    )}
                </Modal>
            </dir>
        </>
    );
}

export default More;
