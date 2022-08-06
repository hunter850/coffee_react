import { useState, useRef } from "react";

import Magnifier from "./Magnifier";
import styles from "../../css/Seachbar.module.scss";

const data = [
    { name: "拉花課程", type: "tag" },
    { name: "拉花課程", type: "tag" },
    { name: "有趣課程", type: "tag" },
];

function Seachbar() {
    const {
        container,
        magnifier_wrap,
        search_wrap,
        submit,
        clearInput,
        spread,
        result_wrap,
        result_content,
    } = styles;
    const containerRef = useRef(null);
    const [keyWord, setKeyWord] = useState("");
    const [result, setResult] = useState([]);

    const focusSearchbar = () => {
        setResult(data);
        containerRef.current.style.width = "100%";
    };
    const clearResult = () => {
        setResult([]);
        containerRef.current.style.width = "calc(100% - 3rem)";
    };

    const clearAll = () => {
        clearResult();
        setKeyWord("");
    };

    return (
        <div className={container} ref={containerRef}>
            <div className={search_wrap}>
                {result.length > 0 && (
                    <div className={magnifier_wrap}>
                        <Magnifier />
                    </div>
                )}
                <input
                    type="text"
                    value={keyWord}
                    onClick={focusSearchbar}
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <div
                    className={clearInput}
                    aria-label="清除"
                    onClick={clearAll}
                >
                    <svg
                        focusable="false"
                        width="22px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#70757a"
                    >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </div>
                <span className={spread}></span>
                <button className={submit}>
                    <Magnifier color="#4285f4" />
                </button>
            </div>
            <div className={result_wrap} onClick={clearResult}>
                {result.length > 0 &&
                    result.map((v, i) => {
                        return (
                            <div key={i} className={result_content}>
                                <div className={magnifier_wrap}>
                                    <Magnifier />
                                </div>
                                <span>{v.name}</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Seachbar;
