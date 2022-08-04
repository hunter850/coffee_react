import React from "react";
import styles from "../../css/Comment.module.scss";

import useTimeAbout from "../../../../hooks/useTimeAbout";

function Reply({ data }) {
    const { member_sid, nickname, content } = data;

    const nowTime = useTimeAbout();

    const { } = styles;

    return (
        <div style={{ marginLeft: "3rem" }}>
            <span>{nickname}</span>
            <span> {content}</span>
            <p>{nowTime("2022-08-04 15:50:00")}</p>
            <p>{nowTime("2022-08-04 00:00:00")}</p>
            <p>{nowTime("2022-08-03 12:00:00")}</p>
            <p>{nowTime("2022-07-02")}</p>
            <p>{nowTime("2022-01-05")}</p>
            <p>{nowTime("2021-09-05")}</p>
            <p>{nowTime("2021-08-30")}</p>
            <p>{nowTime("2021-08-06")}</p>
            <p>{nowTime("2021-08-05")}</p>
            <p>{nowTime("2021-08-04")}</p>
            <p>{nowTime("2021-07-05")}</p>
            <p>{nowTime("2020-01-05")}</p>
        </div>
    );
}

export default Reply;
