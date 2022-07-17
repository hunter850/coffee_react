import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Card from "../../component/Item/Card/Card";
import Path from "../../component/Item/Path/Path";
import Header from "../../component/Course/Header/Header";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";

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
        for (let i = 0; i < courseData.length; i++) {
            if (Number(courseData[i].course_level) === 1) {
                courseData[i].course_level = "初級";
            }
            if (Number(courseData[i].course_level) === 2) {
                courseData[i].course_level = "中級";
            }
            if (Number(courseData[i].course_level) === 3) {
                courseData[i].course_level = "高級";
            }
        }
    }
    // 排序 - 難度高級到初級
    if (sortData === "levelDesc") {
        courseData.sort(levelDesc);
        // 這裡因為是深拷貝的資料,所以必須重新把數字轉換成中文
        for (let i = 0; i < courseData.length; i++) {
            if (Number(courseData[i].course_level) === 1) {
                courseData[i].course_level = "初級";
            }
            if (Number(courseData[i].course_level) === 2) {
                courseData[i].course_level = "中級";
            }
            if (Number(courseData[i].course_level) === 3) {
                courseData[i].course_level = "高級";
            }
        }
    }
    // 搜尋框為空值時重置原始資料
    useEffect(() => {
        if (searchInp === "") {
            setCourseData(courseDataCopy);
        }
    }, [searchInp, courseDataCopy]);

    useEffect(() => {
        axios
            .get("http://localhost:3600/coffee")
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
    }, [sortData]);

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
                <Sort
                    courseData={courseData}
                    sortData={sortData}
                    setSortData={setSortData}
                />
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
