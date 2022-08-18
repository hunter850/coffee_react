import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import LatestTitle from "./LatestTitle";
import ScrollWrap from "../../Item/ScrollWrap/ScrollWrap";
import "./LatestNews.css";

function LatestNews({ bagcolorblue, latesttitlecolor }) {
    return (
        <Fragment>
            <div className="home-box-color">
                <div
                    className="home-flex-container"
                    style={{ backgroundColor: bagcolorblue }}
                >
                    <div className="bottom-line-white m-auto">
                        <h2
                            className="home-title"
                            style={{ color: latesttitlecolor }}
                        >
                            最新消息
                        </h2>
                    </div>
                    <div className="leastnews-title-layout">
                        <ScrollWrap start="textfrom" end="textto">
                            <Link  to="/LatestnewsDetail">
                                <LatestTitle />
                            </Link>
                        </ScrollWrap>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default LatestNews;
