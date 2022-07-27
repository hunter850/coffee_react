import { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import { debounce } from "lodash";

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
    const refTimes = useRef(null);

    const [getDataTimes, setGetDataTimes] = useState(0);
    refTimes.current = getDataTimes;

    const [rows, setRows] = useState([]);

    const getData = async () => {
        setGetDataTimes((pre) => {
            console.log(pre);
            return pre + 1;
        });

        const r = await axios(getPosts, {
            params: { times: refTimes.current },
        });

        // setGetDataTimes(getDataTimes + 1);

        console.log("await", refTimes.current);

        return r.data;
    };

    const scrollHandler = async (e) => {
        const lastImg =
            wrap.current.lastElementChild.lastElementChild.lastElementChild;

        if (lastImg.getBoundingClientRect().top < 1000) {
            console.log("加載");

            const r = await getData();

            setRows((pre) => {
                return [...pre, ...r.rows];
            });
        }
    };

    useEffect(() => {
        (async () => {
            const r = await getData();
            console.log(r);
            setRows(r.rows);
        })();
        window.addEventListener("scroll", debounce(scrollHandler, 100));

        return () => {
            window.removeEventListener("scroll", debounce(scrollHandler, 100));
        };
    }, []);

    useEffect(() => {
        // setGetDataTimes((pre) => {
        //     console.log(pre);
        //     return pre + 1;
        // });
    }, [rows]);

    return (
        <Fragment>
            <FakeNav />
            <h2>分享牆</h2>
            <pre>{JSON.stringify(rows[0], null, 2)}</pre>

            <div
                style={{
                    maxWidth: "1440px",
                    margin: "0 auto",
                    padding: "0 8px",
                }}
                ref={wrap}
            >
                {/* <pre>{JSON.stringify(imgAry, null, 4)}</pre> */}
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={my_masonry_grid}
                    columnClassName={my_masonry_grid_column}
                >
                    {rows.map((v, i, arr) => {
                        const q = arr.length;
                        return (
                            <Link key={i} to={`/sharing/${v.sid}`}>
                                <PostCard cardData={v} />
                                <span>
                                    index:{i},{q}
                                </span>
                            </Link>
                        );
                    })}
                </Masonry>
            </div>
        </Fragment>
    );
}

export default Post;
