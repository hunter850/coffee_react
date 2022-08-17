import { useEffect, useState } from "react";
import axios from "axios";

import PostDeatailCarousel from "./PostDetailCarousel";
import { getPosts, searchPost } from "../../../../config/api-path";
import { useNavigate } from "react-router-dom";
import CancelBtn from "../CancelBtn";
import PostDetailContent from "./PostDetailContent";
import styles from "./scss/PostDetailModal.module.scss";

function PostDetailModal({
    modal_sid,
    setModal_sid,
    windowScrollY = 0,
    resetState,
}) {
    const {
        post_detail_wrap,
        post_detail,
        post_detail_carousel,
        post_detail_content,
    } = styles;
    const [data, setData] = useState([]);

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
        axios(`${getPosts}/${modal_sid}}`).then((r) => {
            if (r.data.code !== 200) {
                setModal_sid(0);
                navigate("/sharing");
            }
            setData(r.data);
        });
    };

    useEffect(() => {
        getPostDetailData();
    }, []);

    return (
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
                    {data.rows && <PostDeatailCarousel imgs={data.rows.imgs} />}
                </div>

                <div className={post_detail_content}>
                    {data.rows && (
                        <PostDetailContent
                            data={data}
                            getPostDetailData={getPostDetailData}
                            resetState={resetState}
                        />
                    )}
                </div>

                <CancelBtn goPrev={goPrev} />
            </div>
        </div>
    );
}

export default PostDetailModal;
