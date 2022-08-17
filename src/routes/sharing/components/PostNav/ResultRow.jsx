import React from "react";
import { avatarDIR, sharingIMGS } from "../../../../config/api-path";
import { BsTagFill } from "react-icons/bs";

import Magnifier from "./Magnifier";
import styles from "./scss/Searchbar.module.scss";

function ResultRow({ data }) {
    const { name, type, save_at, member_sid, author, src } = data;
    const {
        magnifier_wrap,
        rect_wrap,
        img_wrap,
        result_name,
        member_wrap,
        member_small,
    } = styles;

    const iconEl = (type) => {
        if (type === "tag") {
            return save_at === "tag" ? (
                <Magnifier />
            ) : (
                <BsTagFill style={{ height: "1.4rem" }} />
            );
        } else if (type === "title") {
            return (
                <div className={rect_wrap}>
                    <img src={`${sharingIMGS}/${src}`} alt="post" />
                </div>
            );
        } else if (type === "nickname") {
            return (
                <div className={img_wrap}>
                    <img
                        src={`${avatarDIR}/${src}`}
                        alt="avatar"
                        width="100%"
                    />
                </div>
            );
        }
    };

    const nameEl = (type) => {
        if (type === "nickname" || type === "title") {
            return (
                <div className={member_wrap}>
                    <span style={{ lineHeight: "1.2rem" }}>{name}</span>
                    <span className={member_small}>
                        {type === "nickname" ? `#${member_sid}` : author}
                    </span>
                </div>
            );
        } else if (type === "tag" && save_at === "tag") {
            return (
                <div className="d-flex w100 align-items-center">
                    <span className={result_name}>{name}</span>
                    <span
                        className={`${member_small} ms-auto me-2`}
                        style={{ verticalAlign: "bottom" }}
                    >
                        熱門標籤
                    </span>
                </div>
            );
        }
        return <span className={result_name}>{name}</span>;
    };

    return (
        <>
            <div className={magnifier_wrap}>{iconEl(type)}</div>
            {nameEl(type)}
        </>
    );
}

export default ResultRow;
