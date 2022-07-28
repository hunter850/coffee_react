import { Fragment } from "react";
import NavBar from "../../component/NavBar";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
// import Carousel from "../../component/FrontPages/Carousel/Carousel";
import HotFoods from "../../component/FrontPages/HotFoods/HotFoods";
import LatestNews from "../../component/FrontPages/LatestNews/LatestNews";
import StarProducts from "../../component/FrontPages/StarProducts/StarProducts";
import GoodCourse from "../../component/FrontPages/GoodCourse/GoodCourse";
import "./FrontPage.css";

function FrontPage() {
    return (
        <Fragment>
            <NavBar />
            <Carousel
                imgs={[
                    "http://localhost:3500/images/frontpage/banner/banner-product.png",
                    "http://localhost:3500/images/frontpage/banner/banner-food.png",
                    "http://localhost:3500/images/frontpage/banner/banner-course1.png",
                    "http://localhost:3500/images/frontpage/banner/banner-course2.png",
                ]} height={700}
            />
            {/* <Carousel /> */}
            <HotFoods />
            <LatestNews bagcolorblue={"#324A59"} latesttitlecolor={"#FFFFFF"} />
            {/* <LatestNews/> */}
            <StarProducts />
            <GoodCourse />
        </Fragment>
    );
}

export default FrontPage;
