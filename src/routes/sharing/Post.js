import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import { throttle } from "lodash";

import { getPosts, imgSrc } from "../../config/api-path";
import NavBar from "../../component/NavBar/NavBar";

import styles from "./css/post.module.scss";
import PostCard from "./components/PostCard";
import PostNav from "./components/PostNav/index";
import PostDetailModel from "./components/PostDetailModal";

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
    const setParams = useParams();

    const [post_sid, setPost_sid] = useState(0);
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

        if (lastImg) {
            if (lastImg.getBoundingClientRect().top < 1000) {
                setGetDataTimes((pre) => pre + 1);
            }
        }
    }, 100);

    useEffect(() => {
        const pathname = window.location.pathname.replace("/sharing", "");
        if (pathname === "" || pathname === "/") {
            setPost_sid(0);
        }
    }, [window.location.pathname]);

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

    const modalHandler = (e, v) => {
        window.history.pushState({}, v.title, `/sharing/${v.sid}`);
        e.preventDefault();
        setPost_sid(v.sid);
    };

    return (
        <Fragment>
            <NavBar />
            {/* <FakeNav /> */}
            <PostNav scrollDir={scrollDir} />

            <div className={container} ref={wrap}>
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
                                    modalHandler(e, v);
                                }}
                            >
                                <PostCard cardData={v} />
                            </a>
                        );
                    })}
                </Masonry>
                {post_sid !== 0 && (
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
