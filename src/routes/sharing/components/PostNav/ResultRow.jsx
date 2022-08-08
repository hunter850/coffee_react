import React from "react";
import { imgSrc, sharingIMGS } from "../../../../config/api-path";
import { BsTagFill } from "react-icons/bs";

import Magnifier from "./Magnifier";
import styles from "../../css/Seachbar.module.scss";

function ResultRow({ data }) {
    const { name, type, m_sid, src } = data;
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
            return <BsTagFill style={{ height: "1.4rem" }} />;
        } else if (type === "title") {
            return (
                <div className={rect_wrap}>
                    <img src={`${sharingIMGS}/${src}`} alt="post" />
                </div>
            );
        } else if (type === "member") {
            return (
                <div className={img_wrap}>
                    <img
                        src={`${imgSrc}/member/${src}`}
                        alt="avatar"
                        width="100%"
                    />
                </div>
            );
        }
    };

    const nameEl = (type) => {
        if (type === "member") {
            return (
                <div className={member_wrap}>
                    <span style={{ lineHeight: "1.2rem" }}>{name}</span>
                    <span className={member_small}>#{m_sid}</span>
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
