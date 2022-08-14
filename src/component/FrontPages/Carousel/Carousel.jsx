import { useMemo } from "react";
// swiper的模組 不用的可以不引入
// 自動播放 箭頭 圓點 下方scrollbar
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
// 不同模式 不用的可以不引入
import {
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    EffectCards,
} from "swiper";
// swiper的主要兩個component
import { Swiper, SwiperSlide } from "swiper/react";
// 注意自己的css引入在下面才能後蓋前
import "swiper/css/bundle";
import "./carousel_test.css";
import "./swiper_style.css";

// 圖片
import slide1 from "../../../images/frontpage/banner/banner-course1.png";
import slide2 from "../../../images/frontpage/banner/banner-course2.png";
import slide3 from "../../../images/frontpage/banner/banner-food.png";
import slide4 from "../../../images/frontpage/banner/banner-product.png";

// 圖片陣列 方便map用
const datas = [
    { src: slide1 },
    { src: slide2 },
    { src: slide3 },
    { src: slide4 },
];
function TrySwiper() {
    // inline style 可有可無 可以都寫在.css裡
    const styles = useMemo(() => {
        return {
            carouselStyle: {
                width: "100%",
                margin: "auto",
            },
            imgWrap: {
                width: "100%",
                aspectRatio: "16 / 9",
            },
            imgStyle: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
            },
        };
    }, []);
    return (
        <Swiper
            // inline style
            style={styles.carouselStyle}
            // 動畫速度
            speed={2000}
            // 滑鼠拖動carousel的指標圖示改變
            grabCursor={true}
            // 無限輪播
            loop={true}
            // 每張圖之間的padding空白
            spaceBetween={0}
            // 一頁顯示幾張 可以改2 3 4 5試看看
            slidesPerView={1}
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
            pagination={{
                // 點擊可以跳頁
                clickable: true,
                // 圓點className 左邊是預設 右邊className可以加自訂的 然後去.css檔調整顏色
                bulletClass: "swiper-pagination-bullet dot",
                // 圓點active的className 同上
                bulletActiveClass: "swiper-pagination-bullet-active dot_active",
            }}
            // 左右箭頭
            navigation={{
                // 左右箭頭的樣式在css檔裡面用偽元素定義
                // 輪播到底鎖住按鈕的className 同上左邊預設 右邊自訂
                disabledClass: "swiper-button-disabled button_disabled",
            }}
            // 下方小圓點
            // 最下方的scrollbar
            scrollbar={{
                // scrollbar寬度 輸入數字或使用auto
                dragSize: "auto",
                // scrollbar是否可以拖拉
                draggable: true,
                // 同上scrollbar className 左邊預設 右邊自訂
                dragClass: "swiper-scrollbar-drag drag_bar",
            }}
        >
            {datas.map((data) => (
                <SwiperSlide key={data.src}>
                    <div style={styles.imgWrap}>
                        <img src={data.src} alt="" style={styles.imgStyle} />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default TrySwiper;