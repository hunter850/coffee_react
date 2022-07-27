/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar";
import ManageHeader from "../../component/Course/CourseManage/ManageHeader/ManageHeader";
import List from "../../component/Course/CourseManage/List/List";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";
import { courseDataGet } from "../../config/api-path";
import numberConvertString from "../../component/Course/helper/numberConvertString";
import {
    priceAsc,
    priceDesc,
    levelAsc,
    levelDesc,
} from "../../component/Course/helper/sort";
import { chunk } from "../../component/Course/helper/chunk";

const CourseManage = () => {
    const [courseManageData, setCourseManageData] = useState([]);
    const [courseManageDataCopy, setCourseManageDataCopy] = useState([]);
    console.log(courseManageData);
    // console.log(courseManageDataCopy);
    //預設第一頁
    const [pageNow, setPageNow] = useState(1);
    //預設一頁幾筆
    const [perPage, setPerPage] = useState(7);
    // 總頁數,等伺服器抓完資料才知道多少(didMount時決定)
    const [pageTotal, setPageTotal] = useState(0);

    const courseManageDataGet = async () => {
        const res = await axios.get(courseDataGet);
        const newCourseData = JSON.parse(JSON.stringify(res.data));
        //lv資料數字轉中文
        numberConvertString(res.data);
        // setCourseManageData(res.data);
        // 深拷貝過的資料,保留lv的數字,供等級排序使用
        setCourseManageDataCopy(newCourseData);
        // 將資料切割成每一頁要展示的陣列,渲染出來
        const pageArray = chunk(res.data, perPage);
        if (pageArray.length > 0) {
            setPageTotal(pageArray.length);
            setCourseManageData(pageArray);
        }
    };
    useEffect(() => {
        courseManageDataGet();
    }, []);

    const el = (
        <Fragment>

            <div className="CourseManage-container">
                <NavBar />
                <div className="ManageHeader">
                    <ManageHeader />
                </div>
                <Sort sortclass={"sortGrey"} courseData={courseManageData} />
                <div className="container" style={{ paddingBottom: 104 }}>
                    {courseManageData.length > 0 &&
                        courseManageData[pageNow - 1].map((v, i) => {
                            return (
                                <List
                                    key={v.course_sid}
                                    courseData={{
                                        course_level: v.course_level,
                                        course_name: v.course_name,
                                        course_price: v.course_price,
                                        course_img_s: v.course_img_s,
                                    }}
                                />
                            );
                        })}
                </div>
                <div className="d-flex f-jcc">
                    {Array(pageTotal)
                        .fill(1)
                        .map((v, i) => {
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setPageNow(i + 1);
                                    }}
                                    className={`course-page-btn ${pageNow === i + 1
                                        ? "course-manage-page-btn-focus"
                                        : ""
                                        }`}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                </div>
            </div>

        </Fragment>
    );

    return el;
};

export default CourseManage;
