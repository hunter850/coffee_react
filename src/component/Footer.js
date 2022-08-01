import React, { Fragment } from "react";
import coffeeLogo from "../../src/images/frontpage/0+B(白).png";
import ttlogo from "../../src/images/frontpage/ttlogo.png";
import fblogo from "../../src/images/frontpage/fblogo.png";
import iglogo from "../../src/images/frontpage/iglogo.png";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer({ bagcolorblue }) {
    return (
        <Fragment>
            <div
                className="home-container"
                style={{ backgroundColor: bagcolorblue }}
            >
                <div className="d-flex partition">
                    <div className="footerlogo-wrap">
                        <img
                            src={coffeeLogo}
                            width="80px"
                            height="80px"
                            alt=""
                        />
                    </div>
                    <div className="footertext-wrap">
                        <ul className="d-flex footertext">
                            <Link to="/">
                                <li className="footer-pdr-48 linkcolor-white">店家資訊</li>
                            </Link>
                            <Link to="/">
                                <li className="footer-pdr-82 linkcolor-white">關於我們</li>
                            </Link>
                            <Link to="/">
                                <li className="footer-pdr-48 linkcolor-white">最新活動</li>
                            </Link>
                        </ul>
                        <ul className="d-flex footertext">
                            <Link to="/">
                                <li className="footer-pdr-48 linkcolor-white">夥伴招募</li>
                            </Link>
                            <Link to="/">
                                <li className="footer-pdr-48 linkcolor-white">會員權益聲明</li>
                            </Link>
                            <Link to="/">
                                <li className="footer-pdr-48 linkcolor-white">企業服務</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="sociallink-wrap">
                    <p className="Copyrighttext">
                        © 2022 Copyright 0+B Coffee Shop All Rights Reserved.
                    </p>
                    <div className="sociallink">
                        <Link to="/">
                            <img
                                className="sociallink-icon"
                                src={ttlogo}
                                width="48px"
                                height="48px"
                                alt=""
                            />
                        </Link>
                        <Link to="/">
                            <img
                                className="sociallink-icon"
                                src={fblogo}
                                width="48px"
                                height="48px"
                                alt=""
                            />
                        </Link>
                        <Link to="/">
                            <img
                                className="sociallink-icon"
                                src={iglogo}
                                width="48px"
                                height="48px"
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
