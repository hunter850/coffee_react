import { useEffect, useState } from "react";
import axios from "axios";

import styles from "../../css/postdetailmodal.module.scss";
import PostDeatailCarousel from "./PostDetailCarousel";
import { getPosts, searchPost } from "../../../../config/api-path";
import { useNavigate } from "react-router-dom";
import CancelBtn from "./CancelBtn";
import PostDetailContent from "./PostDetailContent";

function PostDetailModal({ post_sid, setPost_sid, windowScrollY = 0 }) {
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
        setPost_sid(0);
        window.history.pushState({}, null, `/sharing/`);
    };

    const getPostDetailData = () => {
        axios(`${getPosts}/${post_sid}`).then((r) => {
            if (r.data.code !== 200) {
                setPost_sid(0);
                navigate("/sharing");
            }
            setData(r.data);
        });
    };

    useEffect(() => {
        // (async () => {
        //     const r = await axios(`${getPosts}/${post_sid}`);

        //     if (r.data.code !== 200) {
        //         setPost_sid(0);
        //         navigate("/sharing");
        //     }
        //     setData(r.data);
        // })();
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
                        />
                    )}
                </div>

                <CancelBtn goPrev={goPrev} />
            </div>
        </div>
    );
}

export default PostDetailModal;
