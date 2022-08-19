import { Fragment, useState } from "react";
// import StarCard from "./StarCard";
// import Card from "../../../component/Products/Card";
import StarCard from "../StarProducts/StarCard";
import ViewmoreBtn from "../ViewmoreBtn";
import { Link } from "react-router-dom";
import starproductdata from "../../../routes/frontPage/data/starproductdata.js";
import "./StarProducts.css";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
// 不同模式 不用的可以不引入
import {
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    EffectCards,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useStyleChange } from "../../../Contexts/SuperProvider";
import "../Carousel/starcarousel.css";

function StarProducts() {
    const styleChange = useStyleChange();
    const el = (
        <Fragment>
            <div className="home-container">
                <div className="bottom-line m-auto">
                    <h2 className="home-title">推薦商品</h2>
                </div>
                <Swiper
                    // 動畫速度
                    speed={2000}
                    // 滑鼠拖動carousel的指標圖示改變
                    grabCursor={true}
                    // 無限輪播
                    loop={true}
                    // 每張圖之間的padding空白
                    spaceBetween={0}
                    // 一頁顯示幾張 可以改2 3 4 5試看看
                    slidesPerView={styleChange === 1 ? 1 : 4}
                    // 額外的模組 除了寫在inline還需要在上方import才能用
                    modules={[
                        // EffectCube,
                        // EffectFade,
                        // EffectFlip,
                        // EffectCoverflow,
                        // EffectCards,
                        Autoplay,
                        Pagination,
                        Navigation,
                        Scrollbar,
                    ]}
                    // effect屬性預設為slide 不需引入其他module，如果為cube會變成盒子形狀的
                    effect="slide"
                    // 自動播放
                    autoplay={{
                        // 時間間隔
                        delay: 2000,
                        // 用戶互動後是否關閉自動播放
                        disableOnInteraction: false,
                        // 滑鼠移入停止自動播放
                        pauseOnMouseEnter: true,
                    }}

                    // 左右箭頭
                    navigation={{
                        // 左右箭頭的樣式在css檔裡面用偽元素定義
                        // 輪播到底鎖住按鈕的className 同上左邊預設 右邊自訂
                        disabledClass: "swiper-button-disabled button_disabled",
                    }}
                >
                    {starproductdata.map((v, i) => (
                        <SwiperSlide key={v.products_sid}>
                            <Link
                                className="starproduct-phone-layout"
                                to={`/products/detail/${v.products_sid}`}
                            >
                                <StarCard
                                    cardData={{
                                        star_tag: v.products_tag,
                                        star_name: v.products_name,
                                        star_content: v.products_content,
                                        star_price: v.products_price,
                                        star_sid: v.products_sid,
                                        star_img_file: "product",
                                        star_img_s: v.products_img,
                                    }}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link to="/products" className="starproduct-viewbtn">
                    <ViewmoreBtn Vbpaddingtop={50} />
                </Link>

                {/* <div className="d-flex starproduct-box">
                    {starproductdata.map((v, i) => {
                        return (
                            <Link
                                key={v.products_sid}
                                to={`/products/detail/${v.products_sid}`}
                            >
                                <StarCard
                                    cardData={{
                                        star_tag: "純苦",
                                        star_name: v.products_name,
                                        star_content: v.products_content,
                                        star_price: v.products_price,
                                        star_sid: v.products_sid,
                                        star_img_file: "product",
                                        star_img_s: v.products_img,
                                    }}
                                />
                            </Link>
                        );
                    })}
                </div> */}
            </div>
        </Fragment>
    );
    return el;
}

export default StarProducts;
