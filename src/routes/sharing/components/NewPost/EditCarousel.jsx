import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styles from "./css/EditPhoto.module.scss";

function EditCarousel(props) {
    const {
        blobList,
        wrapRef,
        wrapRefMulti,
        setIndex,
        cvsRefArr,
        canvasWidth,
        canvasHeight,
        cvsRef,
    } = props;
    const { carousel } = styles;
    return (
        <>
            {blobList.length > 1 ? (
                <Swiper
                    className={carousel}
                    ref={wrapRefMulti}
                    // onSwiper={setSwiper}
                    onActiveIndexChange={(v) => {
                        setIndex(v.activeIndex);
                    }}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet dot",
                    }}
                    modules={[Navigation, Pagination]}
                >
                    {blobList.map((v, i) => {
                        return (
                            <SwiperSlide key={i} className={carousel}>
                                <canvas
                                    ref={(el) => (cvsRefArr.current[i] = el)}
                                    width={canvasWidth}
                                    height={canvasHeight}
                                ></canvas>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                <div className={carousel} ref={wrapRef}>
                    <canvas
                        ref={cvsRef}
                        width={canvasWidth}
                        height={canvasHeight}
                    ></canvas>
                </div>
            )}
        </>
    );
}

export default EditCarousel;
