import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Card from "../../component/Item/Card/Card";
import Path from "../../component/Item/Path/Path";
import Header from "../../component/Course/Header/Header";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";

// 排序用的function
const priceAsc = (a, b) => {
    return a.course_price - b.course_price;
};
const priceDesc = (a, b) => {
    return b.course_price - a.course_price;
};
const levelAsc = (a, b) => {
    return a.course_level - b.course_level;
};
const levelDesc = (a, b) => {
    return b.course_level - a.course_level;
};
// 資料庫course_level 轉 中文 function
const numberConvertString = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (Number(data[i].course_level) === 1) {
            data[i].course_level = "初級";
        }
        if (Number(data[i].course_level) === 2) {
            data[i].course_level = "中級";
        }
        if (Number(data[i].course_level) === 3) {
            data[i].course_level = "高級";
        }
    }
};

const Course = () => {
    // 排序下拉選單的狀態 - 狀態提升放這邊
    const [sortData, setSortData] = useState("");
    // Header搜尋框的狀態 - 狀態提升放這邊
    const [searchInp, setSearchInp] = useState("");
    // 渲染卡片內容用的狀態
    const [courseData, setCourseData] = useState([]);
    // 搜尋框值清空時渲染用的狀態
    const [courseDataCopy, setCourseDataCopy] = useState([]);

    // console.log(courseData);

    // 排序 - 價錢低到高
    if (sortData === "priceAsc") {
        courseData.sort(priceAsc);
    }
    // 排序 - 價錢高到低
    if (sortData === "priceDesc") {
        courseData.sort(priceDesc);
    }

    // 排序 - 難度初級到高級
    if (sortData === "levelAsc") {
        courseData.sort(levelAsc);
        // 這裡因為是深拷貝的資料,所以必須重新把數字轉換成中文
        numberConvertString(courseData);
    }
    // 排序 - 難度高級到初級
    if (sortData === "levelDesc") {
        courseData.sort(levelDesc);
        // 這裡因為是深拷貝的資料,所以必須重新把數字轉換成中文
        numberConvertString(courseData);
    }
    // 搜尋框為空值時重置原始資料
    useEffect(() => {
        if (searchInp === "") {
            setCourseData(courseDataCopy);
        }
    }, [searchInp, courseDataCopy]);

    useEffect(() => {
        axios
            .get("http://localhost:3500/coffee-course-get")
            .then((res) => {
                // 深拷貝一組沒有把數字轉換成中文的資料
                // 難度排序時使用
                const newSortData = JSON.parse(JSON.stringify(res.data));
                // console.log(sortData);

                if (sortData === "levelAsc") {
                    return setCourseData(newSortData);
                }
                if (sortData === "levelDesc") {
                    return setCourseData(newSortData);
                }
                // 將資料庫的course_level數字轉換成中文
                numberConvertString(res.data);
                const newCourseData = res.data;
                setCourseData(newCourseData);
                setCourseDataCopy(newCourseData);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [sortData]);

    const el = (
        <Fragment>
            <div className="Course-container">
                <NavBar />
                <Path pathObj={{ path: ["．課程資訊"] }} />
                <Header
                    courseData={courseData}
                    setCourseData={setCourseData}
                    searchInp={searchInp}
                    setSearchInp={setSearchInp}
                />
                <Sort
                    courseData={courseData}
                    sortData={sortData}
                    setSortData={setSortData}
                />
                <div className="container">
                    <div className="d-flex f-w card-wrap">
                        <Link to="/course/manage">
                            <Card
                                courseData={{
                                    course_level: "初級",
                                    course_name: "愛心拉花",
                                    course_content:
                                        "課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.456464545",
                                    course_price: "1000",
                                    course_sid: 1,
                                }}
                            />
                        </Link>

                        {courseData.map((v, i) => {
                            return (
                                <Link
                                    to={`/course/detailed/${v.course_sid}`}
                                    key={v.course_sid}
                                >
                                    <Card
                                        courseData={{
                                            course_level: v.course_level,
                                            course_name: v.course_name,
                                            course_content: v.course_content,
                                            course_price: v.course_price,
                                            course_sid: v.course_sid,
                                        }}
                                    />
                                </Link>
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
