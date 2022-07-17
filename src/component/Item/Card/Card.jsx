/* eslint-disable prettier/prettier */
import { React } from "react";
import "./Card.css";

function Card({ courseData }) {
    return (
        <div className="course_card">
            <div className="course_card_top">
                <div
                    className={`course_card_level ${courseData.lv === "中級"
                        ? "course_card_level-normal"
                        : ""
                        } ${courseData.lv === "高級"
                            ? "course_card_level-hard"
                            : ""}`}
                >
                    {courseData.lv}
                </div>
            </div>
            <div className="course_card_down">
                <div className="course_card_txt">
                    <p style={{ fontWeight: "bolder" }}>{courseData.title}</p>
                    <p className="font-min" style={{ color: "#898787" }}>
                        {courseData.txt}
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
                            {courseData.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
