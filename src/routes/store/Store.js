import { Fragment, useState, useEffect, useRef } from "react";
import NavBar from "../../component/NavBar/NavBar";
import React from "react";
import "./css/Store.css";
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

function Store() {
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
        if (botOpen) {
            setChatBot(
                <>
                    <div className="Chatbot_header">
                        <img
                            src={require("../../images/Coupon/ChatroomTitle.png")}
                            alt=""
                            width="120px"
                            height="40px"
                            style={{ margin: "0 auto" }}
                        />
                    </div>
                    <Chatbot
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                    />
                </>
            );
        } else {
            setChatBot(null);
        }
    }, [botOpen]);
    return (
        <Fragment>
            <NavBar />
            <div className="StoreContainer">
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
                                            遵循著用好的食材與簡單的元素，拼湊出令人回味的餐點。希望每一位客人都能感到幸福。
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
                                            我們關心、觀察每一位客人的需求，希望你比你來時更能帶著微笑回家。
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
            <div className="BotContainer">
        {chatBot}
        <button
            className="BotBTN react-chatbot-kit-chat-btn-send"
            onClick={() => setBotOpen(!botOpen)}
        >
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 66 66"
            >
                {" "}
                <image
                    id="image0"
                    width="66"
                    height="66"
                    x="0"
                    y="0"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                            AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAA
                            CXBIWXMAAAsTAAALEwEAmpwYAAAPLUlEQVR42s1beVyU1fr/nnfeGYZxgGEXlH0nZVEUTHK5XdTQ
                            0h9aahaZy7037VN2zepmtyzvr6xbmXptUVMjLb2uueDCmoAImhoosu/LsAoD8w6zvef+YfrBZJkZ
                            Buz7F7znmec85zvnPOc85/0OwTCAUuqVX1AUkZJ5yb+0qspNrda4MozAVcAwMgpeAgAEREV5tDME
                            TUTAVPh5echnz5xe4OvungOglhBChzJGMkQDF9TWNkacSE5ZXFhaEVNeVRVcVlkNvZ43LjhC4O0+
                            mgb6+RT7eY0+GR0ZcSIkODibEKL7QxMhl8u9z6RfXH06OS2mQd7k19ahEOt0D8ZMCIH7qFFwsJOB
                            MAx4Xo/2DgWq6xrQmz0AMAwDmY2VJsjXtzJsbNDhZ+c+sdfR0bHUXDPFLESk5eaOrCqv3XjyfOrc
                            gpJSR51O36udnUyGOTP+hHmxMRjp5AiJpSUIuRMCp+pGTV09EpPTcfD4Sai61X0HTQjGjQ3uio6M
                            2P9c3PxPZDLL8odKhEKhcPjxeOJbP51NWl5aWSOjtPcvRyQUYv6TT+BvLzwLmY31wH47u/DFjt04
                            euoc+vJ5FwG+XsopURHb161a+TEhpG1YiaCUkv/s+WFGZVXV52fSMoK12r6XrIVIhL/EL8KK5xYZ
                            1QfP8/j2h0P4es8+6PT6fm0lEkuEPhJYtOrFxW9GhoWdNiWHsCaQYH345NmNh04mvtQgbxIOZD87
                            ZrrRJAB3csKKJc+gXt6Io6fO9mvLcSpkX74WUF1bd+SFZ+K+p5SuNJYMo2ZERV1d4O79h746djpp
                            mlqjGdDe090N/921DRYikdFE3IWS47Bg2SrUy5sMJjAudkbGgrlzl40f41tqaD+MoYaF5eUBH27+
                            6sLB44kGkQAAq15cMigSAGCERIKVzy822J7neRw+dfaxr/fsTTuemBhsViLq6uR/Xv//nyelZ+U4
                            DpS8eiIidGy/7UWl5Thw7CQKS8r6TYpR48MgkVgaRWD6xZzR3x9JTDyd8vMUsxBRXFwZtPaDTfvz
                            CorcjAlEZmMNezvbPtuT0jOx9JU38NGWr/D86rX4OTunT1t7W1u4ODkZRQQA5BUUeSQcPPp9c3Pz
                            +EERUV5TE/L5zt1Jv+TdNDoKgUDQb/uhE4ngOA4AoNFocD41o29jArBs//76wtX8AveVb7x3llLq
                            2Z9dn7sGpdR2xWtvf5qR+8soUwJQd6ux+4dDfbY3tbTc+1tiKUZEeIhJAzUENwtLHFa9ueF7SumT
                            hJB2g4mglDJ7DhzZlHM9L8aYnNATXRyHLTv2DGgnsRTj1b8uQ9zsmX37UnJoamkdFBlpWZeiN+/Y
                            vRVAfG/tvS6N7bv3z/0m4cBStdqw3cFUeHu4Y+fmj7Bo3px+7XKvXsft9o5B9aXneew7dOL5rMvX
                            5hpEBKXU+WZJ2Za29o7B7XsDIGZaNBK2f4YxgQH92qm61diRcMAsfXYqOew7dGzn+cxM19+3PbA0
                            Nu/cu/HCxUtG7RDGQCRksWpZPBbOjYVEIhnQ/sjJMyivqjZb/8kZ2Y4ymc0/KKVrCCH3zu73zYj8
                            khKfMykXlmq0Zi/37yFyfDheWBg3IAmUUpxOSsPWXd+ZPYaCwtLllZWV9x1y7psR51My36+srh2w
                            fhgMWJYFw/R/fFFrNNiRcADfHTgMrc78X0pBSallwrHT7wKIu/vsXkQ1TU2+aZmXFg4lCYagpbUN
                            /9y0Gbv2HRgSEu4iNSM7Ri5vjXqAiOSUC+uLysqNrkbNjff+/QXOpf485P00NrVIt+zeO/8+Iiil
                            gtMpP8803a350N3PzZQ5oed51NXLF1NKre4R0dx8e0ZJeaXLwyZhuFFYWu564dLlp4DfkuW+I8fi
                            OVX3sHR+Lf8mlq95s8/2iuraYSPidoeCpGRkLwSwn6WU2jy7au244eq8vUOBK9fzQQiBjbUVJJaW
                            UHR2oUupHDYCeqK8qmY6pVTAZl29GtTS2uY7nJ1bS6XY8MYaRI4Pg3SEBKrubqRkZOPjrV9D0dk5
                            rETcuFUs7dJoApm2lrZJNfVyg2+qBgshy+KdtS/j8SmPQjrizqHKUizGnJjpeH31ymElAQCUKhWy
                            L+ZMYi7/WhCoH+CW2Jzw9/XCjKmP9do2Y1o0fDw9hp2MG0Vl45na+oYhqyt6g72tLQjT+52xhYUF
                            bKylw05EQ2NzIMNx3Q7D2WlpRRUUnV29tjW3tKKqtn7YiVCqVF6MTqeTDWen9fJGvPfJZqjV9x+c
                            NFotPt72DVrbbg87EWqNxoXleX7Y52JqRjbiX34dTz8VC3tbGVrabuOnM8m4UVg07CQAAMdxIpYC
                            4ofReWFJGTZ+tu2hDPz3UHWrwfJ63ZBoJIA7dwqUN35HIoQBYRhQngeldzQVhBHce3M+FHGyrEik
                            HSoimisKoVK0wdj7X4ZhEL/8BSTsSQD/m8RAZCnBSP/QAe8yTIFIKATLChjVUJBAKUVncwPSju6A
                            QGBc8GILEcaNCcCqedFQct3geR4rX/8XGquKwYolEFqIMULmAGImUqRSCc8KGEE7APehIYPH+o+2
                            D1qNQkHR0nIboT5OcHJxQ1lVHfKuZcLBwx9Se+dBLxmxWNzCisUWhr1mNgEEBG+/8iIGu7R5SrHm
                            n59ibfxMjI2KgbOTA5IzLmPNO//G7XoV7EZ5Dcq/zEpayVpLpTVDRQQIMGNaFJhBMsFTCkdHOyx6
                            aycsxfvwSKA39nyxAd9t+wCxS16F2tYRFhLTTwF2MptCJuyRIIM1BA8TBAQyj2DIfEJR1KjC1Hkr
                            4D5qJJYunIPOloZB+ZbZ2eYyri7Ol21lA+ua/ghgBAIwrBDWTqPQ0qlGSsZlzJgaBY3S9NKdZVlM
                            HDc2j/H3GJXv5+1psgirL5hzy+9t+xWwQrS1d0AitgDPG6ff7IlAX28+xN8/n/H09Gz2dnfLNDcR
                            AAGlgJIb/O6s0+ug0ehAyJ3tsrurAyKqxszpk3Dp2g1YjLAy2feYQN8cQkg7QwjRz5o57bg5DyqU
                            56HTqCEQCnHz1uDrB45Toq6+AfLiPNTdvILWshv4YuM6yKyt8J9vD0IiM62AFrIsvDzcfgB+u7x9
                            NDT0qI+H+/aSikrj9Dm9oF1eg87GGlgLddDrtEhPPYfIsCAQgRAgpog9KLIvZsPLVYYfN69Fh06M
                            AB9PSEdIsOLvG6GkIjhay0yKdWywv2JKRNhZ4LfrfEJIR3Tk+EG+VaGwYdVY7N6IH+cDc/wonCUU
                            u49eQG1RDkqup0NekgPaJQeo4Wtap2rHd/89Aa5bi6LqVqjVGuw5eAqT5y5H1o0KOHoGgGFMU9P4
                            eHmc9fHxKQN6vPucPWv6h6eSUmc2t942Kc1xHbfh2F2A1xYIkVLG40yxDp/NEuK5I0147Jm3IIAe
                            GggxYVwwtq9fCpeAqIFniKYLSUnncOLCDVg5jcbrn/8AXq+HSCyB1H40nF1Nzw2OdrY0LCg44a6W
                            +15iCPH3z5o6KSrXVMeK5npEuOih0lHsytVgzWQRtFo9HEcQJC8XI2WlFDvmCtFSlo8V7+4EVTb2
                            7YzyQHcbqgtz8f6Xx2Dj4glbV084+zwCF/8Q2Lv7DipBAkB05ITrTz81M+3u//dmBCGEv/pr0frE
                            lPRkTmV8ptcoOxHuwkKnB/7sJ8QcfxZrTnRjjDOLLVkaXKvXobiZh1JDoakpAK/h8MB8oDygVoAq
                            5aisrsETq7egUcXCydt7UIP+PVxGOvELZsf8ixDC3X1231YRHuKf+sT0qRmmFDECkQXy6rVQqrSI
                            9QH25nK40gAsCyNo79Rg8iiKzbOEeC5UgBD/0SBaBfjWW6DtZaDt5eBbi8A35UHdWoLP9vyESfGb
                            0KKzhINngNGxDIQx/j4pE8aFnu757IER1zY2hi5f83Z6eWW1zBCnGq4LTeW3oNV0g2i74WkDqHmg
                            pgOwEQNOPfQgegrUKACBSIQwP7deBdDV9a2oa24HI2BhYSm9F2X4xEjcbmtFZcnvKgIC2I32MngL
                            9fPy4NavWT1t8sTwyz2fPyADGO3s/OunX+7evK+pZYOS4wacGlq1ChKWYvHCefDxcIOnuwskFmIA
                            5vvlEWEIgv28wfM8bpVUQMfzqK6To7isCodPJqNbxUFiwNcmEgqxbNGCj39Pwm98PghKqeS19z48
                            dzopPXog5zqNGq01ZVB3dkDEEjjYWmNMkC/CxgRgfEgQQoP9YGMthcDEM7eeUnR1cSgqr8L1m8XI
                            vpyPG4UlaG3vRBenhlAihd0oL4OS57xZMYWfvLsunBDywBvvPqPr6Ojw/esbG87/knfD4GKf1+ug
                            12qhVnZCzXVC3dUBtaoLMqklpJYWJhHBqTRQqNRgWAuIRlhBbCWDhUQKVigCI2ANLmomhoXIN65b
                            Pc3b27vXo26/XlIzc+O++GbXj7dKK0yWGmpUSnDV+fh2w1LYWBl/cF2/7RjKuyQYYW+8FvsuXEY6
                            c++s/dvTM6KjE/uy6ZcISik5fu5c3KYtuw61tXeYNLd1Gg2qrl2A9QjTTu9dXDecA8IhsbEz6fOO
                            Drbqv7+0/JUFsTN39Gdn0OCOnjm/esvOhK31DY0mVWZ6rRYmJ09CIDBiCfSEg4Od5vm4J19d9eJz
                            Xw/YjaFOr+bfXLbug0++qq6tH1JFrrng7T6ae+2lZS/PmvbYwIJwY4gAgOxfrj+zddfezb/8WuBq
                            qlh9OBA1LrQpKnLcitXxz5409DNGz7fqhoYJn2zb8WXSz1kRPP/HIkMkFCL28Snl8Qvn/d/YwMA8
                            Yz5r6s8dLRMO//TB4RNn1xSWlj10bSYAuLmOVK1aFv/1nyaNf9/Ozs5oKb/JN4uUUkFKVu6jp88m
                            bbpw6cpEhVL5UAhxtLelQX6+ma+uWPLR2ODgs6b+RHrQV6yUUtHJ8ymx6Vm5W1OzLrmZ447SEFiK
                            xZgYHlK8KG7OB49PjjpMCBmUUtVsd82UUjbj4pUFPyWlrMi/VTS9orp2SARqfl4edJSLc/KLT88/
                            MCky/EDPUvoPQURPKBQK/7SsS0uPn0mNlbe0BFfW1Al1JgrMWZaFm+tIGuDjnR/g63V85ZKnf7Sw
                            sCg0d8xDpo0A7iTV8ro6t8ycK+Ftze0Rza2tYxuamtzbFV1Oer1eptaoBRqtDqB3BmwpFvFCkUhh
                            b2vT6GhnV2VtbXVZIhZfixw/tnBCaGg1IWTIRJj/A2SvMbDZtB1+AAAAJXRFWHRkYXRlOmNyZWF0
                            ZQAyMDIyLTA3LTMwVDEwOjI1OjUwKzAwOjAwUMLiKgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0w
                            Ny0zMFQxMDoyNTo1MCswMDowMCGfWpYAAAAASUVORK5CYII="
                />
            </svg>
        </button>
    </div>
        </Fragment>
    );
}

export default Store;
