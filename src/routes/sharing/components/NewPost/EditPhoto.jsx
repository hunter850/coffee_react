import { useRef, useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/EditPhoto.module.scss";

import { newPosts } from "../../../../config/api-path";
import EditCarousel from "./EditCarousel";
import NewContent from "./NewContent";
import Panel from "./Panel";

function EditPhoto(props) {
    const { blobList, step } = props;
    const { wrap, panel_wrap, content_wrap } = styles;
    const length = blobList.length;

    const rawCvs = useRef(null);
    const rawCvsArr = useRef([]);
    const wrapRef = useRef(null);
    const wrapRefMulti = useRef(null);
    const cvsRefArr = useRef([]);
    const cvsRef = useRef(null);
    const canvasDrew = useRef(false);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [index, setIndex] = useState(0);

    const [brightness, setBrightness] = useState(Array(length).fill(100));
    const [contrast, setContrast] = useState(Array(length).fill(100));
    const [saturate, setSaturate] = useState(Array(length).fill(100));
    const [filter, setFilter] = useState(Array(length).fill(""));

    const [fff, setFff] = useState(null);

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

    const handleSubmit = async (e) => {
        // console.log(e.target);
        const fd = new FormData(e.target);

        let url = [];
        if (length === 1) {
            url[0] = cvsRef.current.toDataURL("image/png");
        } else {
            url = cvsRefArr.current.map((v) => v.toDataURL("image/png"));
        }
        const dataURLtoFile = (dataurl, filename) => {
            //將base64轉換為文件
            let uint8 = getUint8Arr(dataurl);
            return new File([uint8.u8arr], filename, { type: uint8.mime });
        };
        const getUint8Arr = (dataurl) => {
            // 截取base64的数据内容
            let arr = dataurl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = window.atob(arr[1]),
                // 获取解码后的二进制数据的长度，用于后面创建二进制数据容器
                n = bstr.length,
                // 创建一个Uint8Array类型的数组以存放二进制数据
                u8arr = new Uint8Array(n);
            // 将二进制数据存入Uint8Array类型的数组中
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return { u8arr, mime };
        };

        const fileArr = url.map((v, i) => dataURLtoFile(v, "photo" + i));
        // console.log(fileArr);
        console.log("fd", fd.get("fff"));

        // fd.append("photos", fileArr);

        // const r = await axios({ method: "post", url: newPosts, data: fd });

        // console.log(r.data);
    };

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
                <NewContent
                    handleSubmit={handleSubmit}
                    fff={fff}
                    setFff={setFff}
                />
            )}
        </div>
    );
}

export default EditPhoto;
