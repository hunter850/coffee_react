import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar";
import ManageHeader from "../../component/Course/CourseManage/ManageHeader/ManageHeader";
import List from "../../component/Course/CourseManage/List/List";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";
import { courseDataGet } from "../../config/api-path";
import numberConvertString from "../../component/Course/helper/numberConvertString";

const CourseManage = () => {
    const [courseManageData, setCourseManageData] = useState([]);
    // console.log(courseManageData);
    const courseManageDataGet = async () => {
        const res = await axios.get(courseDataGet);
        //lv資料數字轉中文
        numberConvertString(res.data);
        setCourseManageData(res.data);
    };
    useEffect(() => {
        courseManageDataGet();
    }, []);

    const el = (
        <Fragment>
            <div style={{ backgroundColor: "#E3E7E7", minWidth: "1440px" }}>
                <NavBar />
                <div className="ManageHeader">
                    <ManageHeader />
                </div>
                <Sort
                    sortclass={"sortGrey"}
                    courseManageData={courseManageData}
                />
                <div className="container" style={{ paddingBottom: 104 }}>
                    {courseManageData.map((v, i) => {
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
            </div>
        </Fragment>
    );

    return el;
};

export default CourseManage;
