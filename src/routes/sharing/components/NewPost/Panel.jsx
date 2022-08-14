import { useState } from "react";
import styles from "./css/Panel.module.scss";
import normal from "../../../../images/sharing/Normal.jpg";
import moon from "../../../../images/sharing/Moon.jpg";
import yellowed from "../../../../images/sharing/Yellow.jpg";

const filterArr = [
    { name: "原始", src: normal },
    { name: "灰階", src: moon },
    { name: "泛黃", src: yellowed },
];

const silderArr = [
    { name: "亮度", type: "brightness" },
    { name: "對比度", type: "contrast" },
    { name: "飽和度", type: "saturate" },
];

function Panel() {
    const { filter_wrap, f, slider_wrap } = styles;

    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturate, setSaturate] = useState(100);

    const getState = (val) => {
        if (val === "brightness") return brightness;
        else if (val === "contrast") return contrast;
        else if (val === "saturate") return saturate;
    };

    return (
        <>
            <div className={filter_wrap}>
                {filterArr.map((v, i) => {
                    return (
                        <div key={i} className={f}>
                            <img
                                src={v.src}
                                alt=""
                                width="100%"
                                height="auto"
                            />
                            <p>{v.name}</p>
                        </div>
                    );
                })}
            </div>
            <div className={slider_wrap}>
                {silderArr.map((v, i) => {
                    return (
                        <div key={i}>
                            <p>{v.name}</p>
                            <input
                                type="range"
                                name={v.type}
                                id={v.type}
                                max="150"
                                min="50"
                                value={getState(v.type)}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (v.type === "brightness") {
                                        setBrightness(val);
                                    } else if (v.type === "contrast")
                                        setContrast(val);
                                    else if (v.type === "saturate")
                                        setContrast(val);
                                }}
                            />
                            <label htmlFor={v.name}>{getState(v.type)}</label>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Panel;
