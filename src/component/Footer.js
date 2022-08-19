import React, { Fragment } from "react";
import coffeeLogo from "../../src/images/frontpage/0+B(白).png";
import ttlogo from "../../src/images/frontpage/ttlogo.png";
import fblogo from "../../src/images/frontpage/fblogo.png";
import iglogo from "../../src/images/frontpage/iglogo.png";
import "./Footer.css";
import { Link } from "react-router-dom";
// import coffeeshop from "../images/frontpage/coffee-shop.jpg";

export default function Footer() {
    return (
        <Fragment>
            <div>
                <div className="home-container footer-bgcolor">
                    <div className="d-flex partition">
                        <div className="footerlogo-wrap">
                            <img src={coffeeLogo} alt="coffeeLogo" />
                        </div>
                        <div className="footertext-wrap">
                            <ul className="d-flex footertext">
                                <Link to="/store">
                                    <li className="footer-pdr-48 linkcolor-white">
                                        店家資訊
                                    </li>
                                </Link>
                                <Link to="/">
                                    <li className="footer-pdr-82 linkcolor-white">
                                        關於我們
                                    </li>
                                </Link>
                                <Link to="/LatestnewsDetail">
                                    <li className="footer-pdr-48 linkcolor-white">
                                        最新活動
                                    </li>
                                </Link>
                            </ul>
                            <ul className="d-flex footertext">
                                <Link to="/">
                                    <li className="footer-pdr-48 linkcolor-white">
                                        夥伴招募
                                    </li>
                                </Link>
                                <Link to="/">
                                    <li className="footer-pdr-48 linkcolor-white">
                                        會員權益聲明
                                    </li>
                                </Link>
                                <Link to="/">
                                    <li className="footer-pdr-48 linkcolor-white">
                                        企業服務
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="sociallink-wrap">
                        <p className="Copyrighttext">
                            © 2022 Copyright 0+B Coffee Shop All Rights
                            Reserved.
                        </p>
                        <div className="sociallink">
                            <Link to="/">
                                <img
                                    className="sociallink-icon"
                                    src={ttlogo}
                                    alt="linklogo"
                                />
                            </Link>
                            <Link to="/">
                                <img
                                    className="sociallink-icon"
                                    src={fblogo}
                                    alt="linklogo"
                                />
                            </Link>
                            <Link to="/">
                                <img
                                    className="sociallink-icon"
                                    src={iglogo}
                                    alt="linklogo"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="home-box-color">
                    <div className="scroll-img">
                        {/* <img src={coffeeshop} alt="無法顯示照片" /> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
