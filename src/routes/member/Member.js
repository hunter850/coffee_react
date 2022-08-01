/* eslint-disable prettier/prettier */
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useContext,useRef,useEffect} from "react";
import AuthContext from "../../component/Member/AuthContext";
import { getUserData} from "../../config/api-path";
import axios from "axios";

import NavBar from "../../component/NavBar";
import "./Member.css";

import { FaUser } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";

import logo from "./0+B.svg";

function Member() {

    const { authorized, token } = useContext(AuthContext);

    const myCard = useRef();

    const flipCard =()=>{
        myCard.current.classList.toggle("flipped");
    }

    const [getData,setGetData] = useState([]);

    useEffect(() => {
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

    const name = Object.values(getData).map((v, i) => v.member_name);
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
                                <div className="cardF-wrap">
                                    <img src={logo} width="60px" height="60px" alt="" />
                                    <p className="cardF-desc">You deserve a coffee every day.</p>
                                </div>
                                
                            </div>
                            <div className="cardB">
                                <div className="cardF-wrap">
                                    <p className="cardB-level">{level}<span>points</span></p>
                                    <p className="cardB-desc">{nickname}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mc-like">
                            <FaHeart size={'0.8rem'} style={{"color":"rgb(183, 153, 115)"}}/>
                            <p>收藏<span>0</span>項</p>
                            <FaAngleRight size={'1.1rem'} style={{"color":"rgb(37, 57, 69)","position":"absolute","right":"0","top":"4"+"px"}}/>
                        </div>
                        <div className="mc-coupon">
                            <RiCoupon2Fill size={'0.95rem'} style={{"color":"rgb(183, 153, 115)"}}/>
                            <p>優惠券<span>0</span>張</p>
                            <FaAngleRight size={'1.1rem'} style={{"color":"rgb(37, 57, 69)","position":"absolute","right":"0","top":"4"+"px"}}/>
                        </div>
                    </div>
                    <div className="wrap-left">
                        <div className="mc-user-name">Hi！{name}</div>
                        <div className="mc-menu-wrap">
                            <Link
                                to={ authorized ? "/member/userinfo" : "/member/login" }>
                                <div className="mc-menu">
                                    <FaUser size={'1.5em'}/>
                                </div>
                            </Link>
                            <Link
                                to={ authorized ? "/member/orderhistory" : "/member/login" }>
                                <div className="mc-menu">
                                    <IoIosListBox size={'1.7em'}/>
                                </div>
                            </Link>
                            <div className="mc-menu">
                                <FaPen size={'1.5em'}/>
                            </div>
                            <div className="mc-menu">
                                <FaCoffee size={'1.7em'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Member;
