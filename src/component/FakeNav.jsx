import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import bs_flex from "../routes/cart/css/bs_flex.module.scss";
import styles from "./fakeNav.module.scss";

const FakeNav = () => {
    const { container, px_200 } = bs_flex;
    const {
        nav_wrap,
        nav_link,
        nav_text,
        game_list,
        game_ul,
        member_list,
        header_style,
    } = styles;
    // =============================================
    const c = useCallback((...ar) => {
        return ar.join(" ");
    }, []);

    const memberUlStyle = {
        listStyleType: "none",
        padding: "0px",
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        display: "none",
    };
    const [memberDisplay, setMemberDisplay] = useState(memberUlStyle);
    const memberLi = useRef(null);

    const closeMember = () => {
        setMemberDisplay((pre) => ({ ...pre, display: "none" }));
    };

    useEffect(() => {
        const memLiHeight = memberLi.current.getBoundingClientRect().height;
        // console.log(memLiHeight);
        setMemberDisplay((pre) => ({ ...pre, top: memLiHeight + "px" }));
        window.addEventListener("click", closeMember);
        window.addEventListener("resize", adjustMemberTop);
        function adjustMemberTop() {
            setMemberDisplay((pre) => ({
                ...pre,
                top: memberLi.current.getBoundingClientRect().height + "px",
            }));
        }
        return () => {
            window.removeEventListener("resize", adjustMemberTop);
            window.removeEventListener("click", closeMember);
        };
    }, []);

    const clickHandler = (event) => {
        event.stopPropagation();
    };

    const displayHandler = (event) => {
        event.stopPropagation();
        setGameDisplay((pre) => ({ ...pre, display: "none" }));
        setMemberDisplay((pre) => {
            if (pre.display === "none") {
                return { ...pre, display: "block" };
            } else {
                return { ...pre, display: "none" };
            }
        });
    };
    // =================================

    const gameUlStyle = {
        listStyleType: "none",
        padding: "0px",
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        display: "none",
    };
    const [gameDisplay, setGameDisplay] = useState(gameUlStyle);
    const gameLi = useRef(null);

    const closeGame = () => {
        setGameDisplay((pre) => ({ ...pre, display: "none" }));
    };

    useEffect(() => {
        const gameLiHeight = gameLi.current.getBoundingClientRect().height;
        // console.log(memLiHeight);
        setGameDisplay((pre) => ({ ...pre, top: gameLiHeight + "px" }));
        window.addEventListener("click", closeGame);
        window.addEventListener("resize", adjustGameTop);
        function adjustGameTop() {
            setGameDisplay((pre) => ({
                ...pre,
                top: gameLi.current.getBoundingClientRect().height + "px",
            }));
        }

        return () => {
            window.removeEventListener("resize", adjustGameTop);
            window.removeEventListener("click", closeGame);
        };
    }, []);

    const clickHandler2 = (event) => {
        event.stopPropagation();
    };

    const displayHandler2 = (event) => {
        event.stopPropagation();
        setMemberDisplay((pre) => ({ ...pre, display: "none" }));
        setGameDisplay((pre) => {
            if (pre.display === "none") {
                return { ...pre, display: "block" };
            } else {
                return { ...pre, display: "none" };
            }
        });
    };
    // =====================
    const el = (
        <header className={header_style}>
            <nav className={container}>
                <ul className={c(nav_wrap, px_200)}>
                    <li className={nav_link}>
                        <Link to="/" className={nav_text}>
                            ??????
                        </Link>
                    </li>
                    <li className={nav_link}>
                        <Link to="/store" className={nav_text}>
                            ????????????
                        </Link>
                    </li>
                    <li className={nav_link}>
                        <Link to="/products" className={nav_text}>
                            ??????
                        </Link>
                    </li>
                    <li className={nav_link}>
                        <Link to="/food" className={nav_text}>
                            ??????
                        </Link>
                    </li>
                    <li className={nav_link}>
                        <Link to="/course" className={nav_text}>
                            ??????
                        </Link>
                    </li>
                    <li className={nav_link}>
                        <Link to="/sharing" className={nav_text}>
                            ?????????
                        </Link>
                    </li>
                    {/* <li><Link to="/game">??????</Link></li> */}
                    <li className={game_list} ref={gameLi}>
                        <button onClick={displayHandler2} className={nav_text}>
                            ??????
                        </button>
                        <ul
                            className={game_ul}
                            style={gameDisplay}
                            onClick={clickHandler2}
                        >
                            <li>
                                <Link to="/getpoint">????????????</Link>
                            </li>
                            <li>
                                <Link to="/getcoupon">???????????????</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={member_list} ref={memberLi}>
                        <button
                            onClick={displayHandler}
                            style={{ color: "white" }}
                        >
                            ??????
                        </button>
                        <ul
                            className="memberUl"
                            style={memberDisplay}
                            onClick={clickHandler}
                        >
                            <li>
                                <Link to="/member">????????????</Link>
                            </li>
                            <li>
                                <Link to="/points">????????????</Link>
                            </li>
                            <li>
                                <Link to="/coupon">???????????????</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={nav_link}>
                        <Link to="/cart" style={{ color: "white" }}>
                            ?????????
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );

    return el;
};

export default FakeNav;
