import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar";
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
            <h2 className="color">首頁</h2>
            <Carousel />
            <HotFoods />
            <LatestNews />
            <StarProducts />
            <GoodCourse />
        </Fragment>
    );
}

export default FrontPage;
