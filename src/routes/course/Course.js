import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Card from "../../component/Item/Card/Card";
import Path from "../../component/Item/Path/Path";
import Header from "../../component/Course/Header/Header";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";

const Course = () => {
    // Header搜尋框的狀態 - 狀態提升放這邊
    const [searchInp, setSearchInp] = useState("");
    // 渲染卡片內容用的狀態
    const [courseData, setCourseData] = useState([]);
    // 搜尋框值清空時渲染用的狀態
    const [courseDataCopy, setCourseDataCopy] = useState([]);
    // 搜尋框為空值時重新渲染
    useEffect(() => {
        if (searchInp === "") {
            setCourseData(courseDataCopy);
        }
    }, [searchInp, courseDataCopy]);

    useEffect(() => {
        axios
            .get("http://localhost:3600/coffee")
            .then((res) => {
                // console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    if (Number(res.data[i].course_level) === 1) {
                        res.data[i].course_level = "初級";
                    }
                    if (Number(res.data[i].course_level) === 2) {
                        res.data[i].course_level = "中級";
                    }
                    if (Number(res.data[i].course_level) === 3) {
                        res.data[i].course_level = "高級";
                    }
                }
                const newCourseData = res.data;
                setCourseData(newCourseData);
                setCourseDataCopy(newCourseData);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    // console.log(courseData);

    const el = (
        <Fragment>
            <div className="Course-container">
                <NavBar />
                <Path pathObj={{ path: ["．課程資訊"] }} />
                <Header
                    courseData={courseData}
                    setCourseData={setCourseData}
                    setSearchInp={setSearchInp}
                    searchInp={searchInp}
                />
                <Sort courseData={courseData} />
                <div className="container">
                    <div className="d-flex f-w card-wrap">
                        <Link to="/course/detailed/001">
                            <Card
                                courseData={{
                                    lv: "初級",
                                    title: "愛心拉花",
                                    txt: "課程介紹範例文字與範圍課程介紹範例文字與範圍課程介紹範例文字與範圍測試範測試範測試",
                                    price: "1000",
                                }}
                            />
                        </Link>
                        <Link to="/course/manage">
                            <Card
                                courseData={{
                                    lv: "初級",
                                    title: "愛心拉花",
                                    txt: "課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.",
                                    price: "1000",
                                }}
                            />
                        </Link>

                        {courseData.map((v, i) => {
                            return (
                                <Card
                                    key={v.course_sid}
                                    courseData={{
                                        lv: v.course_level,
                                        title: v.course_name,
                                        txt: v.course_content,
                                        price: v.course_price,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
    return el;
};

export default Course;
