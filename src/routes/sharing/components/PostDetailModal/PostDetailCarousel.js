import { Swiper, SwiperSlide } from "swiper/react";
import { imgSrc } from "../../../../config/api-path";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../../css/PostDeatailCarousel.module.scss";

// import "./styles/styles.css";
import { Navigation, Pagination } from "swiper";

function PostDeatailCarousel({ imgs }) {
    console.log("imgs length", imgs.length);
    const { mySwiper, carousel_img, img_wrap } = styles;

    return (
        <>
            <div style={{ height: "100%", width: "100%" }}>
                {imgs.length > 1 ? (
                    <Swiper
                        // cssMode={true}
                        loop={true}
                        navigation={true}
                        pagination={{
                            clickable: true,
                            bulletClass: "swiper-pagination-bullet dot",
                        }}
                        modules={[Navigation, Pagination]}
                        className={mySwiper}
                    >
                        {imgs.map((v, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <div className={img_wrap}>
                                        <img
                                            src={`${imgSrc}/sharing/${v["img_name"]}`}
                                            alt=""
                                            className={carousel_img}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <div className={img_wrap}>
                        <img
                            src={`${imgSrc}/sharing/${imgs[0]["img_name"]}`}
                            alt=""
                            className={carousel_img}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default PostDeatailCarousel;
