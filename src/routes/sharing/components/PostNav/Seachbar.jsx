import { useState, useRef, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";

import { previewAPI, popTagAPI, searchPost } from "../../../../config/api-path";
import { useAuth } from "../../../../component/Member/AuthContextProvider";
import { useTabsHistory } from "../../../../Contexts/TabsHistoryProvider";
import Magnifier from "./Magnifier";
import styles from "./scss/Searchbar.module.scss";
import ResultRow from "./ResultRow";

function Seachbar(props) {
    const {
        setRows,
        chooseToSearch,
        setSearchMode,
        keyWord,
        setKeyWord,
        setIsEnd,
        setGetDataTimes,
    } = props;
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
    const { sid } = useAuth();
    const { pushTabs } = useTabsHistory();

    const containerRef = useRef(null);
    const mag_wrap = useRef(null);
    const [previewData, setPreviewData] = useState([]);
    const [defaultData, setDefaultData] = useState([]);

    useEffect(() => {
        window.addEventListener("click", unFocusSearchbar);
        window.addEventListener("scroll", scrollHandler);
        axios(popTagAPI).then((r) => {
            const rows = r.data;

            setDefaultData(rows);
        });

        return () => {
            window.removeEventListener("click", unFocusSearchbar);
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const scrollHandler = () => {
        setPreviewData([]);
    };

    const focusSearchbar = (e) => {
        sendDataDebounce(e.target.value);
        containerRef.current.style.width = "100%";
        mag_wrap.current.style.display = "block";
    };

    const clearPreview = () => {
        setPreviewData([]);
        containerRef.current.style.width = "calc(100% - 2.5rem)";
    };

    const unFocusSearchbar = (e) => {
        if (!e.target.closest("#seach_wrap")) {
            clearPreview();
            mag_wrap.current.style.display = "none";
        }
    };

    const keyWordSubmit = () => {
        const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/;
        const replaced = keyWord.replace(pattern, "").trim();

        if (replaced) {
            setIsEnd(false);
            pushTabs("search");
            setGetDataTimes(0);
            setSearchMode("submit");
            clearPreview();
            axios(searchPost, { params: { q: replaced, auth: sid } }).then(
                (r) => {
                    if (r.data.success) {
                        setRows(r.data.rows);
                        if (r.data.isEnd) setIsEnd(true);
                    }
                }
            );
        }
    };

    const sendDataDebounce = useCallback(
        debounce((val) => {
            const pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+$/;
            const replaced = val.replace(pattern, "").trim();

            if (replaced.length === 0) {
                setPreviewData(defaultData);
                return;
            }

            axios(previewAPI, {
                params: { queryString: replaced },
            }).then((r) => {
                const rows = r.data.rows;
                setPreviewData(rows);
            });
        }, 150),
        [defaultData]
    );

    const handleChange = async (e) => {
        setKeyWord(e.target.value);
        sendDataDebounce(e.target.value);
    };

    return (
        <div className={container} ref={containerRef}>
            <form
                className={search_wrap}
                id="seach_wrap"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div
                    className={magnifier_wrap}
                    ref={mag_wrap}
                    style={{
                        display: "none",
                        transform: "translateX(4px)",
                    }}
                >
                    <Magnifier />
                </div>

                <input
                    type="text"
                    value={keyWord}
                    onClick={(e) => {
                        focusSearchbar(e);
                    }}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                {keyWord.length > 0 && (
                    <div
                        className={clearInput}
                        aria-label="清除"
                        onClick={() => {
                            clearPreview();
                            setKeyWord("");
                        }}
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
                <button className={submit} onClick={keyWordSubmit}>
                    <Magnifier color="#4285f4" />
                </button>
            </form>

            {previewData.length > 0 && (
                <div className={result_wrap}>
                    {previewData.map((v, i) => {
                        return (
                            <div
                                key={i}
                                className={result_content}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    chooseToSearch(v);
                                    pushTabs("choose");
                                }}
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
