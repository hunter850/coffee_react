import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./../css/postdetailmodel.module.scss";
import { getPosts } from "../../../config/api-path";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PostDetailModel({ post_sid, setPost_sid, windowScrollY }) {
    const { post_detail_wrap, post_detail } = styles;
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = (e) => {
        // console.log(e.target.id);
        if (e.target.id === "detailCover") {
            goPrev();
        }
    };

    const goPrev = () => {
        setPost_sid(0);
        window.history.pushState({}, null, `/sharing/`);
        console.log("上");
        // navigate(-1);
    };

    useEffect(() => {
        console.log(location);
    }, [location]);

    useEffect(() => {
        (async () => {
            console.log(getPosts, post_sid);
            const r = await axios(`${getPosts}/${post_sid}`);

            if (r.data.code !== 200) {
                console.log("first");
                navigate("/sharing");
            }
            setData(r.data);
        })();
    }, []);

    if (!post_sid) return <></>;
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
                <h2>detail</h2>
                <p>searchParams{post_sid}</p>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </div>
            {/* <FakeNav /> */}
        </div>
    );
}

export default PostDetailModel;
