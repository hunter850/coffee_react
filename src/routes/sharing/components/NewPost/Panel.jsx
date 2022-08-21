import styles from "./scss/Panel.module.scss";
import normal from "../../../../images/sharing/Normal.jpg";
import moon from "../../../../images/sharing/Moon.jpg";
import yellowed from "../../../../images/sharing/yellowed.png";
import browned from "../../../../images/sharing/browned.png";
import blur from "../../../../images/sharing/blur.png";

const filterArr = [
    { name: "原始", src: normal, mode: "" },
    { name: "灰階", src: moon, mode: "greyed" },
    { name: "泛黃", src: yellowed, mode: "yellowed" },
    { name: "棕色", src: browned, mode: "sepia" },
    { name: "模糊", src: blur, mode: "blur" },
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
        index: ind,
    } = props;
    const { filter_wrap, f, slider_wrap, info, selected } = styles;

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
                                onClick={() =>
                                    setFilter((pre) => {
                                        const ar = [...pre];
                                        ar[ind] = v.mode;
                                        return ar;
                                    })
                                }
                                className={filter === v.mode ? selected : ""}
                            />
                            <p
                                onClick={() =>
                                    setFilter((pre) => {
                                        const ar = [...pre];
                                        ar[ind] = v.mode;
                                        return ar;
                                    })
                                }
                            >
                                {v.name}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className={slider_wrap}>
                {silderArr.map((v, i) => {
                    return (
                        <div key={i}>
                            <div className={info}>
                                <span>{v.name}</span>{" "}
                                <label htmlFor={v.name}>
                                    {getState(v.type) - 100}
                                </label>
                            </div>
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
                                        setBrightness((pre) => {
                                            const ar = [...pre];
                                            ar[ind] = val;
                                            return ar;
                                        });
                                    } else if (v.type === "contrast")
                                        setContrast((pre) => {
                                            const ar = [...pre];
                                            ar[ind] = val;
                                            return ar;
                                        });
                                    else if (v.type === "saturate")
                                        setSaturate((pre) => {
                                            const ar = [...pre];
                                            ar[ind] = val;
                                            return ar;
                                        });
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Panel;
