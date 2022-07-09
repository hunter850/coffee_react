import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
import Banner from "../../component/Course/CourseDetailed/Banner/Banner";
import CoursePath from "../../component/Course/CourseDetailed/CoursePath/CoursePath";
import CourseContent from "../../component/Course/CourseDetailed/CourseContent/CourseContent";


const CourseDetailed = () => {
    const el = (
        <Fragment>
            <div style={{ backgroundColor: "#fff", minWidth: '1440px' }} >
                <NavBar />
                <Path pathObj={{ path: ['．課程資訊', '．愛心拉花'] }} backgroundColor={'#fff'} />
                <Carousel />
                <Banner />
            </div>
            <div style={{ backgroundColor: '#FBFBFA' }}>
                <div className="container d-flex" style={{ justifyContent: 'space-between' }} >
                    <CoursePath />
                    <CourseContent />
                </div>
            </div>
        </Fragment>
    );

    return el;
};

export default CourseDetailed;