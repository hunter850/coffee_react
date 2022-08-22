import {
    Fragment,
    useEffect,
    useState,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import { throttle } from "lodash";

import { useAuth } from "../../component/Member/AuthContextProvider";
import { useTabsHistory } from "../../Contexts/TabsHistoryProvider";
import { getPosts, searchPost } from "../../config/api-path";
import NavBar from "../../component/NavBar/NavBar";

import PostCard from "./components/PostCard";
import PostNav from "./components/PostNav/index";
import PostDetailModel from "./components/PostDetailModal";
import Footer from "../../component/Footer";
import NewPost from "./NewPost";
import Modal from "../../component/Modal/Modal";
import styles from "./scss/Post.module.scss";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
};

function Post({ newPost }) {
    const { sid: mySid, token } = useAuth();
    const { nowTabs, pushTabs } = useTabsHistory();

    const { container, my_masonry_grid, my_masonry_grid_column, loader } =
        styles;
    const wrap = useRef(null);
    const mounted = useRef(false);
    const mounted_K = useRef(false);
    const mounted_times = useRef(false);
    const param = useParams();

    const [searchMode, setSearchMode] = useState("");
    const [modal_sid, setModal_sid] = useState(param.post_sid || 0);
    const [getDataTimes, setGetDataTimes] = useState(0);
    const [keyWord, setKeyWord] = useState("");
    const [chooseValue, setChooseValue] = useState({});
    const [isEnd, setIsEnd] = useState(false);
    const [rows, setRows] = useState([]);
    const [scrollY, setScrollY] = useState([0, 0]);
    const [isOpen, setIsOpen] = useState(false);

    const getData = async (times = 0) => {
        if (isEnd) return { row: [] };

        if (searchMode === "submit") {
            const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/;
            const replaced = keyWord.replace(pattern, "").trim();

            const r = await axios(searchPost, {
                params: { times, q: replaced, auth: mySid },
            });
            if (r.data.isEnd) setIsEnd(true);
            return r.data;
        } else if (searchMode === "choose") {
            return chooseToSearch(chooseValue, times, true);
        } else {
            // default mode
            const r = await axios(getPosts, {
                params: { times, auth: mySid },
            });

            return r.data;
        }
    };

    const resetState = useCallback(() => {
        mounted.current = false;
        mounted_K.current = false;
        mounted_times.current = false;
        setGetDataTimes(0);
        setScrollY([0, 0]);
        setChooseValue("");
        setSearchMode("");
        setIsEnd(false);
        setModal_sid(0);
        pushTabs("home");

        (async () => {
            const r = await getData();
            setRows(r.rows);
        })();
    }, []);

    const scrollHandler = throttle((e) => {
        setScrollY((pre) => {
            const newPre = [...pre];

            newPre.shift();
            return [...newPre, window.scrollY];
        });

        const masonry = wrap.current.lastElementChild;
        const gridArr = [
            masonry.children[0]?.lastElementChild.getBoundingClientRect().top,
            masonry.children[1]?.lastElementChild.getBoundingClientRect().top,
            masonry.children[2]?.lastElementChild.getBoundingClientRect().top,
            masonry.children[3]?.lastElementChild.getBoundingClientRect().top,
        ];

        const closest = gridArr.sort((a, b) => a - b)[0];
        if (closest < 980) {
            setGetDataTimes((pre) => pre + 1);
        }

        const scrollPercent =
            window.pageYOffset /
            (document.body.clientHeight - window.innerHeight);
        const fiftyPercent =
            document.body.clientHeight / 2 - window.innerHeight;
        if (scrollPercent > 0.99 && !isEnd) {
            window.scrollTo(0, fiftyPercent);
        }
    }, 200);

    useEffect(() => {
        // DidUpdate轉換狀態才清rows
        if (mounted.current) {
            (async () => {
                setRows([]);
                // setGetDataTimes(0);
                if (!searchMode) {
                    const r = await getData(getDataTimes);
                    if (r?.success) {
                        setRows(r.rows);
                    }
                }
            })();
        } else {
            mounted.current = true;
        }
    }, [searchMode]);

    useEffect(() => {
        if (mounted_K.current) {
            setGetDataTimes(0);
        } else {
            mounted_K.current = true;
        }
    }, [keyWord]);

    useEffect(() => {
        if (modal_sid || nowTabs === "newPost") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [modal_sid, nowTabs]);

    useEffect(() => {
        if (mounted_times.current) {
            (async () => {
                const r = await getData(getDataTimes);

                if (r?.success) {
                    setRows((pre) => {
                        if (pre === undefined) {
                            return [...r.rows];
                        }

                        return [...pre, ...r.rows];
                    });
                }
            })();
        } else {
            mounted_times.current = true;
        }
    }, [getDataTimes]);

    useEffect(() => {
        (async () => {
            const r = await getData(getDataTimes);
            if (r.success) setRows(r.rows);

            window.addEventListener("scroll", scrollHandler);
        })();

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

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
        setModal_sid(v.sid);
    };

    const chooseToSearch = (v, times = 0, rt = false) => {
        setChooseValue(v);

        const { name, sid, type, member_sid } = v;
        const params = { q: sid || member_sid, type, times, auth: mySid };

        if (name) {
            setKeyWord(name);
        }
        setIsEnd(false);
        setSearchMode("choose");

        if (!rt) {
            axios(searchPost, { params }).then((r) => {
                if (r.data?.success) {
                    setRows(r.data.rows);
                    if (r.data.isEnd) setIsEnd(true);
                }
            });
        } else {
            axios(searchPost, { params }).then((r) => {
                if (r.data?.success) {
                    if (r.data.isEnd) setIsEnd(true);
                    return r.data;
                }
            });
        }
    };

    useEffect(() => {
        if (newPost) {
            pushTabs("newPost");
        } else {
            pushTabs("home");
        }

        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    return (
        <Fragment>
            <NavBar />
            <PostNav
                scrollDir={scrollDir}
                setRows={setRows}
                setSearchMode={setSearchMode}
                keyWord={keyWord}
                setKeyWord={setKeyWord}
                setIsEnd={setIsEnd}
                setGetDataTimes={setGetDataTimes}
                chooseToSearch={chooseToSearch}
                resetState={resetState}
            />

            <div className={container} ref={wrap}>
                {rows && (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className={my_masonry_grid}
                        columnClassName={my_masonry_grid_column}
                    >
                        {rows.map((v, i) => {
                            return (
                                <a
                                    key={i + "sid" + v.sid}
                                    href={`/sharing/${v.sid}`}
                                    onClick={(e) => {
                                        modalHandler(e, v);
                                    }}
                                >
                                    <PostCard
                                        cardData={v}
                                        modalMode={modal_sid}
                                        chooseToSearch={chooseToSearch}
                                        setIsOpen={setIsOpen}
                                    />
                                </a>
                            );
                        })}
                    </Masonry>
                )}
                {modal_sid !== 0 && (
                    <PostDetailModel
                        modal_sid={modal_sid}
                        setModal_sid={setModal_sid}
                        windowScrollY={scrollY[1]}
                        resetState={resetState}
                        setRows={setRows}
                    />
                )}
                {nowTabs === "newPost" && <NewPost resetState={resetState} />}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} time=".4">
                <Link
                    to="/member/login"
                    style={{
                        textDecoration: "none",
                        color: "var(--BLUE)",
                        padding: "40px",
                    }}
                >
                    <h4>請先登入</h4>
                </Link>
            </Modal>
            <Footer />
        </Fragment>
    );
}

export default Post;
