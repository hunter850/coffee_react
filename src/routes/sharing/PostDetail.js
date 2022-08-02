import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./css/postdetail.module.scss";
import { getPosts } from "../../config/api-path";
import { useParams, useNavigate } from "react-router-dom";
import FakeNav from "../../component/FakeNav";

function PostDetail() {
    const [data, setData] = useState([]);
    const { post_sid } = useParams();
    const navigate = useNavigate();

    const clickHandler = (e) => {
        // console.log(e.target.id);
        if (e.target.id === "goPrev") {
            goPrev();
        }
    };

    const goPrev = () => {
        console.log("上");
        navigate(-1);
    };

    useEffect(() => {
        (async () => {
            // console.log(getPosts, post_sid);
            const r = await axios(`${getPosts}/${post_sid}`);

            if (r.data.code !== 200) {
                // console.log("first");
                navigate("/sharing");
            }
            setData(r.data);
        })();
    }, []);

    return (
        <>
            <FakeNav />
            <div>
                <button id="goPrev" onClick={(e) => clickHandler(e)}>goPrev</button>
                <h2>detail</h2>
                <p>searchParams{post_sid}</p>
                <pre>{JSON.stringify(data, null, 4)}</pre>
            </div>
        </>
    );
}

export default PostDetail;
