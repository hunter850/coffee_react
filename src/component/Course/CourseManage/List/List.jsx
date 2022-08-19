/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import "./List.css";
import { imgSrc, courseDelete } from "../../../../config/api-path";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function List({ courseData, setConfirmDelete, setIsOpen, isOpen, myBoolean, setMyBoolean, setSid, sid, confirmDelete }) {
    const { course_name, course_level, course_price, course_img_s, course_sid } =
        courseData;

    const deleteCourse = () => {
        setSid(course_sid);
        setIsOpen(true);
    };

    // 刪除資料的請求
    useEffect(() => {
        setIsOpen(false);
        setTimeout(() => {
            if (myBoolean === 1) {
                setMyBoolean(-1);
                axios.delete(`${courseDelete}/${sid}`)
                    .then(res => {
                        // console.log(res);
                        // 確認刪除的狀態
                        setConfirmDelete(true);
                        setSid(0);
                    });
            }
        }, 1000);
        if (myBoolean === 0) {
            setIsOpen(false);
            setMyBoolean(-1);
        }
    }, [myBoolean, confirmDelete]);

    return (
        <div className={`courseList d-flex f-aic ${sid === course_sid && myBoolean === 1 ? 'course-list-opacity' : ''}`}>
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
            <Link to={`/course/add/${course_sid}`}>
                <div className="List-edit-icon"></div>
            </Link>
            <div className="List-delete-icon" onClick={() => deleteCourse()}></div>
        </div>
    );
}

export default List;
