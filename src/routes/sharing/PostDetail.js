import { useEffect, useState } from "react";

import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { getPostById } from "../../config/api-path";

function PostDetail() {
    const [data, setData] = useState([]);
    const [searchParams] = useSearchParams();

    const config = {
        params: { page: searchParams.get("page") },
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
    };

    useEffect(() => {
        (async () => {
            const r = axios(getPostById);
        })();
    }, []);

    return (
        <>
            <h2>detail</h2>
            <p>searchParams{searchParams.get("id")}</p>
        </>
    );
}

export default PostDetail;
