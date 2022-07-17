import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Card from "../../component/Item/Card/Card";
import Path from "../../component/Item/Path/Path";
import Header from "../../component/Course/Header/Header";
import Sort from "../../component/Course/Sort/Sort";
import axios from "axios";

const Course = () => {
    const [courseData, setCourseData] = useState([]);
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
                setCourseData(res.data);
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
                <Header />
                <Sort />
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
