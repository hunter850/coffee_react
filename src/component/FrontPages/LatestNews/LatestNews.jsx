import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import LatestTitle from "./LatestTitle";

function LatestNews({ bagcolorblue, latesttitlecolor }) {
    return (
        <Fragment>
            <div
                className="home-container mt-20 mb-20"
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
                <div>
                    <Link to="#/">
                        <LatestTitle />
                    </Link>
                    <Link to="#/">
                        <LatestTitle />
                    </Link>
                    <Link to="#/">
                        <LatestTitle />
                    </Link>
                    <Link to="#/">
                        <LatestTitle />
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

export default LatestNews;
