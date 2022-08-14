/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import "./CourseComtentObject.css";
import { useRef, useEffect } from "react";
function CourseComtentObject({ object, setObject, topZeroSure, start, courseDetailedData }) {
    const objectScrollTop = useRef();

    useEffect(() => {
        if (topZeroSure === true && start === true) {
            setObject(objectScrollTop.current.getBoundingClientRect().top);
        }
    }, [topZeroSure, start]);

    return (
        <div>
            <div
                className="CourseContentItem"
                style={{ marginTop: 30, marginBottom: 72 }}
                id="CourseComtentObject"
                ref={objectScrollTop}
            >
                <div className="d-flex f-aic CourseContentItem-wrap">
                    <div className="d-flex CourseContent-title">
                        <svg
                            width="22"
                            height="26"
                            viewBox="0 0 22 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.59234 3.52632H1V7H20.998V3.52632H18.4057V1H3.59234V2.89474V3.52632ZM3.59234 3.52632H14.332H16.554"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.51465 7.3335L3.72665 25.0002H18.2707L19.0787 7.3335"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.91895 12H18.675"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.32324 19.3335H18.2713"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <div style={{ paddingLeft: 17 }}>適合對象</div>

                    </div>

                </div>
                <div
                    className="CourseContent-text CourseContent-text-color"
                    dangerouslySetInnerHTML={{
                        __html: start ? courseDetailedData[0].course_people : '',
                    }}
                >
                </div>
            </div>
        </div>
    );
}

export default CourseComtentObject;
