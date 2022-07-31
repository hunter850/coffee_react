import React, { Fragment } from "react";
import coffeeLogo from "../../src/images/frontpage/0+B(白).png";
import "./Footer.css";
// import { Link } from "react-router-dom";

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
                            src={ coffeeLogo }
                            width="80px"
                            height="80px"
                            alt=""
                        />
                    </div>
                    <div className="footertext-wrap">
                        <ul className="d-flex footertext">
                            <li className="footer-pdr-48">店家資訊</li>
                            <li className="footer-pdr-82">關於我們</li>
                            <li className="footer-pdr-48">最新活動</li>
                        </ul>
                        <ul className="d-flex footertext">
                            <li className="footer-pdr-48">夥伴招募</li>
                            <li className="footer-pdr-48">會員權益聲明</li>
                            <li className="footer-pdr-48">企業服務</li>
                        </ul>
                    </div>
                </div>
                <div className="sociallink-wrap">
                    <p className="Copyrighttext">
                        © 2022 Copyright 0+B Coffee Shop All Rights Reserved.
                    </p>
                    <div>
                        {/* <Link to="/">

                        </Link>
                        <Link to="/">
                            
                        </Link>
                        <Link to="/">
                            
                        </Link> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
