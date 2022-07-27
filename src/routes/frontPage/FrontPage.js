import { Fragment } from "react";
import NavBar from "../../component/NavBar";
// import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
import Carousel from "../../component/FrontPages/Carousel/Carousel";
import HotFoods from "../../component/FrontPages/HotFoods/HotFoods";
import LatestNews from "../../component/FrontPages/LatestNews/LatestNews";
import StarProducts from "../../component/FrontPages/StarProducts/StarProducts";
import GoodCourse from "../../component/FrontPages/GoodCourse/GoodCourse";
import "./FrontPage.css";

function FrontPage() {
    return (
        <Fragment>
            <NavBar />
            {/* <Carousel
                imgs={[
                    "https://picsum.photos/id/249/1440/500",
                    // "../../images/frontPage/banner/"
                    "https://picsum.photos/id/1014/1440/500",
                    "https://picsum.photos/id/120/1440/500",
                    "https://picsum.photos/id/216/1440/500",
                    "https://picsum.photos/id/227/1440/500",
                ]}
            /> */}
            <Carousel />
            <HotFoods />
            <LatestNews />
            <StarProducts />
            <GoodCourse />
        </Fragment>
    );
}

export default FrontPage;
