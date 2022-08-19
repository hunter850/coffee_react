/* eslint-disable prettier/prettier */
import "./Banner.css";


function Banner({ courseDetailedData, start, courseClickMove }) {
    // 難度數字轉成中文
    // 確認取得資料才渲染頁面
    if (start === true) {
        if (Number(courseDetailedData[0].course_level) === 1) {
            courseDetailedData[0].course_level = "初級";
        }
        if (Number(courseDetailedData[0].course_level) === 2) {
            courseDetailedData[0].course_level = "中級";
        }
        if (Number(courseDetailedData[0].course_level) === 3) {
            courseDetailedData[0].course_level = "高級";
        }
        return (
            <div
                className="courseBannerContainer  container"
            >
                <div className="CourseDetailed_banner-txt">
                    <div className="d-flex f-aic">
                        <p
                            style={{
                                fontSize: "1.4375rem",
                                color: "#3E3E3E",
                                fontWeight: 600,
                            }}
                            className="title-font"
                        >
                            {courseDetailedData[0].course_name}
                        </p>
                        <span
                            className={`CourseDetailed_banner_level ${courseDetailedData[0].course_level === "中級"
                                ? "CourseDetailed_banner_normal"
                                : ""
                                } ${courseDetailedData[0].course_level === "高級"
                                    ? "CourseDetailed_banner_hard"
                                    : ""
                                }`}
                        >
                            {courseDetailedData[0].course_level}
                        </span>
                    </div>
                    <div className="CourseDetailed_banner_text">
                        {courseDetailedData[0].course_content}
                    </div>
                    <div className="CourseDetailed_banner_area">
                        <svg
                            width="11"
                            height="14"
                            viewBox="0 0 14 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="path-1-outside-1_1908_2818"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="14"
                                height="17"
                                fill="black"
                            >
                                <rect fill="white" width="14" height="17" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.48622 11.6742C10.6371 10.909 12.1744 8.88124 12.1744 6.5C12.1744 3.46243 9.6729 1 6.58719 1C3.50147 1 1 3.46243 1 6.5C1 8.88146 2.53755 10.9094 4.68875 11.6744L6.58742 15.1429L8.48622 11.6742Z"
                                />
                            </mask>
                            <path
                                d="M8.48622 11.6742L8.15107 10.732C7.91982 10.8142 7.7269 10.9787 7.60904 11.194L8.48622 11.6742ZM4.68875 11.6744L5.56592 11.1942C5.44805 10.9789 5.25509 10.8144 5.02379 10.7322L4.68875 11.6744ZM6.58742 15.1429L5.71025 15.6231C5.8857 15.9436 6.22202 16.1429 6.58742 16.1429C6.95283 16.1429 7.28914 15.9436 7.4646 15.6231L6.58742 15.1429ZM11.1744 6.5C11.1744 8.43689 9.92377 10.1014 8.15107 10.732L8.82137 12.6163C11.3504 11.7167 13.1744 9.32558 13.1744 6.5H11.1744ZM6.58719 2C9.1355 2 11.1744 4.02949 11.1744 6.5H13.1744C13.1744 2.89538 10.2103 0 6.58719 0V2ZM2 6.5C2 4.02949 4.03887 2 6.58719 2V0C2.96407 0 0 2.89538 0 6.5H2ZM5.02379 10.7322C3.25083 10.1017 2 8.43707 2 6.5H0C0 9.32584 1.82426 11.7171 4.3537 12.6166L5.02379 10.7322ZM7.4646 14.6627L5.56592 11.1942L3.81157 12.1545L5.71025 15.6231L7.4646 14.6627ZM7.60904 11.194L5.71025 14.6627L7.4646 15.6231L9.36339 12.1543L7.60904 11.194Z"
                                fill="#898787"
                                mask="url(#path-1-outside-1_1908_2818)"
                            />
                            <ellipse
                                cx="6.58738"
                                cy="6.50021"
                                rx="2.39451"
                                ry="2.35714"
                                fill="#D9D9D9"
                            />
                        </svg>
                        <span
                            style={{ paddingLeft: 13, fontSize: "0.9375rem" }}
                        >
                            台北市
                        </span>
                    </div>
                </div>
                <div className="CourseDetailed_banner-btn">
                    <div className="CourseDetailed_banner-price">
                        <span
                            style={{
                                fontSize: "23px",
                                paddingRight: "20px",
                                fontWeight: 400,
                            }}
                        >
                            NT$
                        </span>
                        {courseDetailedData[0].course_price}
                    </div>
                    <div className="courseBannerBtn-wrap">
                        <button className="banner-Btn-Hover courseBannerBtn" onClick={() => courseClickMove()}>
                            報名課程
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
