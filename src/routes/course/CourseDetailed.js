import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import Path from "../../component/Item/Path/Path";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
import Banner from "../../component/Course/CourseDetailed/Banner/Banner";

const CourseDetailed = () => {
    const el = (
        <Fragment>
            <div style={{ backgroundColor: "#FCFAF7", minWidth: '1440px' }} >
                <NavBar />
                <Path pathObj={{ path: ['．課程資訊', '．愛心拉花'] }} />
                <Carousel />
                <Banner />
            </div>
        </Fragment>
    );

    return el;
};

export default CourseDetailed;