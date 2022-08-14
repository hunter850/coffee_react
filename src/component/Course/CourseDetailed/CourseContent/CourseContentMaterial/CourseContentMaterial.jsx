/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { useRef, useEffect } from "react";
import { useState } from "react";
function CourseContentMaterial({ materia, setMaterial, topZeroSure, start, courseDetailedData }) {

    const materialScrollTop = useRef();
    useEffect(() => {
        if (topZeroSure === true && start === true) {
            setMaterial(materialScrollTop.current.getBoundingClientRect().top);
        }

    }, [topZeroSure, start]);
    const [displayNone, setdisplayNone] = useState(false);
    return (
        <div >
            <div className="CourseContentItem" style={{ marginTop: 30 }} id='CourseContentMaterial'>
                <div className="d-flex f-aic CourseContentItem-wrap" ref={materialScrollTop}>
                    <div className="d-flex CourseContent-title">
                        <svg
                            width="24"
                            height="29"
                            viewBox="0 0 24 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="1.20996"
                                y="12.0469"
                                width="17.4641"
                                height="2.125"
                                stroke="#B79973"
                            />
                            <rect
                                x="0.5"
                                y="25.3281"
                                width="18.8844"
                                height="2.90625"
                                stroke="#B79973"
                            />
                            <path
                                d="M4.26074 11.5469C4.3791 10.1146 5.68106 7.25 9.942 7.25C14.203 7.25 15.5049 10.1146 15.6233 11.5469"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.94238 7.25V4.125H19.5295M19.5295 4.125H22.7252C22.7252 3.08333 22.4412 1 21.3049 1C19.8846 1 19.5295 2.5625 19.5295 4.125Z"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <rect
                                x="2.63086"
                                y="14.3906"
                                width="14.6235"
                                height="10.7188"
                                stroke="#B79973"
                            />
                            <rect
                                x="4.76074"
                                y="20.6406"
                                width="10.3625"
                                height="4.46875"
                                stroke="#B79973"
                            />
                        </svg>

                        <div style={{ paddingLeft: 17 }}>需求材料</div>
                    </div>

                    <div
                        className={` ${displayNone ? "arrow-icon-down" : "arrow-icon"}`}
                        onClick={() => setdisplayNone(!displayNone)}
                    ></div>
                </div>
                <div
                    className={`CourseContent-text CourseContent-text-color ${displayNone ? "CourseContentItem-text" : ""
                        }`}
                    dangerouslySetInnerHTML={{
                        __html: start ? courseDetailedData[0].course_material : '',
                    }}
                >
                </div>
            </div>
        </div>
    );
}

export default CourseContentMaterial;
