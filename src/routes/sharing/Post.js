import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import { throttle } from "lodash";

import { getPosts, imgSrc } from "../../config/api-path";
import FakeNav from "../../component/FakeNav";
import styles from "./css/post.module.scss";
import PostCard from "./components/PostCard";
import PostNav from "./components/PostNav.js";
import PostDetailModel from "./components/PostDetailModel";

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
        fake_a,
    } = styles;
    const wrap = useRef(null);
    let location = useLocation();

    const [post_sid, setPost_sid] = useState(0);
    const [getDataTimes, setGetDataTimes] = useState(0);

    const [rows, setRows] = useState([]);

    const [scrollY, setScrollY] = useState([0, 0]);
    const [scrollDirect, setScrollDirect] = useState("");

    const bodyHeight = useRef(null);

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

        if (lastImg) {
            if (lastImg.getBoundingClientRect().top < 1000) {
                setGetDataTimes((pre) => pre + 1);
            }
        }
    }, 100);

    useEffect(() => {
        if (post_sid) {
            document.querySelector("body").style.overflow = "hidden";
        } else {
            document.querySelector("body").style.overflow = "visible";
        }
    }, [post_sid]);

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
        bodyHeight.current = document.body.scrollHeight;

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
            <div className={container} ref={wrap}>
                {/* pid:{location} */}
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={my_masonry_grid}
                    columnClassName={my_masonry_grid_column}
                >
                    {rows.map((v, i) => {
                        return (
                            <a
                                key={i}
                                href={`/sharing/${v.sid}`}
                                onClick={(e) => {
                                    window.history.pushState(
                                        {},
                                        v.title,
                                        `/sharing/${v.sid}`
                                    );
                                    e.preventDefault();
                                    setPost_sid(v.sid);
                                }}
                            >
                                <PostCard cardData={v} />
                            </a>
                        );
                    })}
                </Masonry>
                {post_sid && (
                    <PostDetailModel
                        post_sid={post_sid}
                        setPost_sid={setPost_sid}
                        windowScrollY={scrollY[1]}
                    />
                )}
            </div>
        </Fragment>
    );
}

export default Post;
