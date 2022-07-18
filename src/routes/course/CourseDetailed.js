import { Fragment, useEffect } from "react";
import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
import Banner from "../../component/Course/CourseDetailed/Banner/Banner";
import CoursePath from "../../component/Course/CourseDetailed/CoursePath/CoursePath";
import CourseContent from "../../component/Course/CourseDetailed/CourseContent/CourseContent";
import axios from "axios";

const CourseDetailed = () => {
    // 開發中
    useEffect(() => {
        axios.get("http://localhost:3500/coffee-course-get").then((res) => {
            // console.log(res.data);
        });
    }, []);
    // 開發中
    const el = (
        <Fragment>
            <div className="CourseDetailed-container">
                <NavBar />
                <Path
                    pathObj={{ path: ["．課程資訊", "．愛心拉花"] }}
                    backgroundColor={"#fff"}
                />
                <Carousel />
                <Banner />
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
