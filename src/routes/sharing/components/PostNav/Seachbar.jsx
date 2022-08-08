import { useState, useRef, useEffect, useCallback } from "react";
import _ from "lodash";
import axios from "axios";
import { previewAPI } from "../../../../config/api-path";

import Magnifier from "./Magnifier";
import styles from "../../css/Seachbar.module.scss";
import ResultRow from "./ResultRow";

const data = [
    { name: "拿鐵", type: "tag" },
    { name: "好有趣阿", type: "tag" },
    { name: "有趣課程", type: "tag" },
    { name: "課程", type: "title", src: "sss.jpg" },
    { name: "老皮", m_sid: "886", type: "member", src: `lao_pi.png` },
];

function Seachbar({ rows, setRows, getData }) {
    const {
        container,
        magnifier_wrap,
        search_wrap,
        submit,
        clearInput,
        divider,
        result_wrap,
        result_content,
    } = styles;
    const containerRef = useRef(null);
    const [keyWord, setKeyWord] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        window.addEventListener("click", unFocusSearchbar);

        return () => {
            window.removeEventListener("click", unFocusSearchbar);
        };
    }, []);

    const focusSearchbar = () => {
        setResult(data);
        containerRef.current.style.width = "100%";
    };

    const unFocusSearchbar = (e) => {
        if (!e.target.closest("#seach_wrap")) {
            clearResult();
        }
    };

    const clearResult = () => {
        setResult([]);
        containerRef.current.style.width = "calc(100% - 2.5rem)";
    };

    const clearAll = () => {
        clearResult();
        setKeyWord("");
    };

    const keyWordPost = (bySubmit = true) => {
        if (bySubmit) {
            if (!keyWord.trim()) {
                console.log("無效");
                return;
            }
        }

        clearResult();
        console.log(keyWord);
        getData(null, { title: keyWord }).then((r) => {
            console.log(r.rows);
            setRows(r.rows);
        });
    };

    const chooseResult = (name) => {
        setKeyWord(name);
        keyWordPost(false);
    };

    const debounce = useCallback(
        _.debounce((val) => {
            const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/;
            console.log(val.replace(pattern, ""));

            axios(previewAPI, {
                params: { queryString: val },
            }).then((r) => {
                console.log(r.data);
            });
        }, 200),
        []
    );

    const handleChange = async (e) => {
        // setKeyWord(e.target.value);
        setKeyWord(e.target.value);
        debounce(e.target.value);

        // 注音
    };

    return (
        <div className={container} ref={containerRef}>
            <div className={search_wrap} id="seach_wrap">
                {result.length > 0 && (
                    <div className={magnifier_wrap}>
                        <Magnifier />
                    </div>
                )}
                <input
                    type="text"
                    value={keyWord}
                    onClick={focusSearchbar}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                {keyWord.length > 0 && (
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
                )}

                <span className={divider}></span>
                <button className={submit} onClick={keyWordPost}>
                    <Magnifier color="#4285f4" />
                </button>
            </div>
            {result.length > 0 && (
                <div className={result_wrap}>
                    {result.map((v, i) => {
                        return (
                            <div
                                key={i}
                                className={result_content}
                                onClick={() => chooseResult(v.name)}
                            >
                                <ResultRow data={v} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Seachbar;
