/* eslint-disable react-hooks/exhaustive-deps */
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
import { courseDataGet } from "../../config/api-path";
// import { courseDataFkGet } from "../../config/api-path";

const CourseDetailed = () => {
    const [contentScrollHeight, setContentScrollHeight] = useState({ CourseComtentObject: 0 });
    // console.log(contentScrollHeight);
    // 得到的sid與資料庫sid相同的資料
    const [courseDetailedData, setCourseDetailedData] = useState([]);
    // 外鍵資料
    // const [courseDataFk, setCourseDataFk] = useState([]);
    // 確認有拿到資料,才渲染
    const [start, setStart] = useState(false);
    // 對照sid當筆資料的價格 - 狀態提升
    const [courseDataPrice, setCourseDataPrice] = useState(0);

    // 取得當前click卡片的sid
    const { sid } = useParams();
    // 外鍵 - 取得當前sid外鍵資料
    // useEffect(() => {
    //     axios.get(courseDataFkGet)
    //         .then((res) => {
    //             const newCourseDataFk = res.data.filter((v, i) => {
    //                 return Number(v.course_sid) === Number(sid);
    //             });
    //             setCourseDataFk(newCourseDataFk);
    //             // console.log(newCourseDataFk);
    //         });
    // }, []);
    // console.log(courseDataFk);

    // console.log(sid);

    // console.log(courseDetailedData);
    // console.log(window.location.href);
    useEffect(() => {
        //一進頁面到top 0
        window.scrollTo(0, 0);
    }, []);

    // 取得當前sid資料
    useEffect(() => {
        axios.get(courseDataGet)
            .then((res) => {
                // console.log(res.data);
                const newCourseGetData = res.data.filter((v, i) => {
                    return Number(v.course_sid) === Number(sid);
                });
                // 從get來的資料中只篩選出指定sid當筆資料
                setCourseDetailedData(newCourseGetData);
                // 確認得到資料了才給渲染,否則會出錯
                setStart(true);

                setCourseDataPrice(start ? courseDetailedData[0].course_price : '');
            });
    }, [sid, start]);

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
                    <CourseContent courseDataPrice={courseDataPrice} setContentScrollHeight={setContentScrollHeight} contentScrollHeight={contentScrollHeight} />
                </div>
            </div>
        </Fragment>
    );

    return el;
};

export default CourseDetailed;
