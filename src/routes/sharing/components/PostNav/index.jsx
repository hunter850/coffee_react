import { useState } from "react";
import { Link } from "react-router-dom";

import Seachbar from "./Seachbar";
import { avatarDIR } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { useTabsHistory } from "../../../../Contexts/TabsHistoryProvider";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import Modal from "../../../../component/Modal/Modal";
import styles from "./scss/PostNav.module.scss";

function PostNav(props) {
    const [isOpen, setIsOpen] = useState(false);
    const { nowTabs, pushTabs } = useTabsHistory();
    const { authorized, sid, token, avatar } = useAuth();

    const {
        scrollDir,
        setRows,
        setSearchMode,
        keyWord,
        setKeyWord,
        setIsEnd,
        setGetDataTimes,
        chooseToSearch,
        resetState,
    } = props;
    const {
        post_nav,
        container,
        title_wrap,
        collapse,
        search_wrap,
        icon_wrap,
        avatar_wrap,
        avatar_selected,
    } = styles;

    const handleHeart = () => {
        if (!authorized) {
            setIsOpen(true);
        } else {
            chooseToSearch({ type: "member_like", sid });
            window.scrollTo(0, 0);
            pushTabs("heart");
        }
    };

    const handleMyPost = () => {
        if (!authorized) {
            setIsOpen(true);
        } else {
            chooseToSearch({ type: "nickname", sid });
            window.scrollTo(0, 0);
            pushTabs("myPost");
        }
    };

    return (
        <>
            <div className={`${post_nav} ${scrollDir === "down" && collapse}`}>
                <div className={container}>
                    <div className={title_wrap}>
                        <a href="./#">
                            <h4>分享牆</h4>
                        </a>
                    </div>
                    <div className={search_wrap}>
                        <Seachbar
                            setRows={setRows}
                            setSearchMode={setSearchMode}
                            keyWord={keyWord}
                            setKeyWord={setKeyWord}
                            setIsEnd={setIsEnd}
                            setGetDataTimes={setGetDataTimes}
                            chooseToSearch={chooseToSearch}
                        />
                    </div>
                    <ul className={icon_wrap}>
                        <li
                            onClick={() => {
                                pushTabs("home");
                                window.scrollTo(0, 0);
                                resetState();
                            }}
                        >
                            <Link to="/sharing">
                                <AiFillHome
                                    color={
                                        nowTabs === "home"
                                            ? "#b79973"
                                            : "324A59"
                                    }
                                    fontSize="26"
                                />
                            </Link>
                        </li>
                        <li
                            onClick={() => {
                                if (authorized) {
                                    pushTabs("newPost");
                                } else {
                                    setIsOpen(true);
                                }
                            }}
                        >
                            <Link to="/sharing/newpost">
                                <BsFillPlusSquareFill
                                    color={
                                        nowTabs === "newPost"
                                            ? "#b79973"
                                            : "324A59"
                                    }
                                    fontSize="24"
                                />
                            </Link>
                        </li>
                        <li onClick={handleHeart}>
                            <Link to="/sharing">
                                <FaHeart
                                    color={
                                        nowTabs === "heart"
                                            ? "#b79973"
                                            : "324A59"
                                    }
                                    fontSize="24"
                                />
                            </Link>
                        </li>
                        <li
                            className={
                                nowTabs === "myPost"
                                    ? avatar_selected
                                    : avatar_wrap
                            }
                            onClick={handleMyPost}
                        >
                            <Link to="/sharing">
                                <img
                                    src={`${avatarDIR}/${avatar || "missing-image.jpg"
                                        }`}
                                    alt="avatar"
                                    width="36px"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
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
        </>
    );
}

export default PostNav;
