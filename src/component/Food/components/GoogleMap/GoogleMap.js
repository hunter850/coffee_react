import "./GoogleMap.scss";
import SingleMapDetail from "./SingleMapDetail";
import { useEffect, useState } from "react";

function GoogleMap({ setShowMap, setShowDate, setSelectedAddress }) {
    const [storeInfo, setStoreInfo] = useState({});

    useEffect(() => {
        console.log("did update");
    }, [storeInfo]);

    const handleChildClick = (e) => {
        e.stopPropagation();
    };
    return (
        <>
            <div
                className="google-lightbox"
                onClick={() => {
                    setShowMap(false);
                }}
            >
                <div className="detail" onClick={handleChildClick}>
                    <div className="top">
                        <h6>選擇自取門市 & 時間</h6>
                    </div>

                    <div className="middle2 ">
                        <p
                            onClick={() => {
                                setShowDate(true);
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_1711_8278)">
                                    <path
                                        d="M17.5 8.3335C17.5 14.1668 10 19.1668 10 19.1668C10 19.1668 2.5 14.1668 2.5 8.3335C2.5 6.34437 3.29018 4.43672 4.6967 3.0302C6.10322 1.62367 8.01088 0.833496 10 0.833496C11.9891 0.833496 13.8968 1.62367 15.3033 3.0302C16.7098 4.43672 17.5 6.34437 17.5 8.3335Z"
                                        stroke="#253945"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 10.8335C11.3807 10.8335 12.5 9.71421 12.5 8.3335C12.5 6.95278 11.3807 5.8335 10 5.8335C8.61929 5.8335 7.5 6.95278 7.5 8.3335C7.5 9.71421 8.61929 10.8335 10 10.8335Z"
                                        stroke="#253945"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1711_8278">
                                        <rect
                                            width="20"
                                            height="20"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            取得目前所在位置
                        </p>
                        <SingleMapDetail
                            setStoreInfo={setStoreInfo}
                            storeInfo={storeInfo}
                        />
                    </div>
                    <div className="bottomarea">
                        <div
                            className="bottoms"
                            onClick={() => {
                                setShowMap(false);
                                setSelectedAddress(storeInfo);
                            }}
                        >
                            <h6>送出</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GoogleMap;
