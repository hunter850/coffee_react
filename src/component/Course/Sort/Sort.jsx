import React from "react";
import "./Sort.css";

export default function Sort({ sortclass = "Coursesort", courseData }) {
    return (
        <div className="container ">
            <div className="CourseSort-wrap ">
                <div className="Coursesort-txt">
                    <p>
                        搜尋結果符合條件&nbsp;
                        <span className="num-color">{courseData.length}</span>
                        &nbsp;項目
                    </p>
                </div>
                <div>
                    <select className={sortclass}>
                        <option>排序方式</option>
                        <option>初級&nbsp;&gt;&nbsp;高級</option>
                        <option>高級&nbsp;&gt;&nbsp;初級</option>
                        <option>價錢低&nbsp;&gt;&nbsp;高</option>
                        <option>價錢高&nbsp;&gt;&nbsp;低</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
