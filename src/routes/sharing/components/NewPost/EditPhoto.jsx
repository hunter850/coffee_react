import { useRef, useState, useEffect } from "react";

import EditCarousel from "./EditCarousel";
import NewContent from "./NewContent";
import Panel from "./Panel";
import styles from "./scss/EditPhoto.module.scss";

function EditPhoto(props) {
    const { blobList, step, handleSubmit, cvsRef, cvsRefArr } = props;
    const { wrap, panel_wrap } = styles;
    const length = blobList.length;

    const rawCvs = useRef(null);
    const rawCvsArr = useRef([]);
    const wrapRef = useRef(null);
    const wrapRefMulti = useRef(null);

    const canvasDrew = useRef(false);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
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
        const shadowCtx = cvsRef.current.getContext("2d");
        const rawImg = rawCvs.current;

        if (!canvasDrew.current) {
            const img = await getImageFromPath(blobList[0]);
            console.log("draw 1st");

            shadowCtx.drawImage(
                img,
                0,
                0,
                cvsRef.current.width,
                cvsRef.current.height
            );

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

            shadowCtx.drawImage(
                rawImg,
                0,
                0,
                cvsRef.current.width,
                cvsRef.current.height
            );

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

        if (!canvasDrew.current) {
            const imgArr = await Promise.all(
                blobList.map(async (v) => await getImageFromPath(v))
            );
            console.log("multi 1st");
            ctxArr.forEach((v, i) => {
                v.drawImage(
                    imgArr[i],
                    0,
                    0,
                    cvsRefArr.current[i].width,
                    cvsRefArr.current[i].height
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
                0,
                0,
                cvsRefArr.current[index].width,
                cvsRefArr.current[index].height
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
            renderCanvas();
        } else {
            renderMulti();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, brightness, contrast, saturate]);

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
                <NewContent handleSubmit={handleSubmit} />
            )}
        </div>
    );
}

export default EditPhoto;
