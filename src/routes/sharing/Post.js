import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import { throttle } from "lodash";

import { useAuth } from "../../component/Member/AuthContextProvider";
import { getPosts, searchPost } from "../../config/api-path";
import NavBar from "../../component/NavBar/NavBar";

import styles from "./css/post.module.scss";
import PostCard from "./components/PostCard";
import PostNav from "./components/PostNav/index";
import PostDetailModel from "./components/PostDetailModal";
import Footer from "../../component/Footer";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
};

function Post() {
    const { authorized, sid, account, token } = useAuth();
    const { container, my_masonry_grid, my_masonry_grid_column } = styles;
    const wrap = useRef(null);
    const mounted = useRef(false);
    const mounted_K = useRef(false);
    const param = useParams();

    const [searchMode, setSearchMode] = useState("");
    const [post_sid, setPost_sid] = useState(param.post_sid || 0);
    const [getDataTimes, setGetDataTimes] = useState(0);
    const [keyWord, setKeyWord] = useState("");
    const [isEnd, setIsEnd] = useState(false);

    const [rows, setRows] = useState([]);

    const [scrollY, setScrollY] = useState([0, 0]);

    const getData = async (times = 0) => {
        if (!searchMode) {
            const r = await axios(getPosts, {
                params: { times, auth: sid },
            });
            return r.data;
        } else {
            if (isEnd) return { row: [] };
            const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/;
            const replaced = keyWord.replace(pattern, "").trim();

            const r = await axios(searchPost, {
                params: { times, q: replaced, auth: sid },
            });
            if (r.data.isEnd) setIsEnd(true);
            return r.data;
        }
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
        // DidUpdate轉換狀態才清rows
        if (mounted.current) {
            (async () => {
                setRows([]);
                // setGetDataTimes(0);
                if (!searchMode) {
                    const r = await getData(getDataTimes);
                    if (r.success) {
                        setRows(r.rows);
                    }
                }
            })();
        } else {
            mounted.current = true;
        }
    }, [searchMode]);

    // useEffect(() => {
    //     const pathname = window.location.pathname.replace("/sharing", "");
    //     if (pathname === "" || pathname === "/") {
    //         setPost_sid(0);
    //     }
    // }, [window.location.pathname]);

    useEffect(() => {
        if (mounted_K.current) {
            setGetDataTimes(0);
        } else {
            mounted_K.current = true;
        }
    }, [keyWord]);

    useEffect(() => {
        if (post_sid) {
            document.querySelector("body").style.overflow = "hidden";
        } else {
            document.querySelector("body").style.overflow = "visible";
        }
    }, [post_sid]);

    useEffect(() => {
        (async () => {
            const r = await getData(getDataTimes);

            if (r.success) {
                setRows((pre) => {
                    return [...pre, ...r.rows];
                });
            }

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

    const chooseToSearch = (v) => {
        const { name, sid, type, member_sid } = v;
        const params = { q: sid || member_sid, type };

        if (name) {
            setKeyWord(name);
        }
        setIsEnd(false);
        setSearchMode("choose");

        axios(searchPost, { params }).then((r) => {
            if (r.data.success) {
                setRows(r.data.rows);
                if (r.data.isEnd) setIsEnd(true);
            }
        });
    };

    return (
        <Fragment>
            <NavBar />
            <PostNav
                scrollDir={scrollDir}
                rows={rows}
                setRows={setRows}
                setSearchMode={setSearchMode}
                keyWord={keyWord}
                setKeyWord={setKeyWord}
                setIsEnd={setIsEnd}
                setGetDataTimes={setGetDataTimes}
                chooseToSearch={chooseToSearch}
            />

            <div className={container} ref={wrap}>
                <h1 className="mt-5">mode:{searchMode}</h1>
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
                                <PostCard
                                    cardData={v}
                                    modalMode={post_sid}
                                    chooseToSearch={chooseToSearch}
                                />
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
            <Footer />
        </Fragment>
    );
}

export default Post;
