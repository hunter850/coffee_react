import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../../component/Modal/Modal";

const mapArray = [
    { name: "編輯文章" },
    { name: "刪除文章" },
    { name: "分享文章" },
    { name: "複製文章連結" },
];

function More({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, [isOpen]);

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
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                time=".4"
                closeButton={false}
            >
                {mapArray.map((v, i) => {
                    return (
                        <Link
                            key={i}
                            to="/member/login"
                            style={{
                                textDecoration: "none",
                                color: "var(--BLUE)",
                                padding: ".5rem 2.5rem",
                            }}
                        >
                            {v.name}
                        </Link>
                    );
                })}
                <Link
                    to="/member/login"
                    style={{
                        textDecoration: "none",
                        color: "var(--BLUE)",
                        padding: ".5rem 2.5rem",
                    }}
                >
                    取消
                </Link>
                ;
            </Modal>
        </>
    );
}

export default More;
