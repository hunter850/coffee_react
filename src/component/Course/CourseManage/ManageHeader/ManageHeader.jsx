import "./ManageHeader.css";
import { Link } from "react-router-dom";

function ManageHeader({
    courseManageSortData,
    setSearchInp,
    searchInp,
    setCourseManageSortData,
    setSearchSure,
    courseSearch,
}) {
    return (
        <div
            className="d-flex container ManageHeader-wrap"
            style={{ height: "100%" }}
        >
            <div>
                <div className="ManageHeader-Header-title">
                    <p>課程資訊管理</p>
                </div>
                <div className="ManageHeader-Header-input">
                    <div className="ManageHeader-search-wrap">
                        <input
                            type="text"
                            placeholder="搜尋想要的課程"
                            value={searchInp}
                            onChange={(e) => {
                                setSearchInp(e.target.value);
                            }}
                        />
                        <div
                            className="ManageHeader-search-btn"
                            onClick={() => courseSearch()}
                        >
                            <svg
                                width="32"
                                height="33"
                                viewBox="0 0 32 33"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_1908_2814)">
                                    <circle
                                        cx="13.375"
                                        cy="13.375"
                                        r="8.375"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x1="20.4142"
                                        y1="20.5"
                                        x2="25"
                                        y2="25.0858"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_1908_2814"
                                        x="0"
                                        y="0"
                                        width="32"
                                        height="32.0859"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood
                                            floodOpacity="0"
                                            result="BackgroundImageFix"
                                        />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dx="1" dy="1" />
                                        <feGaussianBlur stdDeviation="2.5" />
                                        <feComposite
                                            in2="hardAlpha"
                                            operator="out"
                                        />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_1908_2814"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_1908_2814"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ManageHeader-btn">
                <Link to="/course/add">
                    <button className="ManageHeaderBtn"> + 新增課程</button>
                </Link>
            </div>
        </div>
    );
}

export default ManageHeader;
