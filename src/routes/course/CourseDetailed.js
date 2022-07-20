/* eslint-disable prettier/prettier */
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
import Banner from "../../component/Course/CourseDetailed/Banner/Banner";
import CoursePath from "../../component/Course/CourseDetailed/CoursePath/CoursePath";
import CourseContent from "../../component/Course/CourseDetailed/CourseContent/CourseContent";
import axios from "axios";

const CourseDetailed = () => {
    // 得到的sid與資料庫sid相同的資料
    const [courseDetailedData, setCourseDetailedData] = useState([]);
    // 確認有拿到資料,才渲染
    const [start, setStart] = useState(false);

    // 點哪一張課程卡片進來的 sid
    const { sid } = useParams();

    // console.log(sid);

    // console.log(courseDetailedData);
    // console.log(window.location.href);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {

        axios.get("http://localhost:3500/coffee-course-get")
            .then((res) => {
                // console.log(res.data);
                const newCourseGetData = res.data.filter((v, i) => {
                    return Number(v.course_sid) === Number(sid);
                });
                // 從get來的資料中只篩選出指定sid當筆資料
                setCourseDetailedData(newCourseGetData);
                // 確認得到資料了才給渲染,否則會出錯
                setStart(true);
            });
    }, [sid]);

    const el = (
        <Fragment>
            <div className="CourseDetailed-container">
                <NavBar />
                <Path
                    pathObj={{
                        path: [
                            "．課程資訊",
                            `．${start ? courseDetailedData[0].course_name : ""
                            }`,
                        ],
                    }}
                    backgroundColor={"#fff"}
                />
                <Carousel />
                <Banner courseDetailedData={courseDetailedData} start={start} />
            </div>
            <div style={{ backgroundColor: "#FBFBFA" }}>
                <div className="container d-flex CourseContent-wrap">
                    <CoursePath />
                    <CourseContent />
                </div>
            </div>
        </Fragment>
    );

    return el;
};

export default CourseDetailed;
