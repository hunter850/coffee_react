import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styles from "./css/EditPhoto.module.scss";

import Panel from "./Panel";

function EditPhoto(props) {
    const { blobList } = props;

    const { wrap, carousel, panel_wrap } = styles;

    const wrapRef = useRef(null);
    const wrapRefMulti = useRef(null);
    const shadowRefArr = useRef([]);
    const shadowRef = useRef(null);
    const mounted_b = useRef(false);
    const [cart, setCart] = useState([]);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [imgList, setImgList] = useState([]);

    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturate, setSaturate] = useState(100);
    const [filter, setFilter] = useState("");

    const getImageFromPath = (path) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.src = path;
        });
    };

    useEffect(() => {
        if (blobList.length < 1) {
            setCanvasWidth(wrapRef.current.getBoundingClientRect().width);
            setCanvasHeight(wrapRef.current.getBoundingClientRect().height);
        } else {
            setCanvasWidth(wrapRefMulti.current.getBoundingClientRect().width);
            setCanvasHeight(
                wrapRefMulti.current.getBoundingClientRect().height
            );
        }
    }, []);

    const renderCanvas = async () => {
        const shadowCtx = shadowRef.current.getContext("2d");

        let ctxFilter = "";
        switch (filter) {
            case "sepia":
                ctxFilter = "sepia(100%)";
                break;
            case "blur":
                console.log("blur");
                ctxFilter = "blur(1px)";
                break;
            default:
                ctxFilter = "";
                break;
        }

        const img = await getImageFromPath(blobList[0]);
        shadowCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) ${ctxFilter}`;

        shadowCtx.drawImage(
            img,
            0,
            0,
            shadowRef.current.width,
            shadowRef.current.height
        );

        const imageData = shadowCtx.getImageData(
            0,
            0,
            shadowRef.current.width,
            shadowRef.current.height
        );

        const pixelData = imageData.data;

        if (filter === "greyed") {
            for (let i = 0; i < pixelData.length; i += 4) {
                const avg =
                    (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3;
                pixelData[i] = avg;
                pixelData[i + 1] = avg;
                pixelData[i + 2] = avg;
            }
        } else if (filter === "yellowed") {
            for (let i = 0; i < pixelData.length; i += 4) {
                //將所有的RGB值重新賦值（底片效果 = 255 - 當前的RGB值）
                pixelData[i] = pixelData[i] * 1.05;
                pixelData[i + 2] = pixelData[i + 2] * 0.8;
            }
        }
        shadowCtx.putImageData(imageData, 0, 0);
    };

    const renderMulti = async () => {
        const ctxArr = shadowRefArr.current.map((v) => v.getContext("2d"));

        const imgArr = await Promise.all(
            blobList.map(async (v, i) => await getImageFromPath(v))
        );

        console.log(ctxArr);
        console.log(imgArr[0]);

        ctxArr.forEach((v, i) => {
            v.drawImage(
                imgArr[i],
                0,
                0,
                shadowRefArr.current[i].width,
                shadowRefArr.current[i].height
            );
        });
    };

    useEffect(() => {
        if (blobList.length < 1) {
            renderCanvas();
        } else {
            renderMulti();
        }
    }, [filter, brightness, contrast, saturate]);

    return (
        <div className={wrap}>
            {blobList.length > 1 ? (
                <Swiper
                    className={carousel}
                    ref={wrapRefMulti}
                    loop={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet dot",
                    }}
                    modules={[Navigation, Pagination]}
                >
                    {blobList.map((v, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <canvas
                                    ref={(el) => (shadowRefArr.current[i] = el)}
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
                        ref={shadowRef}
                        width={canvasWidth}
                        height={canvasHeight}
                    ></canvas>
                </div>
            )}

            <div className={panel_wrap}>
                <Panel
                    brightness={brightness}
                    contrast={contrast}
                    saturate={saturate}
                    filter={filter}
                    setBrightness={setBrightness}
                    setContrast={setContrast}
                    setSaturate={setSaturate}
                    setFilter={setFilter}
                />
            </div>
        </div>
    );
}

export default EditPhoto;
