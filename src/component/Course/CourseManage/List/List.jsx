/* eslint-disable prettier/prettier */
import "./List.css";
import { imgSrc, courseDelete } from "../../../../config/api-path";
import axios from "axios";

function List({ courseData, setConfirmDelete }) {
    const { course_name, course_level, course_price, course_img_s, course_sid } =
        courseData;


    const deleteCourse = () => {
        // console.log(course_sid);
        if (window.confirm(`確定要刪除${course_name}嗎`)) {
            axios.delete(`${courseDelete}/${course_sid}`)
                .then(res => {
                    console.log(res);
                    setConfirmDelete(true);
                });
        }


    };

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
            <div className="List-delete-icon" onClick={() => deleteCourse()}></div>
        </div>
    );
}

export default List;
