import { useEffect, useState } from "react";
import axios from "axios";

import { getPosts } from "../../config/api-path";
import { useParams, useNavigate } from "react-router-dom";
import FakeNav from "../../component/FakeNav";

function PostDetail() {
    const [data, setData] = useState([]);
    const { post_sid } = useParams();
    const navigate = useNavigate();

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

    return (
        <>
            <FakeNav />
            <h2>detail</h2>
            <p>searchParams{post_sid}</p>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </>
    );
}

export default PostDetail;
