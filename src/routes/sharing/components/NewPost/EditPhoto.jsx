import { useRef, useState, useEffect } from "react";

import EditCarousel from "./EditCarousel";
import NewContent from "./NewContent";
import Panel from "./Panel";
import styles from "./scss/EditPhoto.module.scss";

function EditPhoto(props) {
    const { blobList, step, handleSubmit, cvsRef, cvsRefArr, isSubmit } = props;
    const { wrap, panel_wrap } = styles;
    const length = blobList.length;

    const rawCvs = useRef(null);
    const rawCvsArr = useRef([]);
    const wrapRef = useRef(null);
    const wrapRefMulti = useRef(null);

    const canvasDrew = useRef(false);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [cvsMultiWidth, setCvsMultiWidth] = useState([]);
    const [cvsMultiHeight, setCvsMultiHeight] = useState([]);
    const [index, setIndex] = useState(0);

    const [brightness, setBrightness] = useState(Array(length).fill(100));
    const [contrast, setContrast] = useState(Array(length).fill(100));
    const [saturate, setSaturate] = useState(Array(length).fill(100));
    const [filter, setFilter] = useState(Array(length).fill(""));

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
        if (blobList.length <= 1) {
            const el = blobList[0];
            switch (el.ratio) {
                case "auto":
                    if (el.naturalRatio < 1) {
                        setCanvasWidth(720 * el.naturalRatio);
                        setCanvasHeight(720);
                    } else {
                        setCanvasWidth(576);
                        setCanvasHeight(576 / el.naturalRatio);
                    }
                    break;
                case "4/5":
                    setCanvasWidth(576);
                    setCanvasHeight(720);
                    break;
                case "1":
                    setCanvasWidth(576);
                    setCanvasHeight(576);
                    break;
                case "16/9":
                    setCanvasWidth(576);
                    setCanvasHeight(324);
                    break;
                default:
                    break;
            }
        } else {
            const widthArray = blobList.map((el) => {
                if (el.ratio === "auto" && el.naturalRatio < 1) {
                    return 720 * el.naturalRatio;
                } else {
                    return 576;
                }
            });
            const heightArray = blobList.map((el) => {
                if (
                    (el.ratio === "auto" && el.naturalRatio < 1) ||
                    el.ratio === "4/5"
                ) {
                    return 720;
                } else if (el.ratio === "auto" && el.naturalRatio >= 1) {
                    return 576 / el.naturalRatio;
                } else if (el.ratio === "1") {
                    return 576;
                } else if (el.ratio === "16/9") {
                    return 324;
                }
            });
            setCvsMultiWidth(widthArray);
            setCvsMultiHeight(heightArray);
        }
    }, [blobList]);

    const renderCanvas = async () => {
        const shadowCtx = cvsRef.current.getContext("2d");
        const rawImg = rawCvs.current;

        // Trans image to canvas fit Cover
        let top = 0;
        let left = 0;
        const asp_rto = blobList[0].ratio;
        const ntrl_rto = blobList[0].naturalRatio;
        // 縮放比例
        const scale = 576 / blobList[0].width;
        const scaleByH = 720 / blobList[0].height;
        // 縮放後高度
        let newHeight = cvsRef.current.height;
        let newWidth = cvsRef.current.width;

        if (asp_rto === "1" && ntrl_rto < 1) {
            newHeight = blobList[0].height * scale;
            top = -(newHeight - 576) / 2;
        } else if (asp_rto === "1" && ntrl_rto > 1) {
            newWidth = blobList[0].width * scaleByH;
            left = -(newWidth - 576) / 2;
        } else if (asp_rto === "16/9" && ntrl_rto < 16 / 9) {
            newHeight = blobList[0].height * scale;
            top = -(newHeight - 324) / 2;
        } else if (asp_rto === "4/5" && ntrl_rto < 0.8) {
            newHeight = blobList[0].height * scale;
            top = -(newHeight - 720) / 2;
        } else if (asp_rto === "4/5" && ntrl_rto > 0.8) {
            newWidth = blobList[0].width * scaleByH;
            left = -(newWidth - 576) / 2;
        }

        if (!canvasDrew.current) {
            // frist draw
            const img = await getImageFromPath(blobList[0].url);
            shadowCtx.drawImage(img, left, top, newWidth, newHeight);
            canvasDrew.current = true;
        } else {
            const f = filter[0];

            let ctxFilter = "";
            switch (f) {
                case "sepia":
                    ctxFilter = "sepia(100%)";
                    break;
                case "blur":
                    ctxFilter = "blur(2px)";
                    break;
                default:
                    ctxFilter = "";
                    break;
            }

            // const img = await getImageFromPath(blobList[0]);
            // shadowCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) ${ctxFilter}`;
            shadowCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) ${ctxFilter}`;

            shadowCtx.drawImage(rawImg, left, top, newWidth, newHeight);

            const imageData = shadowCtx.getImageData(
                0,
                0,
                cvsRef.current.width,
                cvsRef.current.height
            );

            const pixelData = imageData.data;

            if (f === "greyed") {
                for (let i = 0; i < pixelData.length; i += 4) {
                    const avg =
                        (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) /
                        3;
                    pixelData[i] = avg;
                    pixelData[i + 1] = avg;
                    pixelData[i + 2] = avg;
                }
            } else if (f === "yellowed") {
                for (let i = 0; i < pixelData.length; i += 4) {
                    //將所有的RGB值重新賦值（底片效果 = 255 - 當前的RGB值）
                    pixelData[i] = pixelData[i] * 1.05;
                    pixelData[i + 2] = pixelData[i + 2] * 0.8;
                }
            }
            shadowCtx.putImageData(imageData, 0, 0);
        }
    };

    const renderMulti = async () => {
        const ctxArr = cvsRefArr.current.map((v) => v.getContext("2d"));
        const rawImageArr = rawCvsArr.current;

        const f = filter[index];
        // let top = 0;
        // let newHeight = cvsRef.current.height;
        let top = new Array(ctxArr.length).fill(0);
        let left = new Array(ctxArr.length).fill(0);
        let newHeight = cvsRefArr.current.map((v) => v.height);
        let newWidth = cvsRefArr.current.map((v) => v.width);

        blobList.forEach((v, i) => {
            // Trans image to canvas fit Cover
            const asp_rto = v.ratio;
            const ntrl_rto = v.naturalRatio;

            // 縮放比例
            const scale = 576 / v.width;
            const scaleByH = 720 / v.height;

            if (asp_rto === "1" && ntrl_rto < 1) {
                newHeight[i] = v.height * scale;
                top[i] = -(newHeight[i] - 576) / 2;
            } else if (asp_rto === "1" && ntrl_rto > 1) {
                newWidth[i] = v.width * scaleByH;
                left[i] = -(newWidth[i] - 576) / 2;
            } else if (asp_rto === "16/9" && ntrl_rto < 16 / 9) {
                newHeight[i] = v.height * scale;
                top[i] = -(newHeight[i] - 324) / 2;
                // TODO:rto>1
            } else if (asp_rto === "4/5" && ntrl_rto < 0.8) {
                newHeight[i] = v.height * scale;
                top[i] = -(newHeight[i] - 720) / 2;
            } else if (asp_rto === "4/5" && ntrl_rto > 0.8) {
                newWidth[i] = v.width * scaleByH;
                left[i] = -(newWidth[i] - 576) / 2;
            }
        });

        if (!canvasDrew.current) {
            // first draw
            const imgArr = await Promise.all(
                blobList.map(async (v) => await getImageFromPath(v.url))
            );
            ctxArr.forEach((v, i) => {
                v.drawImage(
                    imgArr[i],
                    left[i],
                    top[i],
                    newWidth[i],
                    newHeight[i]
                );
            });
            canvasDrew.current = true;
        } else {
            // n-th draw
            let ctxFilter = "";
            switch (f) {
                case "sepia":
                    ctxFilter = "sepia(100%)";
                    break;
                case "blur":
                    ctxFilter = "blur(2px)";
                    break;
                default:
                    ctxFilter = "";
                    break;
            }

            const ctx = ctxArr[index];

            ctx.filter = `
            brightness(${brightness[index]}%) contrast(${contrast[index]}%) saturate(${saturate[index]}%) ${ctxFilter}
            `;

            ctx.drawImage(
                rawImageArr[index],
                left[index],
                top[index],
                newWidth[index],
                newHeight[index]
            );

            const imageData = ctx.getImageData(
                0,
                0,
                cvsRefArr.current[index].width,
                cvsRefArr.current[index].height
            );
            const pixelData = imageData.data;

            if (f === "greyed") {
                for (let i = 0; i < pixelData.length; i += 4) {
                    const avg =
                        (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) /
                        3;
                    pixelData[i] = avg;
                    pixelData[i + 1] = avg;
                    pixelData[i + 2] = avg;
                }
            } else if (f === "yellowed") {
                for (let i = 0; i < pixelData.length; i += 4) {
                    //將所有的RGB值重新賦值（底片效果 = 255 - 當前的RGB值）
                    pixelData[i] = pixelData[i] * 1.05;
                    pixelData[i + 2] = pixelData[i + 2] * 0.8;
                }
            }
            ctxArr[index].putImageData(imageData, 0, 0);
        }
    };

    useEffect(() => {
        if (blobList.length <= 1) {
            setTimeout(() => {
                renderCanvas();
            }, 20);
        } else {
            setTimeout(() => {
                renderMulti();
            }, 20);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blobList, filter, brightness, contrast, saturate]);

    return (
        <div className={wrap}>
            <EditCarousel
                blobList={blobList}
                rawCvs={rawCvs}
                rawCvsArr={rawCvsArr}
                wrapRef={wrapRef}
                wrapRefMulti={wrapRefMulti}
                setIndex={setIndex}
                cvsRef={cvsRef}
                cvsRefArr={cvsRefArr}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                cvsMultiWidth={cvsMultiWidth}
                cvsMultiHeight={cvsMultiHeight}
            />
            {step === 1 ? (
                <div className={panel_wrap}>
                    <Panel
                        brightness={brightness[index]}
                        contrast={contrast[index]}
                        saturate={saturate[index]}
                        filter={filter[index]}
                        setBrightness={setBrightness}
                        setContrast={setContrast}
                        setSaturate={setSaturate}
                        setFilter={setFilter}
                        index={index}
                    />
                </div>
            ) : (
                <NewContent handleSubmit={handleSubmit} isSubmit={isSubmit} />
            )}
        </div>
    );
}

export default EditPhoto;
