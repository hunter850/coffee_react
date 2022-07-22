import React from "react";
import "./Path.css";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

export default function Path({ pathObj, backgroundColor, url }) {
    const urls = [];
    const newurls = urls.push(url);
    // console.log(urls);
    return (
        <div className="container Path">
            <div
                className="Path-font Path-wrap"
                style={{ backgroundColor: backgroundColor }}
            >
                <Link to="/">
                    <span>首頁</span>
                </Link>
                {pathObj.path.map((path, i) => {
                    return (
                        <Link
                            to={
                                url && i === newurls - 1
                                    ? urls[newurls - 1]
                                    : "#"
                            }
                            key={v4()}
                        >
                            <span>{path}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
