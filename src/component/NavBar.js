import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import coffeeLogo from "../../src/images/frontpage/0+B(白).png";

const NavBar = () => {
    // =============================================
    const memberListyle = {
        position: "relative",
    };

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
    const gameListyle = {
        position: "relative",
    };

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
        <header
            style={{
                position: "sticky",
                width: "100%",
                top: "0px",
                zIndex: "999",
            }}
        >
            <nav className="navbar-wrap d-flex">
                <div className="navlogostyle">
                    <img
                        src={coffeeLogo}
                        style={{ backgroundColor: "#253945" }}
                        width="75px"
                        height="60px"
                        alt=""
                    />
                </div>
                <div className="navlistul">
                    <ul
                        className="navUl"
                        style={{ height: "60px", backgroundColor: "#253945" }}
                    >
                        <li>
                            <Link to="/" style={{ color: "white" }}>
                                首頁
                            </Link>
                        </li>
                        <li>
                            <Link to="/store" style={{ color: "white" }}>
                                店家資訊
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" style={{ color: "white" }}>
                                商品
                            </Link>
                        </li>
                        <li>
                            <Link to="/food" style={{ color: "white" }}>
                                點餐
                            </Link>
                        </li>
                        <li>
                            <Link to="/course" style={{ color: "white" }}>
                                課程
                            </Link>
                        </li>
                        <li>
                            <Link to="/sharing" style={{ color: "white" }}>
                                分享牆
                            </Link>
                        </li>
                        {/* <li><Link to="/game">遊戲</Link></li> */}
                        <li className="gameLi" style={gameListyle} ref={gameLi}>
                            <button
                                onClick={displayHandler2}
                                style={{ color: "white" }}
                            >
                                遊戲
                            </button>
                            <ul
                                className="gameUl"
                                style={gameDisplay}
                                onClick={clickHandler2}
                            >
                                <li>
                                    <Link to="/getpoint">獲得積分</Link>
                                </li>
                                <li>
                                    <Link to="/getcoupon">獲得優惠券</Link>
                                </li>
                            </ul>
                        </li>

                        <li
                            className="memberLi"
                            style={memberListyle}
                            ref={memberLi}
                        >
                            <button
                                onClick={displayHandler}
                                style={{ color: "white" }}
                            >
                                會員
                            </button>
                            <ul
                                className="memberUl"
                                style={memberDisplay}
                                onClick={clickHandler}
                            >
                                <li>
                                    <Link to="/member">會員中心</Link>
                                </li>
                                <li>
                                    <Link to="/points">我的積分</Link>
                                </li>
                                <li>
                                    <Link to="/coupon">我的優惠卷</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/cart" style={{ color: "white" }}>
                                購物車
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );

    return el;
};

export default NavBar;
