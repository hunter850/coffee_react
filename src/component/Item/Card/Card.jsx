/* eslint-disable prettier/prettier */
import { React } from "react";
import "./Card.css";

function Card({ courseData }) {
    const { course_level, course_name, course_content, course_price } = courseData;

    return (
        <div className="course_card">
            <div className="course_card_top">
                <div
                    className={`course_card_level ${course_level === "中級"
                        ? "course_card_level-normal"
                        : ""
                        } ${course_level === "高級"
                            ? "course_card_level-hard"
                            : ""}`}
                >
                    {course_level}
                </div>
            </div>
            <div className="course_card_down">
                <div className="course_card_txt">
                    <p style={{ fontWeight: "bolder" }}>{course_name}</p>
                    <p className="font-min" style={{ color: "#898787" }}>
                        {course_content}
                    </p>
                    <div className="d-flex course_card_price">
                        <p
                            style={{
                                fontSize: "0.75rem",
                                letterSpacing: "0.07rem",
                            }}
                        >
                            NT$
                        </p>
                        <p
                            style={{
                                fontSize: "1.0625rem",
                                letterSpacing: "0.07rem",
                            }}
                        >
                            {course_price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
