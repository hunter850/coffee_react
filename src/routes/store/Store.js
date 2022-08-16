import { Fragment, useState, useEffect, useRef } from "react";
import NavBar from "../../component/NavBar/NavBar";
import ChatBot from "../../component/Bot/ChatBot";
import React from "react";
import "./scss/Store.css";
// import "./scss/Store.scss";
import StoreVideo from "../../images/Coupon/store_video.mp4";
import { StoreLoopVideo } from "../store/Components/StoreLoopVideo";
import GoogleMapReact from "google-map-react";
import SimpleMap from "../store/Components/SimpleMap";
import Faq from "react-faq-component";
import Faqdata from "../store/Components/Faqdata";
import {
    ScrollMotionContainer,
    ScrollMotionItem,
} from "../store/Components/ScrollMotion";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../component/Bot/config";
import MessageParser from "../../component/Bot/MessageParser.js";
import ActionProvider from "../../component/Bot/ActionProvider.js";
import "../../component/Bot/Bot.css";
import Footer from "../../component/Footer";
import {
    StoreLoadingWrapLeft,
    Box1,
    Box2,
    Box3,
} from "../store/Components/StoreLoadingWrapLeft";
import {
    StoreLoadingWrapRight,
    Box4,
    Box5,
    Box6,
} from "../store/Components/StoreLoadingWrapRight";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Store() {
    const [loading, setLoading] = useState(false);
    const [botOpen, setBotOpen] = useState(false);
    const [chatBot, setChatBot] = useState(null);
    const Stores = [
        {
            id: 1,
            storeName: "0+B 光復店",
            storeRoad: "光復南路300號",
            storeBlock: "大安區, 台北市, 106台灣",
            center: {
                lat: 25.03962792542701,
                lng: 121.55742720101652,
            },
        },
        {
            id: 2,
            storeName: "0+B 光復店",
            storeRoad: "復興南路一段323號",
            storeBlock: "大安區, 台北市, 106台灣",
            center: {
                lat: 25.034320914178288,
                lng: 121.54372226899777,
            },
        },
        {
            id: 3,
            storeName: "0+B 龍門店",
            storeRoad: "忠孝東路四段134號",
            storeBlock: "大安區, 台北市, 106台灣",
            center: {
                lat: 25.041947238558986,
                lng: 121.54824003860637,
            },
        },
        {
            id: 4,
            storeName: "0+B 永康店",
            storeRoad: "永康街2號2樓",
            storeBlock: "大安區, 台北市, 106台灣",
            center: {
                lat: 25.03475717724878,
                lng: 121.52959140047166,
            },
        },
        {
            id: 5,
            storeName: "0+B 敦和店",
            storeRoad: "敦化南路二段263號",
            storeBlock: "大安區, 台北市, 106台灣",
            center: {
                lat: 25.027059214520953,
                lng: 121.54864470715766,
            },
        },
        {
            id: 6,
            storeName: "0+B 微風南京店",
            storeRoad: "南京東路三段337號",
            storeBlock: "松山區, 台北市, 106台灣",
            center: {
                lat: 25.05377904290978,
                lng: 121.54832427510259,
            },
        },
        {
            id: 7,
            storeName: "0+B 南京建國店",
            storeRoad: "南京東路三段1號",
            storeBlock: "中山區, 台北市, 106台灣",
            center: {
                lat: 25.054012307531703,
                lng: 121.53708045485325,
            },
        },
        {
            id: 8,
            storeName: "0+B 南京三民店",
            storeRoad: "南京東路五段171號",
            storeBlock: "松山區, 台北市, 106台灣",
            center: {
                lat: 25.05323475716153,
                lng: 121.56325881561968,
            },
        },
    ];
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    if (loading) {
        return (
            <>
                <NavBar />
                <div className="storeLoadingBox">
                    <div className="StoreLoading">
                        <div className="StoreLoadingWrap00">
                            <img
                                src={require("../../images/Coupon/0Bicon.png")}
                                alt=""
                                className="animateStore popStore"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
    };

    return (
        <Fragment>
            <NavBar />
            <ChatBot></ChatBot>
            <div className="StoreContainer">
                <div className="storeLoadingBox">
                    <div className="StoreLoading">
                        <div className="StoreLoadingWrap00">
                            <img
                                src={require("../../images/Coupon/0+B(白).png")}
                                alt=""
                            />
                        </div>
                        <div className="StoreLoadingWrap01">
                            <StoreLoadingWrapLeft {...settings}>
                                <Box1>
                                    <div className="LeftIMG01"></div>
                                </Box1>
                                <Box2>
                                    <div className="LeftIMG02"></div>
                                </Box2>
                                <Box3>
                                    <div className="LeftIMG03"></div>
                                </Box3>
                            </StoreLoadingWrapLeft>
                        </div>
                        <div className="StoreLoadingWrap02">
                            <StoreLoadingWrapRight {...settings}>
                                <Box4>
                                    <div className="LeftIMG04"></div>
                                </Box4>
                                <Box5>
                                    <div className="LeftIMG05"></div>
                                </Box5>
                                <Box6>
                                    <div className="LeftIMG06"></div>
                                </Box6>
                            </StoreLoadingWrapRight>
                        </div>
                    </div>
                </div>
                <div className="myStoreVideo">
                    <StoreLoopVideo
                        src={StoreVideo}
                        muted={true}
                        autoplay={true}
                        ratio="16_9"
                        loop={true}
                        id="myVideo1"
                    />
                </div>
                <ScrollMotionContainer element="div" className="video_session">
                    <div className="video_text">
                        <ScrollMotionItem element="p" type="up">
                            好咖啡，好食物，好時光
                        </ScrollMotionItem>
                        <ScrollMotionItem element="p" type="up">
                            需要咖啡的日子，我們都在，請在這裡享受美味和快樂。
                        </ScrollMotionItem>
                    </div>
                </ScrollMotionContainer>

                <div className="Store_bg">
                    <div>
                        <ScrollMotionContainer
                            element="div"
                            className="banner_session"
                        >
                            <div>
                                <ScrollMotionItem
                                    element="img"
                                    src={require("../../images/Coupon/aboutTitle.png")}
                                    alt=""
                                    type="up"
                                />
                            </div>
                            <div className="aboutSec">
                                <ScrollMotionItem element="p" type="up">
                                    關於我們
                                </ScrollMotionItem>
                            </div>
                        </ScrollMotionContainer>
                    </div>
                </div>
                <div className="banner_photos">
                    <ScrollMotionContainer
                        element="div"
                        className="banner_photos_part1"
                    >
                        <div className="banner_session_01">
                            <ScrollMotionItem
                                element="img"
                                src={require("../../images/Coupon/store_img1.png")}
                                alt=""
                                type="up"
                            />
                        </div>
                        <div className="banner_session_02">
                            <ScrollMotionItem
                                element="p"
                                type="up"
                                className="text_sec_01"
                            >
                                關於城市裡的咖啡因
                            </ScrollMotionItem>
                            <ScrollMotionItem
                                element="p"
                                type="up"
                                className="text_sec_02"
                            >
                                “0+B ”於 2022
                                年春季開業，是一家位於台北熙來攘往的咖啡和餐飲店。
                                <br />
                                <br />
                                如果你累了，願你為一杯香濃咖啡而停留，
                                <br />
                                一間溫暖的小店而駐足。
                                <br />
                                休息後，再出發。
                                <br />
                            </ScrollMotionItem>
                        </div>
                    </ScrollMotionContainer>

                    <ScrollMotionContainer
                        element="div"
                        className="banner_photos_part2"
                    >
                        <ScrollMotionItem
                            element="img"
                            src={require("../../images/Coupon/bimg02-1.png")}
                            alt=""
                            type="up"
                        />
                    </ScrollMotionContainer>

                    <ScrollMotionContainer
                        element="div"
                        className="banner_photos_part3"
                    >
                        <ScrollMotionItem
                            element="img"
                            src={require("../../images/Coupon/bsimg3.png")}
                            alt=""
                            type="up"
                        />
                    </ScrollMotionContainer>
                </div>
                <div className="quality_bg">
                    <div className="quality">
                        <div className="dsplay_flex_mm pt53">
                            <ScrollMotionContainer element="div">
                                <ScrollMotionItem
                                    element="img"
                                    src={require("../../images/Coupon/store_Component_16.png")}
                                    alt=""
                                    type="up"
                                />
                            </ScrollMotionContainer>

                            <ScrollMotionContainer element="div">
                                <ScrollMotionItem element="p" type="up">
                                    0+B的承諾
                                </ScrollMotionItem>
                            </ScrollMotionContainer>

                            <ScrollMotionContainer
                                element="div"
                                className="quality_main"
                            >
                                <ScrollMotionItem
                                    element="div"
                                    className="quality_main_01"
                                    type="right"
                                >
                                    <div className="quality_main_01_a">
                                        <div>
                                            <img
                                                src={require("../../images/Coupon/bg_tips_num_01.png")}
                                                alt=""
                                            />
                                        </div>
                                        <div className="d_center">
                                            <p>傳遞溫柔的味道</p>
                                        </div>
                                    </div>
                                    <div className="quality_main_01_b">
                                        <p>
                                            遵循著用好的食材與簡單的元素，拼湊出令人回味的餐點。希望每位客人都能感到幸福。
                                        </p>
                                    </div>
                                    <div className="quality_main_01_c">
                                        <img
                                            src={require("../../images/Coupon/img_tips_05.png")}
                                            alt=""
                                        />
                                    </div>
                                </ScrollMotionItem>

                                <ScrollMotionItem
                                    element="div"
                                    className="quality_main_01"
                                    type="right"
                                >
                                    <div className="quality_main_01_a">
                                        <div>
                                            <img
                                                src={require("../../images/Coupon/bg_tips_num_02.png")}
                                                alt=""
                                            />
                                        </div>
                                        <div className="d_center">
                                            <p>貼近你疲憊的心</p>
                                        </div>
                                    </div>
                                    <div className="quality_main_01_b">
                                        <p>
                                            我們的創立原因之一，是想讓大家能有更舒服的空間享用一杯好咖啡，享受多樣性且療癒的餐點。
                                        </p>
                                    </div>
                                    <div className="quality_main_01_c">
                                        <img
                                            src={require("../../images/Coupon/img_tips_04.png")}
                                            alt=""
                                        />
                                    </div>
                                </ScrollMotionItem>

                                <ScrollMotionItem
                                    element="div"
                                    className="quality_main_01"
                                    type="right"
                                >
                                    <div className="quality_main_01_a">
                                        <div>
                                            <img
                                                src={require("../../images/Coupon/bg_tips_num_03.png")}
                                                alt=""
                                            />
                                        </div>
                                        <div className="a_center">
                                            <p>
                                                是一家讓你想說 <br />
                                                到家了的商店
                                            </p>
                                        </div>
                                    </div>
                                    <div className="quality_main_01_b">
                                        <p className="mt10">
                                            我們關心、觀察每位客人的需求，希望你比你來時更能帶著微笑回家。
                                        </p>
                                    </div>
                                    <div className="quality_main_01_c">
                                        <img
                                            src={require("../../images/Coupon/img_tips_01.png")}
                                            alt=""
                                        />
                                    </div>
                                </ScrollMotionItem>
                            </ScrollMotionContainer>
                        </div>
                    </div>
                </div>

                <ScrollMotionContainer
                    element="div"
                    className="Store_bg store_time "
                >
                    <ScrollMotionItem
                        element="div"
                        className="store_time_inner dsplay_flex_mm"
                        type="up"
                    ></ScrollMotionItem>
                </ScrollMotionContainer>

                <div className="GMapContainer">
                    <div id="map-container">
                        <div className="store-google-map">
                            <SimpleMap />
                        </div>
                    </div>
                </div>
            </div>
            <div className="storeFAQ">
                <div className="storeFAQInner">
                    <Faq
                        data={Faqdata}
                        styles={{
                            bgColor: "white",
                            titleTextColor: "#48482a",
                            rowTitleColor: "#78789a",
                            rowTitleTextSize: "large",
                            rowContentColor: "#48484a",
                            rowContentTextSize: "16px",
                            rowContentPaddingTop: "10px",
                            rowContentPaddingBottom: "10px",
                            rowContentPaddingLeft: "50px",
                            rowContentPaddingRight: "150px",
                            arrowColor: "red",
                        }}
                        config={{
                            animate: true,
                        }}
                    />
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default Store;
