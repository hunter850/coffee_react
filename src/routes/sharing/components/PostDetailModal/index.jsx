import { useEffect, useState } from "react";
import axios from "axios";

import PostDeatailCarousel from "./PostDetailCarousel";
import { getPosts, searchPost } from "../../../../config/api-path";
import { Link, useNavigate } from "react-router-dom";
import CancelBtn from "../CancelBtn";
import PostDetailContent from "./PostDetailContent";
import styles from "./scss/PostDetailModal.module.scss";
import Modal from "../../../../component/Modal/Modal";
import EditContent from "./EditContent";

function PostDetailModal({
    modal_sid,
    setModal_sid,
    windowScrollY = 0,
    resetState,
    setRows,
}) {
    const {
        post_detail_wrap,
        post_detail,
        post_detail_carousel,
        post_detail_content,
    } = styles;
    const [data, setData] = useState([]);
    const [loginOpen, setLoginOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const clickHandler = (e) => {
        if (e.target.id === "detailCover") {
            goPrev();
        }
    };

    const goPrev = () => {
        setModal_sid(0);
        window.history.pushState({}, null, `/sharing/`);
    };

    const getPostDetailData = () => {
        axios(`${getPosts}/${modal_sid}`).then((r) => {
            if (r.data.code !== 200) {
                setModal_sid(0);
                navigate("/sharing");
            }
            setData(r.data);
        });
    };

    useEffect(() => {
        getPostDetailData();
    }, [editMode]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, [data, editMode]);

    return (
        <>
            <div
                className={post_detail_wrap}
                id="detailCover"
                onClick={(e) => {
                    clickHandler(e);
                }}
                style={{ top: windowScrollY }}
            >
                <div className={post_detail}>
                    <div className={post_detail_carousel}>
                        {data.rows && (
                            <PostDeatailCarousel imgs={data.rows.imgs} />
                        )}
                    </div>
                    {!editMode ? (
                        <div className={post_detail_content}>
                            {data.rows && (
                                <PostDetailContent
                                    data={data}
                                    getPostDetailData={getPostDetailData}
                                    resetState={resetState}
                                    setRows={setRows}
                                    setLoginOpen={setLoginOpen}
                                    setEditMode={setEditMode}
                                />
                            )}
                        </div>
                    ) : (
                        <EditContent setEditMode={setEditMode} data={data} />
                    )}

                    <CancelBtn goPrev={goPrev} />
                </div>
            </div>
            <Modal
                isOpen={loginOpen}
                setIsOpen={setLoginOpen}
                time=".4"
                onClose={() => (document.body.style.overflow = "hidden")}
            >
                <Link
                    to="/member/login"
                    style={{
                        textDecoration: "none",
                        color: "var(--BLUE)",
                        padding: "40px",
                    }}
                >
                    <h4>請先登入</h4>
                </Link>
            </Modal>
        </>
    );
}

export default PostDetailModal;
