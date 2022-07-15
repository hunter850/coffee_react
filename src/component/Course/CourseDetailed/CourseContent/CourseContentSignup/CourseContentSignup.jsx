/* eslint-disable prettier/prettier */
import "./CourseContentSignup.css";
import { useState } from "react";

function CourseContentSignup() {
    const [displayNone, setdisplayNone] = useState(false);
    return (
        <div>
            <div className="CourseContentItem" style={{ marginTop: 30 }}>
                <div className="d-flex f-aic CourseContentItem-wrap">
                    <div className="d-flex CourseContent-title">
                        <svg
                            width="31"
                            height="30"
                            viewBox="0 0 31 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.7362 11.4286C12.1228 13.4232 10.9904 14.993 9.67817 15.9273C8.3657 16.8619 6.90581 17.1437 5.58809 16.6533C4.27037 16.1629 3.26587 14.9639 2.73871 13.3447C2.21166 11.7258 2.17805 9.72217 2.79142 7.72755C3.40479 5.73294 4.53726 4.16323 5.84947 3.22886C7.16193 2.29431 8.62182 2.01244 9.93954 2.50285C11.2573 2.99325 12.2618 4.19227 12.7889 5.81146C13.316 7.43034 13.3496 9.43402 12.7362 11.4286Z"
                                stroke="#B79973"
                            />
                            <path
                                d="M27.0859 16.4749C27.979 18.3332 28.2362 20.3142 27.9508 22.0034C27.6654 23.6923 26.8475 25.0566 25.6115 25.7754C24.3756 26.4943 22.8902 26.4698 21.4608 25.7783C20.0311 25.0867 18.6877 23.7375 17.7946 21.8792C16.9015 20.0209 16.6444 18.0399 16.9298 16.3507C17.2152 14.6618 18.0331 13.2976 19.269 12.5787C20.505 11.8598 21.9904 11.8843 23.4198 12.5758C24.8494 13.2675 26.1928 14.6166 27.0859 16.4749Z"
                                stroke="#B79973"
                            />
                            <path
                                d="M10.481 2.76855L4.6582 15.5799"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18.5439 13.6001L25.7554 24.9334"
                                stroke="#B79973"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <div style={{ paddingLeft: 17 }}>報名資訊</div>
                    </div>
                    <div className={` ${displayNone ? "arrow-icon-down" : 'arrow-icon'}`} onClick={() => setdisplayNone(!displayNone)}>

                    </div>
                </div>
                <div className={`CourseContent-text ${displayNone ? "CourseContentItem-text" : ""}`}>
                    <div className=" CourseContentDate">
                        <div>選擇日期</div>
                        <div>
                            <div style={{ paddingBottom: 12 }}>選擇時段</div>
                            <div
                                className="d-flex"
                                style={{ paddingBottom: 17 }}
                            >
                                <div className="CourseContentBtn">
                                    <button className="CourseContentBtnRwd">
                                        AM 9:00
                                    </button>
                                </div>
                                <button className="CourseContentBtnRwd CourseContentBtn-focus ">
                                    PM 3:00
                                </button>
                            </div>
                            <div style={{ paddingBottom: 12 }}>選擇人數</div>
                            <div
                                className="d-flex PeopleNumberRwd"
                                style={{ paddingBottom: 57 }}
                            >
                                <button className="banner-Btn-Hover courseSignUpMinBtn">
                                    +
                                </button>

                                <div className="people-number">2</div>
                                <button className="banner-Btn-Hover courseSignUpMinBtn">
                                    -
                                </button>
                            </div>
                            <div className="d-flex CourseContentSignup-price">
                                <div>總金額</div>
                                <div>
                                    <div style={{ color: "#898787" }}>
                                        NT$ 2000 / 人
                                    </div>
                                    <div>
                                        NT$
                                        <span
                                            style={{
                                                fontSize: "1.5625rem",
                                                paddingLeft: 26,
                                            }}
                                        >
                                            4000
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="courseSignUpBtnRwd">
                                    報名課程
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseContentSignup;
