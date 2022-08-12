import { useRef, useState, useEffect } from "react";
import styles from "./css/EditPhoto.module.scss";

function EditPhoto(props) {
    const { blobList } = props;

    const { wrap } = styles;

    const wrapRef = useRef(null);
    const shadowRef = useRef(null);
    const [cart, setCart] = useState([]);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [imgList, setImgList] = useState([]);

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
        setCanvasWidth(wrapRef.current.getBoundingClientRect().width);
        setCanvasHeight(wrapRef.current.getBoundingClientRect().height);
    }, []);

    const renderCanvas = async () => {
        const shadowCtx = shadowRef.current.getContext("2d");

        shadowCtx.clearRect(
            0,
            0,
            shadowRef.current.width,
            shadowRef.current.height
        );
        // imgRef.current.onload(() => {
        // });
        const img = await getImageFromPath(blobList[0]);
        shadowCtx.drawImage(img, 0, 0);
        console.log(img);
    };

    useEffect(() => {
        renderCanvas();
    }, []);

    return (
        <div className={wrap} ref={wrapRef}>
            <img
                src="https://pbs.twimg.com/media/FG9WnM5WUAEu7H_.jpg"
                alt=""
                style={{ display: "none" }}
            />
            <canvas
                ref={shadowRef}
                width={canvasWidth}
                height={canvasHeight}
            ></canvas>

            <br />
            {canvasHeight}
        </div>
    );
}

export default EditPhoto;
