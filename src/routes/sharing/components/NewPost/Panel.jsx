import { useState } from "react";
import styles from "./css/Panel.module.scss";
import normal from "../../../../images/sharing/Normal.jpg";
import moon from "../../../../images/sharing/Moon.jpg";
import yellowed from "../../../../images/sharing/Yellow.jpg";

const filterArr = [
    { name: "原始", src: normal, mode: "" },
    { name: "灰階", src: moon, mode: "greyed" },
    { name: "泛黃", src: yellowed, mode: "yellowed" },
    { name: "棕色", src: yellowed, mode: "sepia" },
    { name: "模糊", src: yellowed, mode: "blur" },
];

const silderArr = [
    { name: "亮度", type: "brightness" },
    { name: "對比度", type: "contrast" },
    { name: "飽和度", type: "saturate" },
];

function Panel(props) {
    const {
        filter,
        brightness,
        setBrightness,
        contrast,
        setFilter,
        setContrast,
        saturate,
        setSaturate,
    } = props;
    const { filter_wrap, f, slider_wrap } = styles;

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
                                onClick={() => setFilter(v.mode)}
                            />
                            <p onClick={() => setFilter(v.mode)}>{v.name}</p>
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
                                        setSaturate(val);
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
