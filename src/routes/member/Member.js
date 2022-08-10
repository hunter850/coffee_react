/* eslint-disable prettier/prettier */
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useRef, useEffect } from "react";
import AuthContext from "../../component/Member/AuthContext";
import { getUserData } from "../../config/api-path";
import axios from "axios";

import Modal from "../../component/Modal/Modal";
import NavBar from "../../component/NavBar/NavBar";
import "./Member.css";

import { FaUser } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";

function Member() {
    const navigate = useNavigate();
    const { authorized, token } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const myCard = useRef();

    const flipCard = () => {
        myCard.current.classList.toggle("flipped");
    }

    const [getData, setGetData] = useState([]);

    useEffect(() => {

        if (!token) {
            setIsOpen(true);
            return;
        }

        axios
            .get(getUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setGetData(response.data);
            });
    }, [token]);

    const name = getData[0] ? getData[0].member_name : "";
    // const name = Object.values(getData).map((v, i) => v.member_name);
    const level = Object.values(getData).map((v, i) => v.member_level);
    const nickname = Object.values(getData).map((v, i) => v.member_nickname);

    return (
        <Fragment>
            <NavBar />
            <div className="mc-wrap-main">
                <div className="mc-container">
                    <div className="wrap-right">
                        <div className="mc-card" ref={myCard} onClick={flipCard}>
                            <div className="cardF">
                                <p className="cardB-desc">{nickname}</p>
                                <div className="cardF-wrap">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0"
                                        y="0"
                                        fill="white"
                                        width="60px"
                                        height="60px"
                                        enableBackground="new 77.2 328.8 441 185.1"
                                        version="1.1"
                                        viewBox="77.2 328.8 441 185.1"
                                        xmlSpace="preserve"
                                    >
                                        <g>
                                            <path d="M136.2 328.8s-59 75.2-59 125.9c0 32.6 26.4 59 59 59s59-26.4 59-59c0-50.7-59-125.9-59-125.9z"></path>
                                            <path d="M344.5 410.7L311.7 410.7 311.7 378 285.6 378 285.6 410.7 252.9 410.7 252.9 436.9 285.6 436.9 285.6 469.6 311.7 469.6 311.7 436.9 344.5 436.9z"></path>
                                            <g>
                                                <path d="M516.4 449.5c-1.6-8.1-4.7-15.7-10.4-22.1-5.4-6.1-11.9-9.8-19.2-11.9.1 0 .2-.1.3-.1 10.5-4.6 16.3-12.7 18.3-23.8 1.8-10 1.9-20.1 0-30.1-1.3-7-3.8-13.5-8.4-19-6.7-8.1-15.8-11.4-25.9-12.1-4.3-.3-8.7 0-13.1 0v183.5h27.2c16-.6 28.3-13.1 31.3-28.8 0-.1 0-.3.1-.4 2.1-11.8 2.2-23.5-.2-35.2z"></path>
                                                <path d="M448.3 513.6c-.7 0-1.4.1-2.1.1h-24.5c-10.5 0-17.4-6.9-17.4-17.4V345.6c0-9.1 6.1-15.3 15.1-15.4 9.2-.1 18.3 0 27.5 0 .4 0 .8.1 1.4.1v183.3z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="cardF-desc">You deserve a coffee every day.</p>
                                </div>

                            </div>
                            <div className="cardB">
                                <p className="cardB-level">{level}<span>points</span></p>
                                {/* <div className="cardB-wrap"></div> */}
                            </div>
                        </div>
                        <div className="mc-like">
                            <FaHeart size={'0.8rem'} style={{ "color": "rgb(183, 153, 115)" }} />
                            <p>收藏<span>0</span>項</p>
                            {/* 差多少點升等，3000 10000 30000 */}
                            <FaAngleRight size={'1.1rem'} style={{ "color": "rgb(37, 57, 69)", "position": "absolute", "right": "0", "top": "4" + "px" }} />
                        </div>
                        <Link to={authorized ? "/coupon" : "/member/login"}>
                            <div className="mc-coupon">
                                <RiCoupon2Fill size={'0.95rem'} style={{ "color": "rgb(183, 153, 115)" }} />
                                <p>優惠券<span>0</span>張</p>
                                <FaAngleRight size={'1.1rem'} style={{ "color": "rgb(37, 57, 69)", "position": "absolute", "right": "0", "top": "4" + "px" }} />
                            </div>
                        </Link>
                    </div>
                    <div className="wrap-left">
                        <div className="mc-user-name">Hi！{name}</div>
                        <div className="mc-menu-wrap">
                            <Link
                                to={authorized ? "/member/userinfo" : "/member/login"}>
                                <div className="mc-menu">
                                    <FaUser size={'1.5em'} />
                                    <p>會員資料</p>
                                </div>
                            </Link>
                            <Link
                                to={authorized ? "/member/orderhistory" : "/member/login"}>
                                <div className="mc-menu">
                                    <IoIosListBox size={'1.7em'} />
                                    <p>歷史訂單</p>
                                </div>
                            </Link>
                            <Link to={authorized ? "/member/likes" : "/member/login"}>
                                <div className="mc-menu">
                                    <FaHeart size={'1.5em'} />
                                    <p>我的收藏</p>
                                </div>
                            </Link>
                            <Link
                                to={authorized ? "/points" : "/member/login"}>
                                <div className="mc-menu">
                                    <FaCoffee size={'1.7em'} />
                                    <p>我的點數</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeButton={false} bgClassName="dark-bg">
                    <Modal.Body className="mr-msg-wrap">
                        <div>
                            <div className="mr-msg" onClick={()=>{navigate("/member/login", {replace: false})}}>請先登入</div>
                        </div>
                    </Modal.Body>
                </Modal>
        </Fragment>
    );
}

export default Member;