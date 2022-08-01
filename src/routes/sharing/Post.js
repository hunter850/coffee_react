import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import { throttle } from "lodash";

import { getPosts, imgSrc } from "../../config/api-path";
import FakeNav from "../../component/FakeNav";
import styles from "./css/post.module.scss";
import PostCard from "./components/PostCard";
import PostNav from "./components/PostNav.js";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
};

function Post() {
    const {
        container,
        sharing_wrap,
        post_img,
        my_masonry_grid,
        my_masonry_grid_column,
    } = styles;
    const wrap = useRef(null);

    const [getDataTimes, setGetDataTimes] = useState(0);

    const [rows, setRows] = useState([]);

    const [scrollY, setScrollY] = useState([0, 0]);
    const [scrollDirect, setScrollDirect] = useState("");

    const getData = async () => {
        const r = await axios(getPosts, {
            params: { times: getDataTimes },
        });

        return r.data;
    };

    const scrollHandler = throttle((e) => {
        setScrollY((pre) => {
            const newPre = [...pre];
            newPre.shift();
            return [...newPre, window.scrollY];
        });

        const lastImg =
            wrap.current.lastElementChild.lastElementChild.lastElementChild;

        if (lastImg.getBoundingClientRect().top < 1000) {
            setGetDataTimes((pre) => pre + 1);
        }
    }, 100);

    useEffect(() => {
        (async () => {
            const r = await getData();
            setRows((pre) => {
                return [...pre, ...r.rows];
            });

            window.addEventListener("scroll", scrollHandler);
        })();

        return () => {
            // console.log("移除監聽");
            window.removeEventListener("scroll", scrollHandler);
        };
    }, [getDataTimes]);

    const scrollDir = useMemo(() => {
        if (scrollY[0] >= scrollY[1]) {
            return "up";
        } else {
            return "down";
        }
    }, [scrollY]);

    return (
        <Fragment>
            <FakeNav />
            <PostNav scrollDir={scrollDir} />
            {/* <pre style={{ marginTop: "5rem" }}>
                {JSON.stringify(rows[0], null, 2)}
            </pre> */}

            <div
                className={container}
                ref={wrap}
                style={{ paddingTop: "4rem" }}
            >
                {/* <pre>{JSON.stringify(imgAry, null, 4)}</pre> */}
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={my_masonry_grid}
                    columnClassName={my_masonry_grid_column}
                >
                    {rows.map((v, i, arr) => {
                        return (
                            <Link key={i} to={`/sharing/${v.sid}`}>
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
