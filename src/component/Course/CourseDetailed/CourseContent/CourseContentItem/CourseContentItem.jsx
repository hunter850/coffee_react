/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import "./CourseContentItem.css";
import { useState, useRef, useEffect } from "react";

function CourseContentItem({ marginTop, children, item, setItem, topZeroSure, courseDetailedData, start }) {
    const [displayNone, setdisplayNone] = useState(false);

    const itemScrollTop = useRef();
    useEffect(() => {
        if (topZeroSure === true && start === true) {
            setItem(itemScrollTop.current.getBoundingClientRect().top);
        }
    }, [topZeroSure, start]);
    return (
        <div className="CourseContentItem" style={{ marginTop: marginTop }} id='CourseContentItem' >
            <div
                className="d-flex f-aic CourseContentItem-wrap"
                ref={itemScrollTop}
            >
                <div className="d-flex CourseContent-title">
                    <svg
                        width="24"
                        height="27"
                        viewBox="0 0 26 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <mask id="path-1-inside-1_1908_2824" fill="white">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.79419 7.00002C3.26702 5.2341 6.63068 4 10.5446 4C14.4584 4 17.8221 5.23411 19.2949 7.00002C17.8221 8.76594 14.4584 10 10.5446 10C6.63068 10 3.26702 8.76594 1.79419 7.00002Z"
                            />
                        </mask>
                        <path
                            d="M1.79419 7.00002L0.87264 6.23142L0.231603 7.00002L0.87264 7.76862L1.79419 7.00002ZM19.2949 7.00002L20.2165 7.76862L20.8575 7.00002L20.2165 6.23142L19.2949 7.00002ZM2.71574 7.76862C3.26631 7.10849 4.25841 6.45695 5.64992 5.97059C7.02454 5.49013 8.70869 5.2 10.5446 5.2V2.8C8.46656 2.8 6.51193 3.12692 4.85804 3.70499C3.22104 4.27716 1.7949 5.12564 0.87264 6.23142L2.71574 7.76862ZM10.5446 5.2C12.3804 5.2 14.0646 5.49013 15.4392 5.97059C16.8307 6.45695 17.8228 7.10849 18.3734 7.76862L20.2165 6.23142C19.2942 5.12564 17.8681 4.27716 16.2311 3.70499C14.5772 3.12692 12.6226 2.8 10.5446 2.8V5.2ZM18.3734 6.23142C17.8228 6.89156 16.8307 7.54309 15.4392 8.02945C14.0646 8.50991 12.3804 8.80004 10.5446 8.80004V11.2C12.6226 11.2 14.5772 10.8731 16.2311 10.295C17.8681 9.72288 19.2942 8.8744 20.2165 7.76862L18.3734 6.23142ZM10.5446 8.80004C8.70869 8.80004 7.02454 8.50991 5.64992 8.02945C4.25841 7.54309 3.26631 6.89156 2.71574 6.23142L0.87264 7.76862C1.7949 8.8744 3.22104 9.72288 4.85804 10.295C6.51193 10.8731 8.46656 11.2 10.5446 11.2V8.80004Z"
                            fill="#B79973"
                            mask="url(#path-1-inside-1_1908_2824)"
                        />
                        <path
                            d="M19.4891 5.00002C19.4891 6.04569 18.6687 7.13784 17.0152 8.00408C15.39 8.85544 13.1033 9.40004 10.5446 9.40004C7.98585 9.40004 5.69913 8.85544 4.07396 8.00408C2.42039 7.13784 1.6 6.04569 1.6 5.00002C1.6 3.95435 2.42039 2.8622 4.07396 1.99596C5.69913 1.1446 7.98585 0.6 10.5446 0.6C13.1033 0.6 15.39 1.1446 17.0152 1.99596C18.6687 2.8622 19.4891 3.95435 19.4891 5.00002Z"
                            stroke="#B79973"
                            strokeWidth="1.2"
                        />
                        <path
                            d="M1.45459 5L3.2726 23.5001C4.03011 24.5001 6.90862 26.5001 10.5446 26.5001C15.0897 26.5001 16.9077 24.5001 17.8167 23.5001L19.6347 5"
                            stroke="#B79973"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.1962 11.9542C19.5045 11.4553 20.6761 10.6073 22.896 11.2059C25.1159 11.8045 24.7459 15.1967 24.2835 16.818C23.3585 18.1898 20.8611 20.709 18.2712 19.8111"
                            stroke="#B79973"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div style={{ paddingLeft: 17 }}>{children}</div>
                </div>
                <div className={` ${displayNone ? "arrow-icon-down" : 'arrow-icon'}`} onClick={() => setdisplayNone(!displayNone)}>

                </div>
            </div>
            <div
                className={`CourseContent-text CourseContent-text-color ${displayNone ? "CourseContentItem-text" : ""}`}
                dangerouslySetInnerHTML={{
                    __html: start ? courseDetailedData[0].course_content : '',
                }}
            >

            </div>
        </div>
    );
}

export default CourseContentItem;
