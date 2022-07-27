// import { wrap } from "lodash";
import { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";

import { getPosts, imgSrc } from "../../config/api-path";
import FakeNav from "../../component/FakeNav";
import styles from "./css/sharing.module.scss";
import PostCard from "./components/PostCard";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
};

function Post() {
    const { sharing_wrap, post_img, my_masonry_grid, my_masonry_grid_column } =
        styles;
    const wrap = useRef(null);

    const [rows, setRows] = useState([]);

    const getData = async () => {
        const r = await axios(getPosts);

        setRows(r.data.rows);
    };

    const scrollHandler = (e) => {
        const lastImg =
            wrap.current.lastElementChild.lastElementChild.lastElementChild;
        console.log(lastImg.getBoundingClientRect().top);

        if (lastImg.getBoundingClientRect().top < 1000) {
            console.log("加載");
            setRows((pre) => {
                return [...pre, ...pre];
            });
        }
    };

    useEffect(() => {
        getData();
        window.addEventListener("scroll", scrollHandler);

        return () => {
            window.removeEventListener(scrollHandler);
        };
    }, []);

    return (
        <Fragment>
            <FakeNav />
            <h2>分享牆</h2>
            <pre>{JSON.stringify(rows[0], null, 4)}</pre>

            <div style={{ maxWidth: "1440px", margin: "0 auto" }} ref={wrap}>
                {/* <pre>{JSON.stringify(imgAry, null, 4)}</pre> */}
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={my_masonry_grid}
                    columnClassName={my_masonry_grid_column}
                >
                    {rows.map((v, i) => {
                        return (
                            <Link key={i} to={`/sharing/post/${v.sid}`}>
                                <PostCard cardData={v} />
                            </Link>
                        );
                    })}
                </Masonry>
            </div>
        </Fragment>
    );
}

export default Post;
