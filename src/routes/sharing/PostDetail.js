import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./css/postdetail.module.scss";
import { getPosts } from "../../config/api-path";
import { useParams, useNavigate } from "react-router-dom";
import FakeNav from "../../component/FakeNav";
import { useLocation } from "react-router-dom";

function PostDetail({ windowScrollY, bodyHeight }) {
    const bh = bodyHeight || "100vh";
    const { post_detail_wrap, post_detail } = styles;
    const [data, setData] = useState([]);
    const { post_sid } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const clickHandler = (e) => {
        // console.log(e.target.id);
        if (e.target.id === "detailCover") {
            goPrev();
        }
    };

    const goPrev = () => {
        console.log("上");
        navigate(-1);
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

                <h4>windowY:{windowScrollY}</h4>
                <h4>BodyH:{bh}</h4>
            </div>
            {/* <FakeNav /> */}
        </div>
    );
}

export default PostDetail;
