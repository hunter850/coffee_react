/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import "./NavBar.scss";
import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useAuth, authOrigin } from "../Member/AuthContextProvider";
import CartCount from "../../Contexts/CartCount";
import axios, { Axios } from "axios";
import { getCartCount } from "../../config/api-path";

export const ConutContext = React.createContext();




function NavBar({ navPosition = 'fixed' }) {
    const { sid, name, setAuth, token } = useAuth();

    const [count, setCount] = useState(0);
    const getCount = useCallback(() => {
        axios.get(getCartCount, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                setCount(res.data.cartTotalCount);
                // console.log(res.data.cartTotalCount);
            });
    }, []);


    // console.log(cartCount);
    // console.log(name);
    // console.log(useContext(AuthContext));


    const { cartCountNum } = useContext(CartCount);
    console.log(cartCountNum);

    // 下拉選單顯示的狀態
    const [navDropDown, setNavDropDown] = useState("");
    // 判斷RWD
    const [mediaS, setMediaS] = useState(false);
    // 取得視窗寬度
    const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
    // 控制登入登出狀態
    const [signOut, setSignOut] = useState('');

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

    // 刪除 auth - 登入狀態
    const handleSignOut = () => {
        localStorage.removeItem("auth");
        setAuth({ ...authOrigin });
    };

    // 未登錄顯示icon
    const memberIcon = (<div className="nav-media-display-none  member-icon">
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
    </div>);
    // 登入顯示打招呼
    const memberName = (
        <li
            style={{ cursor: "pointer" }}
            className="nav-member-li"
        >
            <div className="member-name" onClick={(e) => handleDropDown(e, "signout")}>
                您好! <span >{name}</span>
            </div>
            <ul
                className="nav-sign-out-ul"
            >
                <li className={`nav-sign-out  ${navDropDown === "signout" ? "" : "signout-display-none"
                    }`}
                    onClick={() => handleSignOut('auth')}
                >
                    登出
                </li>
            </ul>
        </li>
    );

    return (
        <ConutContext.Provider value={getCount}>
            <button onClick={getCount}>click</button>
            <header className="nav-header" style={{ position: navPosition }}>
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
                        <Link to="/">
                            <Logo mediaS={mediaS} />
                        </Link>
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
                            <Link to="/reserve">訂位</Link>
                        </li>
                        {/* 後台權限預製 */}
                        {/* <li>
                        <Link
                            to={
                                Number(sid) === 43
                                    ? "/course/manage"
                                    : `/course`
                            }
                            style={{ color: "white" }}
                        >
                            課程
                        </Link>
                    </li> */}
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
                            <div className="cart-icon-count">
                                {count}
                            </div>
                            <Link to="/cart">
                                <svg width="24" height="24" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M18.3375 10.5738L19.9789 3.35157C20.0974 2.83011 19.7011 2.33355 19.1663 2.33355H5.52806L5.20979 0.777648C5.13049 0.389835 4.78924 0.111328 4.39337 0.111328H0.833334C0.37309 0.111328 0 0.484419 0 0.944662V1.50022C0 1.96046 0.37309 2.33355 0.833334 2.33355H3.25983L5.69899 14.2584C5.11545 14.594 4.72222 15.2232 4.72222 15.9447C4.72222 17.0186 5.59278 17.8891 6.66667 17.8891C7.74056 17.8891 8.61111 17.0186 8.61111 15.9447C8.61111 15.4004 8.38726 14.9087 8.02695 14.5558H15.3064C14.9461 14.9087 14.7222 15.4004 14.7222 15.9447C14.7222 17.0186 15.5928 17.8891 16.6667 17.8891C17.7406 17.8891 18.6111 17.0186 18.6111 15.9447C18.6111 15.1748 18.1636 14.5095 17.5146 14.1945L17.7062 13.3516C17.8247 12.8301 17.4283 12.3336 16.8936 12.3336H7.57351L7.34625 11.2224H17.5249C17.914 11.2224 18.2513 10.9532 18.3375 10.5738Z" fill="#fff" />
                                </svg>

                            </Link>
                        </div>
                        {sid !== "" ? memberName : memberIcon}
                    </div>
                </nav>
            </header>
            <div className="nav-solid-border-bottom"></div>
        </ConutContext.Provider>
    );
}

export default NavBar;;
