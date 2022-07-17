import React from "react";
import "./Sort.css";

export default function Sort({
    sortclass = "Coursesort",
    courseData = [],
    sortData,
    setSortData,
}) {
    const sortCourseData = (e) => {
        setSortData(e);
        // console.log(e);
    };
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
                    <select
                        className={sortclass}
                        value={sortData}
                        onChange={(e) => sortCourseData(e.target.value)}
                    >
                        <option value="">排序方式</option>
                        <option value="levelAsc">
                            初級&nbsp;&gt;&nbsp;高級
                        </option>
                        <option value="levelDesc">
                            高級&nbsp;&gt;&nbsp;初級
                        </option>
                        <option value="priceAsc">
                            價錢低&nbsp;&gt;&nbsp;高
                        </option>
                        <option value="priceDesc">
                            價錢高&nbsp;&gt;&nbsp;低
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}
