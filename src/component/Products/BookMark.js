import React from "react";
import Btn from "../Item/Btn/Btn";
import "./BookMark.scss";

function BookMark() {
    return (
        <>
            <ul className="products_Bookmark">
                <li>
                    <Btn children={"全部"} width={"76px"} />
                </li>
                <li>
                    <Btn children={"濾掛式咖啡"} width={"130px"} />
                </li>
                <li>
                    <Btn children={"咖啡豆"} width={"94px"} />
                </li>
                <li>
                    <Btn children={"咖啡用具"} width={"112px"} />
                </li>
                <li>
                    <Btn children={"周邊及器具"} width={"130px"} />
                </li>
                <li>
                    <Btn children={"禮盒"} width={"76px"} />
                </li>
                <li>
                    <Btn children={"電子禮物卡"} width={"130px"} />
                </li>
            </ul>
        </>
    );
}

export default BookMark;
