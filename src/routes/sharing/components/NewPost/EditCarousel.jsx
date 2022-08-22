import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styles from "./scss/EditPhoto.module.scss";
import c_styles from "./scss/EditCarousel.module.scss";

function EditCarousel(props) {
    const {
        blobList,
        rawCvs,
        rawCvsArr,
        wrapRef,
        wrapRefMulti,
        setIndex,
        cvsRefArr,
        canvasWidth,
        canvasHeight,
        cvsMultiWidth,
        cvsMultiHeight,
        cvsRef,
    } = props;
    const { carousel, img_wrap } = styles;
    const myWrap = c_styles.myWrap;
    return (
        <>
            {blobList.length > 1 ? (
                <div className={myWrap}>
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
                                    <img
                                        src={v.url}
                                        alt=""
                                        ref={(el) =>
                                            (rawCvsArr.current[i] = el)
                                        }
                                        width={cvsMultiWidth[i]}
                                        height={cvsMultiHeight[i]}
                                        style={{
                                            display: "none",
                                        }}
                                    />
                                    <div
                                        className={img_wrap}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <canvas
                                            ref={(el) =>
                                                (cvsRefArr.current[i] = el)
                                            }
                                            width={cvsMultiWidth[i]}
                                            height={cvsMultiHeight[i]}
                                        ></canvas>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            ) : (
                <div className={carousel} ref={wrapRef}>
                    <img
                        src={blobList[0].url}
                        alt=""
                        ref={rawCvs}
                        width={canvasWidth}
                        height={canvasHeight}
                        style={{ display: "none" }}
                    />
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
