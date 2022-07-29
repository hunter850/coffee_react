/* eslint-disable prettier/prettier */
import { Fragment } from "react";
import { Link } from "react-router-dom";

import { useContext} from "react";
import AuthContext from "../../component/Member/AuthContext";

import NavBar from "../../component/NavBar";
import "./Member.css";

function Member() {

    const { authorized, name } = useContext(AuthContext);

    return (
        <Fragment>
            <NavBar />
            <div className="mc-wrap-main">
                <div className="mc-container">
                    <div className="wrap-right">
                        <div className="mc-card"></div>
                        <div className="mc-like">
                            <i className="fa-solid fa-heart"></i>
                            <p>收藏<span>0</span>項</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className="mc-coupon">
                            <i className="fa-solid fa-heart"></i>
                            <p>優惠券<span>0</span>張</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="wrap-left">
                        <div className="mc-user-name">Hi！{name}</div>
                        <div className="mc-menu-wrap">
                            <Link
                                to={ authorized ? "/member/userinfo" : "/member/login" }>
                                <div className="mc-menu">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                            </Link>
                            <div className="mc-menu"></div>
                            <div className="mc-menu">
                                <i className="fa-solid fa-pencil"></i>
                            </div>
                            <div className="mc-menu">
                                <i className="fa-solid fa-mug-hot"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Member;
