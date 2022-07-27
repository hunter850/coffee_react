/* eslint-disable prettier/prettier */
import "./List.css";
import { imgSrc } from "../../../../config/api-path";

function List({ courseData }) {
    const { course_name, course_level, course_price, course_img_s } =
        courseData;

    return (
        <div className="courseList d-flex f-aic">
            <div
                className="List-img"
                style={{
                    background: `url(${imgSrc}/course/${course_img_s}) no-repeat center center`,
                    backgroundSize: "cover",
                }}
            ></div>
            <div className="List-title">{course_name}</div>
            <div
                className={`List-level ${course_level === "中級" ? "List-level-normal" : ""
                    } ${course_level === "高級" ? "List-level-hard" : ""}`}
            >
                {course_level}
            </div>
            <div className="List-price">
                NT$ &nbsp;
                <span style={{ fontSize: "1.0625rem" }}>{course_price}</span>
            </div>
            <div className="List-edit-icon"></div>
            <div className="List-delete-icon"></div>
        </div>
    );
}

export default List;
