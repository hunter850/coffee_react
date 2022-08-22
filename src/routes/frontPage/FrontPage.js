import { Fragment, useState, useEffect } from "react";
import NavBar from "../../component/NavBar/NavBar";
import Carousel from "../../component/Course/CourseDetailed/Carousel/Carousel";
// import Carousel from "../../component/FrontPages/Carousel/Carousel";
import HotFoods from "../../component/FrontPages/HotFoods/HotFoods";
import LatestNews from "../../component/FrontPages/LatestNews/LatestNews";
import StarProducts from "../../component/FrontPages/StarProducts/StarProducts";
import GoodCourse from "../../component/FrontPages/GoodCourse/GoodCourse";
import Footer from "../../component/Footer";
import Modal from "../../../src/component/Modal/Modal";
import frontpagecouponimg from "../../images/frontpage/frontpagecoupon.png";
import "./FrontPage.css";
import { Link } from "react-router-dom";
import ChatBot from "../../component/Bot/ChatBot";
// import Spinnerwrap from "../../component/Item/SpinnerWrap/SpinnerWrap";
import useData from "../../hooks/useData";

function FrontPage() {
    const [frontpagecoupon, setFrontpagecoupon] = useData("frontpagecoupon");
    // const [isOpen, setIsOpen] = useState(false);
    // useEffect(() => {
    //     if (frontpagecoupon) {
    //         setIsOpen(true);
    //     }
    // }, [frontpagecoupon]);
    return (
        <Fragment>
            {/* <Spinnerwrap /> */}
            <NavBar />
            <Carousel
                imgs={[
                    "http://localhost:3500/images/frontpage/banner/banner-home.png",
                    "http://localhost:3500/images/frontpage/banner/banner-product.jpg",
                    "http://localhost:3500/images/frontpage/banner/banner-food.jpg",
                    "http://localhost:3500/images/frontpage/banner/banner-course1.jpg",
                    "http://localhost:3500/images/frontpage/banner/banner-course2.jpg",
                ]}
                height={700}
                // isAuto={false}
            />
            <HotFoods />
            <LatestNews bagcolorblue={"#324A59"} latesttitlecolor={"#FFFFFF"} />
            <StarProducts />
            <GoodCourse />
            <ChatBot />
            <Footer />
            <Modal isOpen={frontpagecoupon} setIsOpen={setFrontpagecoupon}>
                <Modal.Body component="div" style={{ padding: "0px" }}>
                    <div>
                        {/* <Link to="/getcoupon"> */}
                        <img
                            style={{ width: "588px" }}
                            src={frontpagecouponimg}
                            alt=""
                        />
                        {/* </Link> */}
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

export default FrontPage;
