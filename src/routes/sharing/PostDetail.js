import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { getPosts } from "../../config/api-path";

function PostDetail() {
    const [data, setData] = useState([]);
    const { post_sid } = useParams();

    // const config = {
    //     params: { page: searchParams.get("page") },
    //     // headers: {
    //     //     Authorization: `Bearer ${token}`,
    //     // },
    // };

    useEffect(() => {
        (async () => {
            const r = axios(`${getPosts}/${post_sid}`);
            setData(r.data);
        })();
    }, []);

    return (
        <>
            <h2>detail</h2>
            <p>searchParams{post_sid}</p>
        </>
    );
}

export default PostDetail;
