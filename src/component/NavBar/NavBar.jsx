/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import useClass from "../../hooks/useClass";
import Logo from "./Logo/Logo";
import React, { useState, useEffect, useMemo } from "react";
import { useAuth, authOrigin } from "../Member/AuthContextProvider";
import { useNav } from "../../Contexts/NavProvider";
import axios from "axios";
import { getUserData } from "../../config/api-path";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import bs_flex from "../../routes/cart/css/bs_flex.module.scss";


function NavBar({ navPosition = 'sticky' }) {
    const c = useClass();
    const { container, px_200 } = bs_flex;
    const { sid, name, token, setAuth, auth, memberJump } = useAuth();
    const { count, getCount, handleLogout, shouldCover } = useNav();
    const navigate = useNavigate();
    // 下拉選單顯示的狀態
    const [navDropDown, setNavDropDown] = useState("");
    // 登入者姓名
    const [user, setUser] = useState({
        member_name: "",
    });
    // nav會員名字用
    const [getUserName, setGetUserName] = useState(auth.name);
    // rwd下拉選單
    const [hamburgerMenuDisplay, setHamburgerMenuDisplay] = useState(false);
    // rwd下拉選單 顯示開關
    const openHamburgerMenu = () => {
        setHamburgerMenuDisplay(!hamburgerMenuDisplay);
    };
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

    // 刪除 auth - 登入狀態
    const handleSignOut = () => {
        localStorage.removeItem("auth");
        setAuth({ ...authOrigin });
        // 登出的function
        handleLogout();
        navigate('/', { replace: false });
    };
    // 登入後先要一次資料拿購物車商品數量
    useEffect(() => {
        if (sid !== "") {
            getCount();
        }
    }, []);
    // 獲取nav顯示登入名字
    useEffect(() => {
        if (token !== '') {
            axios
                .get(getUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser({ ...user, member_name: response.data[0].member_name });
                    setAuth({ ...authOrigin, name: response.data[0].member_name });
                });
        }
        setGetUserName(auth.name);

    }, [token, getUserName, name, user.member_name]);
    const coverStyle = useMemo(() => {
        if (shouldCover) {
            return { position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", backgroundColor: "#0009" };
        } else {
            return {};
        }
    }, [shouldCover]);
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
                您好! <span >{getUserName}</span>
            </div>
            <ul
                className="nav-sign-out-ul"
            >
                <li className={`nav-sign-out  ${navDropDown === "signout" ? "" : "signout-display-none"
                    }`}
                    onClick={() => handleSignOut()}
                >
                    登出
                </li>
            </ul>
        </li>
    );

    // 登入管理者帳號,出現課程後台選項
    const courseManage = (<li
        style={{ cursor: "pointer" }}
        className="nav-course-li"
        onClick={(e) => handleDropDown(e, "course")}
    >
        <a href="/#" className="course-a text_nowrap">課程</a>
        <ul
            className={`nav-course-ul ${navDropDown === "course" ? "" : "nav-display-none"
                }`}
        >
            <li >
                <Link to="/course">課程主頁</Link>
            </li>
            <li >
                <Link to="/course/manage">課程管理</Link>
            </li>
        </ul>
    </li>);
    // 不是管理者時顯示這個
    const course = (<li>
        <Link to="/course" className="text_nowrap">課程</Link>
    </li>);

    return (
        <>

            <header className="nav-header" style={{ position: navPosition }}>
                <div style={coverStyle}></div>
                {hamburgerMenuDisplay === true ? <HamburgerMenu /> : ''}
                <nav className={c(container, px_200, "nav-header-wrap")} >
                    <div className="nav-menu" onClick={() => openHamburgerMenu()}>
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
                            <Logo />
                        </Link>
                    </div>
                    <ul className="nav-ul nav-media-display-none">
                        <li>
                            <Link to="/" className="text_nowrap">首頁</Link>
                        </li>
                        <li>
                            <Link to="/store" className="text_nowrap">店家資訊</Link>
                        </li>
                        <li>
                            <Link to="/products" className="text_nowrap">商品</Link>
                        </li>
                        <li>
                            <Link to="/food" className="text_nowrap">點餐</Link>
                        </li>
                        <li>
                            <Link to="/reserve" className="text_nowrap">訂位</Link>
                        </li>
                        {Number(sid) === 2 ? courseManage : course}
                        <li>
                            <Link to="/sharing" className="text_nowrap">分享牆</Link>
                        </li>
                        <li
                            style={{ cursor: "pointer" }}
                            className="nav-game-li"
                            onClick={(e) => handleDropDown(e, "game")}
                        >
                            <a href="/#" className="game-a text_nowrap">遊戲</a>
                            <ul
                                className={`nav-game-ul ${navDropDown === "game" ? "" : "nav-display-none"
                                    }`}
                            >
                                <li >
                                    <Link to="/getpoint" className="text_nowrap text_py">獲得積分</Link>
                                </li>
                                <li >
                                    <Link to="/getcoupon" className="text_nowrap text_py">獲得優惠券</Link>
                                </li>
                            </ul>
                        </li>
                        <li
                            style={{ cursor: "pointer" }}
                            className="nav-member-li"
                            onClick={(e) => handleDropDown(e, "member")}

                        >
                            <a href="/#" className="member-a text_nowrap">會員</a>
                            <ul
                                className={`nav-member-ul  ${navDropDown === "member" ? "" : "nav-display-none"}`}
                            >
                                <li>
                                    <Link to="/member" className="text_nowrap text_py">會員中心</Link>
                                </li>
                                <li>
                                    <Link to="/points" className="text_nowrap text_py">我的積分</Link>
                                </li>
                                <li>
                                    <Link to="/coupon" className="text_nowrap text_py">我的優惠卷</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex nav-icon-wrap">
                        <div className="cart-icon">
                            <Link to="/cart">
                                <div className="cart-icon-count" style={{ backgroundColor: `${count >= 99 ? '#A45959' : ''}` }}>
                                    {count > 99 ? 99 : count}
                                    {count > 99 && <span>+</span>}
                                </div>
                                <svg width="20" height="20" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M18.3375 10.5738L19.9789 3.35157C20.0974 2.83011 19.7011 2.33355 19.1663 2.33355H5.52806L5.20979 0.777648C5.13049 0.389835 4.78924 0.111328 4.39337 0.111328H0.833334C0.37309 0.111328 0 0.484419 0 0.944662V1.50022C0 1.96046 0.37309 2.33355 0.833334 2.33355H3.25983L5.69899 14.2584C5.11545 14.594 4.72222 15.2232 4.72222 15.9447C4.72222 17.0186 5.59278 17.8891 6.66667 17.8891C7.74056 17.8891 8.61111 17.0186 8.61111 15.9447C8.61111 15.4004 8.38726 14.9087 8.02695 14.5558H15.3064C14.9461 14.9087 14.7222 15.4004 14.7222 15.9447C14.7222 17.0186 15.5928 17.8891 16.6667 17.8891C17.7406 17.8891 18.6111 17.0186 18.6111 15.9447C18.6111 15.1748 18.1636 14.5095 17.5146 14.1945L17.7062 13.3516C17.8247 12.8301 17.4283 12.3336 16.8936 12.3336H7.57351L7.34625 11.2224H17.5249C17.914 11.2224 18.2513 10.9532 18.3375 10.5738Z" fill="#fff" />
                                </svg>
                            </Link>
                        </div>
                        {sid !== "" ? memberName : memberIcon}
                    </div>
                </nav>
            </header>
        </>
    );
}

export default NavBar;
