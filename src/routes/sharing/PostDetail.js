import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./css/postdetail.module.scss";
import { getPosts } from "../../config/api-path";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";

function PostDetail() {
    const [data, setData] = useState([]);
    const { post_sid } = useParams();
    const navigate = useNavigate();

    const clickHandler = (e) => {
        if (e.target.id === "goPrev") {
            goPrev();
        }
    };

    const goPrev = () => {
        navigate(-1);
    };

    useEffect(() => {
        (async () => {
            const r = await axios(`${getPosts}/${post_sid}`);

            if (r.data.code !== 200) {
                navigate("/sharing");
            }
            setData(r.data);
        })();
    }, []);

    return (
        <>
            <NavBar />
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
