import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { putPostAPI } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import Modal from "../../../../component/Modal/Modal";
import styles from "./scss/More.module.scss";

function More(props) {
    const { children, post_sid, member_sid, resetState } = props;
    const modalRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const { token } = useAuth();
    const { option } = styles;
    const navigate = useNavigate();

    const handleCopy = () => {
        window.navigator.clipboard.writeText(window.location.href);
        setIsCopy(true);
        setIsOpen(false);
        setTimeout(() => {
            setIsCopy(false);
        }, 1000);
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
        // const r = await axios.put(
        //     putPostAPI,
        //     { post_sid, member_sid },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     }
        // );
        // console.log(r);
        modalRef.current.style.cursor = "wait";
        setTimeout(() => {
            resetState();
            modalRef.current.style.cursor = "auto";
        }, 2000);
    };

    return (
        <>
            <div
                style={{
                    padding: "0 .75rem",
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
                    <span className={option}>編輯文章</span>
                    <span
                        className={option}
                        style={{ color: "#F62929" }}
                        onClick={() => handleDelete()}
                    >
                        刪除文章
                    </span>
                    <span className={option} onClick={() => handleShare()}>
                        分享至Facebook
                    </span>
                    <span className={option} onClick={() => handleCopy()}>
                        複製文章連結
                    </span>
                    <span className={option} onClick={() => setIsOpen(false)}>
                        取消
                    </span>
                </Modal>
            </dir>
            <Modal
                closeButton={false}
                isOpen={isCopy}
                setIsOpen={setIsCopy}
                time={0.25}
                onClose={() => (document.body.style.overflow = "hidden")}
            >
                <span style={{ color: "var(--BLUE)", padding: ".5rem 5rem" }}>
                    已複製到剪貼簿
                </span>
            </Modal>
        </>
    );
}

export default More;
