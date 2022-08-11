import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./css/NewPost.module.scss";

import CancelBtn from "./components/CancelBtn";
import { wrap } from "lodash";

function NewPost({ post_sid, setTabs, windowScrollY = 0 }) {
    const { wrap, new_post, post_detail_carousel, post_detail_content } =
        styles;
    const [data, setData] = useState([]);

    const clickHandler = (e) => {
        if (e.target.id === "detailCover") {
            goPrev();
        }
    };

    const goPrev = () => {
        setTabs((pre) => {
            console.log(pre);
            return "home";
        });
        window.history.pushState({}, null, `/sharing/`);
    };

    return (
        <div
            className={wrap}
            id="detailCover"
            onClick={(e) => {
                clickHandler(e);
            }}
            style={{ top: windowScrollY }}
        >
            <div className={new_post}>
                <div className={post_detail_carousel}>123</div>

                <div className={post_detail_content}>Content</div>

                <CancelBtn goPrev={goPrev} />
            </div>
        </div>
    );
}

export default NewPost;
