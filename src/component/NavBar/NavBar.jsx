/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import "./NavBar.scss";
import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";
import { useState, useEffect } from "react";

function NavBar() {
    // 下拉選單顯示的狀態
    const [navDropDown, setNavDropDown] = useState("");
    // 判斷RWD
    const [mediaS, setMediaS] = useState(false);
    // 取得視窗寬度
    const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);

    // 控制下拉選單顯示
    const handleDropDown = (e, nav) => {
        e.stopPropagation();
        if (nav === navDropDown) {
            setNavDropDown('');
        } else {
            setNavDropDown(nav);
        }
    };

    // 取消下拉選單顯示
    useEffect(() => {
        window.addEventListener('click', () => {
            setNavDropDown('');
        });
    }, [navDropDown]);

    // 判斷時機點不太對,所以邏輯相反<=375正常要是true
    useEffect(() => {
        setWindowsWidth(window.innerWidth);
        window.addEventListener('resize', () => {
            if (windowsWidth <= 375) {
                setMediaS(false);
            } else {
                setMediaS(true);
            }
        });
    }, [windowsWidth, mediaS]);

    return (
        <header className="nav-header">
            <nav className="container  nav-header-wrap" >
                <div className="nav-menu">
                    <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.714286 3.21429H19.2857C19.6802 3.21429 20 2.89451 20 2.5V0.714286C20 0.319777 19.6802 0 19.2857 0H0.714286C0.319777 0 0 0.319777 0 0.714286V2.5C0 2.89451 0.319777 3.21429 0.714286 3.21429ZM0.714286 10.3571H19.2857C19.6802 10.3571 20 10.0374 20 9.64286V7.85714C20 7.46263 19.6802 7.14286 19.2857 7.14286H0.714286C0.319777 7.14286 0 7.46263 0 7.85714V9.64286C0 10.0374 0.319777 10.3571 0.714286 10.3571ZM0.714286 17.5H19.2857C19.6802 17.5 20 17.1802 20 16.7857V15C20 14.6055 19.6802 14.2857 19.2857 14.2857H0.714286C0.319777 14.2857 0 14.6055 0 15V16.7857C0 17.1802 0.319777 17.5 0.714286 17.5Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div className="nav-logo">
                    <Logo mediaS={mediaS} />
                </div>
                <ul className="nav-ul nav-media-display-none">
                    <li>
                        <Link to="/">首頁</Link>
                    </li>
                    <li>
                        <Link to="/store">店家資訊</Link>
                    </li>
                    <li>
                        <Link to="/products">商品</Link>
                    </li>
                    <li>
                        <Link to="/food">點餐</Link>
                    </li>
                    <li>
                        <Link to="/course">課程</Link>
                    </li>
                    <li>
                        <Link to="/sharing">分享牆</Link>
                    </li>
                    <li
                        style={{ cursor: "pointer" }}
                        className="nav-game-li"
                        onClick={(e) => handleDropDown(e, "game")}
                    >
                        <a href="/#" className="game-a">遊戲</a>
                        <ul
                            className={`nav-game-ul ${navDropDown === "game" ? "" : "nav-display-none"
                                }`}
                        >
                            <li >
                                <Link to="/getpoint">獲得積分</Link>
                            </li>
                            <li >
                                <Link to="/getcoupon">獲得優惠券</Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        style={{ cursor: "pointer" }}
                        className="nav-member-li"
                        onClick={(e) => handleDropDown(e, "member")}

                    >
                        <a href="/#" className="member-a">會員</a>
                        <ul
                            className={`nav-member-ul  ${navDropDown === "member" ? "" : "nav-display-none"}`}
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
                        <Link to="/cart">購物車</Link>
                    </li>
                </ul>
                <div className="d-flex nav-icon-wrap">
                    <div className="cart-icon">
                        <Link to="/cart">
                            <svg
                                width="20"
                                height="18"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.5249 11.2224H7.34625L7.57351 12.3336H16.8936C17.4283 12.3336 17.8247 12.8301 17.7062 13.3516L17.5146 14.1945C18.1636 14.5095 18.6111 15.1748 18.6111 15.9447C18.6111 17.0281 17.725 17.9045 16.6381 17.8889C15.6025 17.874 14.7509 17.0337 14.723 15.9984C14.7077 15.4329 14.9342 14.9203 15.3064 14.5557H8.02695C8.38726 14.9087 8.61111 15.4004 8.61111 15.9447C8.61111 17.0493 7.69 17.9388 6.57396 17.887C5.58299 17.841 4.77705 17.0403 4.72497 16.0496C4.68476 15.2845 5.08733 14.6102 5.69896 14.2584L3.25983 2.33355H0.833334C0.37309 2.33355 0 1.96046 0 1.50022V0.944662C0 0.484419 0.37309 0.111328 0.833334 0.111328H4.39337C4.78924 0.111328 5.13045 0.389835 5.20979 0.777648L5.52806 2.33355H19.1663C19.7011 2.33355 20.0974 2.83011 19.9789 3.35157L18.3375 10.5738C18.2513 10.9532 17.914 11.2224 17.5249 11.2224ZM13.9941 6.778H12.5V4.69466C12.5 4.46456 12.3134 4.278 12.0833 4.278H11.25C11.0199 4.278 10.8333 4.46456 10.8333 4.69466V6.778H9.33927C8.96806 6.778 8.78216 7.22682 9.04465 7.48928L11.3721 9.81668C11.5348 9.97939 11.7986 9.97939 11.9613 9.81668L14.2887 7.48928C14.5512 7.22682 14.3653 6.778 13.9941 6.778Z"
                                    fill="white"
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className="nav-media-display-none">
                        <Link to="/member/login">
                            <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 10C11.7617 10 14 7.76172 14 5C14 2.23828 11.7617 0 9 0C6.23828 0 4 2.23828 4 5C4 7.76172 6.23828 10 9 10ZM12.5 11.25H11.8477C10.9805 11.6484 10.0156 11.875 9 11.875C7.98438 11.875 7.02344 11.6484 6.15234 11.25H5.5C2.60156 11.25 0.25 13.6016 0.25 16.5V18.125C0.25 19.1602 1.08984 20 2.125 20H15.875C16.9102 20 17.75 19.1602 17.75 18.125V16.5C17.75 13.6016 15.3984 11.25 12.5 11.25Z"
                                    fill="white"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;;
